import express, { Application, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import dotenv from 'dotenv';
import fs, { readdirSync } from 'fs';
import redis from 'redis';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
const genThumbnail = require('simple-thumbnail');

const app: Application = express();
dotenv.config();
app.use(express.static('uploads'));
app.use(express.static('thumbnails'));
app.use(cors());
app.use(fileUpload());

const Port: Number = Number(process.env.PORT) || 5000;
const Redis_Client_Port = process.env.REDIS_PORT || 6379;

//if no parameters are passed, the default route is 6379
const Redis_Client = redis.createClient(Number(Redis_Client_Port));

//testing api
app.get('/', (req, res) => {



    return res.send('this is the test URL');
})

interface IVideo {
    id: string,
    name: string,
    title: string,
    description: string,
    posted_time: string,
    posted_date: string,
    likes: number,
    dislikes: number,
    comments: number,
}

//upload a new video
app.post('/uploads', async (req: Request, res: Response) => {

    if (req.files === null) {
        return res.status(400).json({ "msg": "no file uploaded" })
    }

    const file: UploadedFile = req.files?.file as UploadedFile;

    const videoName: string = `${Date.now()}_${file.name}`;

    const videoData: IVideo = {
        id: uuid(),
        name: videoName,
        title: req.body.title,
        description: req.body.description,
        posted_time: moment().format("HH:mm:ss"),
        posted_date: moment().format("MMMM DD YYYY"),
        likes: 0,
        dislikes: 0,
        comments: 0,
    }

    Redis_Client.SET(videoName, JSON.stringify(videoData));

    const videoFolderPath: string = path.join(__dirname, '../uploads/', videoName);

    file.mv(videoFolderPath, (e) => {
        return res.status(500).send(e)
    })

    const photoFolderPath: string = path.join(__dirname, '../thumbnails/', `${Date.now()}_${file.name}.png`);

    genThumbnail(videoFolderPath, photoFolderPath, '250x?')
        .then((r: any) => console.log('done'))
        .catch((e: any) => console.error(e))

    return res.status(200).json({ "msg": "file successfully uploaded and thumbnail extracted" });

    //BELOW IS THE THING I WILL SEND WHILE THE TESTING OF THE FRONTEND IS IN PLAY
    // return res.status(200).json({ "msg": "response from the backend while testing" });

})

//get all the video names and then you can select a video and ask for its details
//in the route right below this route
app.get('/videos', (req, res) => {

    let videoNames: string[] = [];

    Redis_Client.keys("*", (err, keys) => {
        err && res.status(500).send({ error: err.message });

        videoNames = [...keys];

        return res.send(videoNames);
    })

})

//to get the main video
app.get('/videos/:name', (req: Request, res: Response) => {

    const videoName: string = req.params.name;

    //range/starting chunk of the video
    const chunk_range: string = req.headers.range!;

    //return if the range is not provided
    if (!chunk_range) {
        return res.status(400).send("please provide the range")
    }

    const video_path: string = path.join(__dirname, "../uploads/hummingbird.mp4");

    const video_stats: fs.Stats = fs.statSync(video_path);

    //get the video size
    const video_size: number = video_stats.size;

    //manually setting the chunk size
    const CHUNK_SIZE = 10 ** 5; // 1MB

    //start of the chunk
    const start = Number(chunk_range.replace(/\D/g, ""));

    //end of the chunk
    const end = Math.min(start + CHUNK_SIZE, video_size - 1);

    //size of the current specific chunk
    const contentLength = end - start + 1;

    //setting the headers
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${video_size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(video_path, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);





    Redis_Client.get(videoName, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        const normalData = data && JSON.parse(data);

        if (!normalData) {
            return res.status(404).send("No or invalid video name given");
        }

        res.status(200).send({ normalData })
    })

})

//to get all the thumbnails of the video recommendations
app.get('/thumbnails', (req: Request, res: Response) => {

    const { grp, limit } = req.query;

    const start = (Number(grp) * Number(10)) - Number(10);

    const end = Number(limit) + start;

    const allFileNames = readdirSync('./thumbnails').splice(start, end);

    return res.send({ thumbnailsGrp: allFileNames })
})

//listening to the port
app.listen(Port, () => console.log(`running on port ${Port}`))