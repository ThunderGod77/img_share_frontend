import "./../App.css";

import React, { useState, useContext } from "react";
import {
  Jumbotron,
  NavbarText,
  InputGroup,
  Input,
  InputGroupText,
  InputGroupAddon,
  Button,
} from "reactstrap";

import { Redirect } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import Context from "./../Context";

const Register = (props) => {
  const { showFlashMessage,loginFun } = useContext(Context);

  const [nUsername, setNUsername] = useState("");
  const [nEmail, setNEmail] = useState("");
  const [nPassword, setNPassword] = useState("");
  const [nRePassword, setNRePassword] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);

  const changeNUserName = (e) => {
    setNUsername(e.target.value);
  };
  const changeNEmail = (e) => {
    setNEmail(e.target.value);
  };
  const changeNPassword = (e) => {
    setNPassword(e.target.value);
  };
  const changeNRePassword = (e) => {
    setNRePassword(e.target.value);
  };

  const changeUserName = (e) => {
    setUsername(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return re.test(String(email).toLowerCase());
  }

  const register = async () => {
    if (
      nUsername === "" ||
      nPassword === "" ||
      nEmail === "" ||
      nRePassword === ""
    ) {
      showFlashMessage("Please fill all the fields to register!", "danger");
      return;
    } else if (nPassword.length < 8) {
      showFlashMessage("Password has less than 8 characters!", "danger");
      return;
    } else if (nPassword !== nRePassword) {
      showFlashMessage("Passwords do not match!", "danger");
      return;
    } else if (!validateEmail(nEmail)) {
      showFlashMessage("Please enter a valid email!", "danger");
      return;
    }
    try {
      const response = await Axios.post("http://localhost:8080/users/new", {
        username: nUsername,
        email: nEmail,
        password: nPassword,
      });
      if (response.data.err) {
        showFlashMessage(response.data.msg, "danger");
      } else {
        showFlashMessage(
          response.data.msg + " successfully Please login now!",
          "success"
        );
      }
    } catch (err) {
      showFlashMessage(err.response.data.msg, "danger");
    }
  };
  const login = async () => {
    if (username === "" || password === "") {
      showFlashMessage("Please fill all the fields to login!", "danger");
      return;
    } else {
      try {
        const response = await Axios.post("http://localhost:8080/users/login", {
          username: username,
          password: password,
        });
        if (response.data.err) {
          showFlashMessage(response.data.msg, "danger");
          return;
        } else {
          showFlashMessage("Logged in successfully!", "success");
          console.log(response.data);
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("id",response.data.id)
          localStorage.setItem("username",username)
          loginFun()
          setTimeout(function () {
            setRedirect(true);
          }, 3000);
          return;
        }
      } catch (err) {
        
        showFlashMessage(err.response.data.msg || "Error", "danger");
        return;
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#000000", color: "#BC98E2" }}>
      <Jumbotron id="loginMain" style={{ backgroundColor: "#2E2E2E" }}>
        <div
          className="register"
          style={{
            border: "2px solid #BC98E2",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#212121",
          }}
        >
          <h2>Register</h2>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Username</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="username"
              type="text"
              value={nUsername}
              onChange={changeNUserName}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Email</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="email"
              type="email"
              value={nEmail}
              onChange={changeNEmail}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Password</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="more than 8 characters "
              type="password"
              value={nPassword}
              onChange={changeNPassword}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Re:Password</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="renter your password"
              type="password"
              value={nRePassword}
              onChange={changeNRePassword}
            />
          </InputGroup>
          <br />
          <Button color="info" onClick={register}>
            Register
          </Button>{" "}
          <br />
          <br />
          <br />
        </div>
        <div
          className="register"
          style={{
            border: "2px solid #BC98E2",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#212121",
          }}
        >
          <h2>Login:</h2>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Username / Email</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="enter your username or email"
              type="text"
              value={username}
              onChange={changeUserName}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Password</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={changePassword}
            />
          </InputGroup>
          <br />
          <Button color="info" onClick={login}>
            Login
          </Button>{" "}
          <br />
          <br />
          <br />
        </div>
      </Jumbotron>
      {redirect && <Redirect to="/test" />}
    </div>
  );
};

export default Register;
