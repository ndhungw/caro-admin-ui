import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./views/Dashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp.js";
import MiniDrawer from "./components/CustomDrawer/MiniDrawer";
import EnhancedTable from "./components/EnhancedTable/EnhancedTable";
import EnhancedTableToolbar from "./components/EnhancedTable/EnhancedTableToolbar";
import EnhancedTableHead from "./components/EnhancedTable/EnhancedTableHead";
import { Container, Typography } from "@material-ui/core";
import Users from "./views/Users/Users";
import AlertDialog from "./components/Dialog/AlertDialog";
import Games from "./views/Games/Games";
import UserProfile from "./views/UserProfile/ClientUserProfile";
import GameRecords from "./components/GameRecords/GameRecords";
import RewatchRoom from "./views/RewatchRoom/rewatchRoom-component";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/">
              <MiniDrawer>
                <Dashboard />
              </MiniDrawer>
            </PrivateRoute>

            <PrivateRoute exact path="/users">
              <MiniDrawer>
                <Users />
              </MiniDrawer>
            </PrivateRoute>

            <PrivateRoute exact path="/games">
              <MiniDrawer>
                <Games />
              </MiniDrawer>
            </PrivateRoute>

            <PrivateRoute path="/users/:username">
              <MiniDrawer>
                <UserProfile />
              </MiniDrawer>
            </PrivateRoute>

            <PrivateRoute path="/game-records/:id">
              <MiniDrawer>
                <RewatchRoom />
              </MiniDrawer>
            </PrivateRoute>

            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>

            {/* Test  */}
            <Route path="/rewatch-room/:id">
              <RewatchRoom />
            </Route>

            <Route path="/game-records">
              <GameRecords username="user001" />
            </Route>

            <Route path="/mini-drawer">
              <MiniDrawer />
            </Route>

            {/* Data table */}
            <Route path="/table">
              <Container maxWidth="md">
                <EnhancedTable />
              </Container>
            </Route>
            <Route path="/table-toolbar">
              <EnhancedTableToolbar />
            </Route>
            <Route path="/table-head">
              <EnhancedTableHead />
            </Route>

            <Route path="/dialog">
              <AlertDialog
                open={true}
                title="Reset password"
                severity="info"
                alertDescription="This account will be reset"
                content={
                  <>
                    <Typography variant="subtitle2">User account</Typography>
                    <Typography variant="h6">{"ndh1379@gmail.com"}</Typography>
                  </>
                }
                agreeText="Send"
              />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
