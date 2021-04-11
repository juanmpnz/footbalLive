import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import Modal from "react-modal";

import { auth } from "../firebaseConfig";

function LoginComponent() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const register = (event) => {
    event.preventDefault();
    setLoader(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("ususario registrado");
        history.push("/");
      })
      .catch((e) => {
        setError(e.message);
        setModal(true);
      });
  };

  const login = (event) => {
    event.preventDefault();
    setLoader(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((r) => {
        history.push("/");
      })
      .catch((e) => {
        setError(e.message);
        setModal(true);
      });
  };

  return (
    <>
      <div className="signup-container">
        <h1 style={{ textAlign: "center", marginBottom: "8vh" }}>Welcome!</h1>

        <label id="email">
          E-mail:
          <input type="email" onChange={handleChange} name="email" />
        </label>
        <label id="password">
          Password:
          <input type="password" onChange={handleChange} name="password" />
        </label>
        <div className="btn">
          <button onClick={login} style={{ background: "#544bd3" }}>
            Login
          </button>
          <p>or</p>
          <button onClick={register} style={{ marginTop: "1vh" }}>
            Sign up
          </button>
        </div>
        <br />
        <div className="loader">
          <Loader
            visible={loader ? true : false}
            type="Oval"
            color="#544bd3"
            height={50}
            width={50}
            timeout={2000} //3 secs
          />
        </div>
      </div>
      <Modal
        className="modal"
        isOpen={modal}
        ariaHideApp={false}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" } }}
      >
        <div className="header">
          <p>Error</p>
          <button className="btn" onClick={() => setModal(false)}>
            X
          </button>
        </div>

        <p>{error}</p>
      </Modal>
    </>
  );
}

export default LoginComponent;
