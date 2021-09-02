import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Room from "./Components/Room/Room"
import CreateRoom from 'Components/CreateRoom/CreateRoom';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CreateRoom} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
