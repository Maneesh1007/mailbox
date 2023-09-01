import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import classes from "./Auth.module.css";

const AuthForm = () => {
  const history = useHistory("");
  const enteredEmail = useRef("");
  const enteredPassword = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isLogin) {
      setIsLoading(true);
      const responsee = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqVX_hW6BUUpe1061qr1J-wV_Ob4u66M4",

        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail.current.value,
            password: enteredPassword.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await responsee.json();

      setIsLoading(false);
      if (responsee.ok) {
        history.replace("/home");
        localStorage.setItem("token", JSON.stringify(data.idToken));
      } else {
        let errorMessage = "Authenication failed";
        alert(errorMessage);
      }
    } else {
      setIsLoading(true);
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqVX_hW6BUUpe1061qr1J-wV_Ob4u66M4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail.current.value,
            password: enteredPassword.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("user sucessfully signed");
      } else {
        let errorMessage = "Authenication failed";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
      }
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      {<h1>{isLogin ? "Login" : "Sign Up"}</h1>}

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={enteredEmail} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={enteredPassword} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="cpassword">Conform Password</label>
          <input
            type="password"
            id="cpassword"
            ref={enteredPassword}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <h1>Sending Request</h1>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
