import React, { useState } from 'react';
import SigninForm from './SigninForm';
import SignUpForm from './SignUpForm';



const Log = (props) => {

    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handelModals = (e) => {
    if (e.target.id === "register") {
        setSignInModal(false);
        setSignUpModal(true);
    } else if (e.target.id === "login") {
        setSignInModal(true);
        setSignUpModal(false);
    }
    };

    return (
      <div className="connection-form">
        <div className="form-container">
          <ul>
            <li
              onClick={handelModals}
              id="register"
              className={signUpModal ? "active-btn" : null}
            >
              S'inscrire
            </li>
            <li
              onClick={handelModals}
              id="login"
              className={signInModal ? "active-btn" : null}
            >
              Se connecter
            </li>
          </ul>
          {signUpModal && <SignUpForm />}
          {signInModal && <SigninForm />}
        </div>
      </div>
    );
};

export default Log;