import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./views/Dashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp.js";
import MiniDrawer from "./components/CustomDrawer/MiniDrawer";
import Users from "./views/Users/Users";
import Games from "./views/Games/Games";
import UserProfile from "./views/UserProfile/ClientUserProfile";
import RewatchRoom from "./views/RewatchRoom/rewatchRoom-component";
import ResetPassword from "./views/ForgotPassword/ResetPassword";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import ActivateAccount from "./views/Activate/ActivateAccount";

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
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/reset-password/:resetPasswordToken">
              <ResetPassword />
            </Route>
            <Route path="/activate/:activationToken">
              <ActivateAccount />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
