import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";
import storeCofiguration from "./store";
import { Provider } from "react-redux";
const queryClient = new QueryClient();


ReactDOM.render(
  <Provider store={storeCofiguration.store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={AdminLayout} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>

  ,
  document.getElementById("root")
);
