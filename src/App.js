import { Switch, Route } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AuthForm from "./components/Auth/Auth";
import MainMail from "./pages/Compose";
//import Home from "./pages/Home";
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <AuthForm></AuthForm>
      </Route>
      <Route path="/home" exact>
        <MainMail />;
      </Route>
    </Switch>
  );
}

export default App;
