import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";



import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import Test from './Components/Test'
import Logout from "./Components/Logout";
import Post from './Components/Post'



import Context from "./Context";
import { Alert } from "reactstrap";
function App() {
  const [message, setMessage] = useState("Error");
  const [msgColor, setMsgColor] = useState("danger");
  const [showMsg, setShowMsg] = useState(false);

  const token = localStorage.getItem("token")
  let a
  if(token!==null){
    a= true
  }
  else{
    a= false
  }

  const [isLoggedIn,setIsloggedIn] = useState(a)

  const logout = ()=>{
    setIsloggedIn(false)
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("id")
  }
  const loginFun = ()=>{
    setIsloggedIn(true)
  }


  const showFlashMessage = (msg, msgType) => {
    setMessage(msg);
    setMsgColor(msgType);
    setShowMsg(true);
    setTimeout(function () {
      setShowMsg(false);
    }, 3000);
  };

  return (
    <Context.Provider value={{ showFlashMessage,isLoggedIn,logout,loginFun }}>
      {" "}
      <div className="App">
        <BrowserRouter>
          <NavBar />
          {showMsg && (
            <div id="errMsg">
              <Alert color={msgColor}>{message}</Alert>
            </div>
          )}

          <Switch>
            <Route path="/login" exact="exact">
              <Login />
            </Route>
            <Route path="/test" exact="exact">
              <Test/>
            </Route>
            <Route path="/logout" exact="exact">
              <Logout />
            </Route>
            <Route path={"/post/:artId"} exact={"exact"}>
            <Post />
          </Route>
          {/* <Route path={"/"}>
            <Home />
          </Route> */}
          </Switch>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;
