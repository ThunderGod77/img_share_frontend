import react, { useState, useContext, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Context from "./../Context";
import "./../App.css";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { useImmer } from "use-immer";

import {
  Spinner,
  Jumbotron,
  Button,
  Row,
  Badge,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

function Post(props) {
  const { showFlashMessage, isLoggedIn } = useContext(Context);

  const { artId } = useParams();
  const [art, setArt] = useImmer({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const [colorL, setColorL] = useState("white");
  const [colorD, setColorD] = useState("white");

  const [comm, setComm] = useState("");

  const changeComm = (e) => {
    setComm(e.target.value);
  };

  const onComm = async () => {
    try {
      if (!isLoggedIn) {
        showFlashMessage(`Please Login!`, "danger");
        return;
      }
      if (comm === "") {
        showFlashMessage("The comment field is empty!", "danger");
        return;
      }
      const response = await Axios.post(
        `http://localhost:8080/feed/${artId}/comment`,
        { username: localStorage.getItem("username"), comment: comm },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setArt(response.data.data);
      setComm("");
    } catch (error) {
      showFlashMessage(error.response.data.msg, "danger");
    }
  };
  const upvote = async (vote) => {
    if (!isLoggedIn) {
      showFlashMessage(`Please Login!`, "danger");
      return;
    }
    try {
      if (vote) {
        if (colorL === "green") {
          const res = await Axios.post(
            `http://localhost:8080/feed/${artId}/remupvote`,
            { typeL: vote },
            { headers: { Authorization: localStorage.getItem("token") } }
          );
          setArt((a) => {
            a.upvotes = a.upvotes - 1;
          });
          setColorL("white");
          return;
        } else if (colorD === "red") {
          const resp = await Axios.post(
            `http://localhost:8080/feed/${artId}/upvote`,
            { typeL: vote },
            { headers: { Authorization: localStorage.getItem("token") } }
          );
          const res = await Axios.post(
            `http://localhost:8080/feed/${artId}/remupvote`,
            { typeL: !vote },
            { headers: { Authorization: localStorage.getItem("token") } }
          );
          setArt((a) => {
            a.downvotes = a.downvotes - 1;
          });
          setColorD("white");
          return;
        }
        const resp = await Axios.post(
          `http://localhost:8080/feed/${artId}/upvote`,
          { typeL: vote },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        setArt((a) => {
          a.upvotes = a.upvotes + 1;
        });
        setColorL("green");
      } else {
        if (colorD === "red") {
          const res = await Axios.post(
            `http://localhost:8080/feed/${artId}/remupvote`,
            { typeL: vote },
            { headers: { Authorization: localStorage.getItem("token") } }
          );
          setArt((a) => {
            a.downvotes = a.downvotes - 1;
          });
          setColorD("white");
          return;
        } else if (colorL === "green") {
          const resp = await Axios.post(
            `http://localhost:8080/feed/${artId}/upvote`,
            { typeL: vote },
            { headers: { Authorization: localStorage.getItem("token") } }
          );
          const res = await Axios.post(
            `http://localhost:8080/feed/${artId}/remupvote`,
            { typeL: !vote },
            { headers: { Authorization: localStorage.getItem("token") } }
          );
          setArt((a) => {
            a.upvotes = a.upvotes - 1;
          });
          setColorL("white");
          return;
        }
        const resp = await Axios.post(
          `http://localhost:8080/feed/${artId}/upvote`,
          { typeL: vote },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        setArt((a) => {
          a.downvotes = a.downvotes + 1;
        });
        setColorD("red");
      }
    } catch (error) {
      showFlashMessage("Some error occured", "danger");
    }
  };

  const checkUpvote = async () => {
    if (isLoggedIn) {
      try {
        const resp = await Axios.get(
          `http://localhost:8080/feed/${artId}/cupvote`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );
  
        if (resp) {
          if (resp.data.uC) {
            resp.data.u && setColorL("green");
            resp.data.u || setColorD("red");
          } else {
            return;
          }
        }
      } catch (error) {
        showFlashMessage("Some error occured!", "danger");
      }
    }
  };

  const getArt = async () => {
    try {
      const response = await Axios.get(`http://localhost:8080/feed/${artId}`);
      setArt(response.data.data);
      checkUpvote();
      setLoading(false);
    } catch (error) {
    
      showFlashMessage(error.response.data.msg, "danger");
      setErr(true);
    }
  };
  const updateC = (value) => {
    setArt(value.data.data);
  };
  useEffect(getArt, []);
  return (
    <div style={{ backgroundColor: "#000000", color: "#BC98E2" }}>
      {loading && <Spinner color="primary" size="lg" />}
      <Jumbotron id="loginMain" style={{ backgroundColor: "#2E2E2E" }}>
        {loading || err || (
          <div>
            <h1>{art.artname}</h1>
            <img src={art.url} alt="fan art image" className="mainImage" />
            <br />
            <br />
            <p style={{ fontWeight: "bold", size: "1.35rem" }}>
              {art.description}
            </p>
            <Button
              color="primary"
              outline
              style={{
                backgroundColor: "#2E2E2E",
                color: "#B08CE1",
                borderColor: "#B08CE1",
              }}
            >
              <text style={{ fontWeight: "bolder" }}>{art.username}</text>
            </Button>
            <Button
              color="primary"
              style={{
                backgroundColor: "#B08CE1",
                color: "white",
                borderColor: "white",
                marginLeft: "10px",
                marginRight: "10px",
              }}
              onClick={() => {
                upvote(true);
              }}
            >
              {`${art.upvotes}`} <AiFillLike color={colorL} />
            </Button>
            <Button
              color="primary"
              style={{
                backgroundColor: "#B08CE1",
                color: "white",
                borderColor: "white",
                marginLeft: "10px",
                marginRight: "10px",
              }}
              onClick={() => {
                upvote(false);
              }}
            >
              {`${art.downvotes}`} <AiFillDislike color={colorD} />
            </Button>
            <br />
            <br />
            <Row>
              {art.tags.map((val, index) => {
                return (
                  <Fragment key={index + val}>
                    <Badge
                      color="light"
                      style={{ marginLeft: "12px", fontSize: "1.0rem" }}
                    >
                      {val}
                    </Badge>
                    {"\t"}
                  </Fragment>
                );
              })}{" "}
            </Row>
            <br />

            <div>
              <h2>Comments:</h2>
              <InputGroup style={{ width: "1040px" }}>
                <Input
                  placeholder="and..."
                  type="textarea"
                  value={comm}
                  onChange={changeComm}
                />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" onClick={onComm}>
                    Comment
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <br/>
              <Comments comments={art.comments} updateC={updateC} />
        

              
            </div>
          </div>
        )}
        {loading || (err && <h1>Some error</h1>)}
      </Jumbotron>
    </div>
  );
}

export default Post;
