import React, { useState } from "react";
import axios from "axios";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
      e.preventDefault(); // pour eviter que la page se recharge à chaque fois !!
      const emailError = document.querySelector(".email.error"); 
      const passwordError = document.querySelector(".password.error");  

      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/login`,
        withCredentials : true,
        data : {
            email,
            password,
        },
      })
      .then((res) => {
          if(res.data.errors){
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
          }else{
              window.location = "/"; // on va l'acceuil avec notre nouveau login connexion réussit
          }
      })
      .catch((err) => {
          console.log(err);
      })
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br/>
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SigninForm;
