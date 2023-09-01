import { Switch, Route } from "react-router-dom";
import AuthForm from "./components/Auth/Auth";
import Home from "./pages/Home";
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <AuthForm></AuthForm>
      </Route>
      <Route path="/home" exact>
        <Home></Home>
      </Route>
    </Switch>
  );
}

export default App;
