import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "Pages/Landing Page/Landing.page";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
