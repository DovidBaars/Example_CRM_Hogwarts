import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from "@material-ui/core";
import NavBar from "./components/NavBar";
import AdminSignup from "./pages/AdminSignup";
import Main from "./pages/Main";
import AdminUsersContextProvider from "./contexts/AdminUsersContext";
import AdminLogout from "./pages/AdminLogout";
import AdminLogin from "./pages/AdminLogin";
import { PrivateRoute } from "./lib/PrivateRoute";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <AdminUsersContextProvider>
      <CssBaseline />
      <Container maxWidth="lg">
        <Router>
          <NavBar />
          <Container maxWidth="sm">
            <Switch>
              <Route exact path="/main" component={Main} />
              <Route exact path="/admin/signup" component={AdminSignup} />
              <Route exact path="/admin/logout" component={AdminLogout} />
              <Route exact path="/admin/login" component={AdminLogin} />
              <PrivateRoute component={AddStudent} path="/student/add" exact />
              <PrivateRoute
                component={EditStudent}
                path="/student/edit"
                exact
              />
            </Switch>
          </Container>
        </Router>
      </Container>
    </AdminUsersContextProvider>
  );
}
export default App;
