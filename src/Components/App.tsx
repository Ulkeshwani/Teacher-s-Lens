import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SignupPage } from "Pages/Sign-Up Page/SignupPage.page";
import Landing from "Pages/Landing Page/Landing.page";
import CreateRoom from "./CreateRoom/CreateRoom";
import MeetPage from "Pages/Meeting Page/MeetPage.pages";
import Home from "Pages/Home Page/Home.component";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/Join-Us" component={SignupPage} />
        <Route path="/CreateRoom" component={CreateRoom} />
        <Route path="/Meet/:roomID" component={MeetPage} />
        <Route path="/Home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
