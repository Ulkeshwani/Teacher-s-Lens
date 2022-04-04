import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SignupPage } from "Pages/Sign-Up Page/SignupPage.page";
import Landing from "Pages/Landing Page/Landing.page";
import MeetPage from "Pages/Meeting Page/MeetPage.pages";
import Home from "Pages/Home Page/Home.component";
import Conversation from "Pages/Create Conversation/Conversation.page";
import AnnouncementPage from "Pages/Announcement & Notification/Announcement.page";
import theme from "utils/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/Join-Us" component={SignupPage} />
          <Route
            exact
            path="/dashboard/create-conversation"
            component={Conversation}
          />
          <Route exact path="/Meet/:roomID" component={MeetPage} />
          <Route exact path="/dashboard/app" component={Home} />
          <Route
            exact
            path="/dashboard/announcements"
            component={AnnouncementPage}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
