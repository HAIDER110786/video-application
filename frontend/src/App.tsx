import { Switch, Route } from 'react-router-dom';
import Home from './components/home/index';
import Chat from './components/chat/index';
import About from './components/about/index';
import Profile from './components/profile/index';
import NotFound from './components/notFound/index';
import Testing from './components/testing/index';
import './App.css'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/testing' component={Testing} />
        <Route exact path='/about' component={About} />
        <Route exact path='/chat' component={Chat} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
