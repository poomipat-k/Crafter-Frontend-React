import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Landing from "./container/Landing/Landing";
import Design from "./container/Design/Design";
import About from "./container/About/About";
import Auth from "./container/Auth/Auth";
import Shop from "./container/Shop/Shop";


const App = () => {
  let routes = (
    <Switch>
      <Route path="/shop" component={Shop} />
      <Route path="/design" exact component={Design} />
      <Route path="/about" exact component={About} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/" exact component={Landing} />

      <Redirect to="/" />
    </Switch>
  );
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default App;
