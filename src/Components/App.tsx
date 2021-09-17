import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "Pages/Landing Page/Landing.page";
import { SignupPage } from "Pages/Sign-Up Page/SignupPage.page";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/Join-Us" component={SignupPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
