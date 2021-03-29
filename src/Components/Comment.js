import { Fragment, useState, useContext } from "react";
import {
  Card,
  CardText,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Collapse,
} from "reactstrap";
import Context from "./../Context";
import { CgProfile } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Reply from "./Reply";
import { useParams } from "react-router-dom";
import Axios from "axios";

function App({ val, index, updateC }) {
  const { showFlashMessage, isLoggedIn } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [comm, setComm] = useState("");

  const changeComm = (e) => {
    setComm(e.target.value);
  };

  const { artId } = useParams();
  const commentId = val._id.toString();
  const onComm = async () => {
    if (!isLoggedIn) {
      showFlashMessage("Please Login!", "danger");
      return;
    }
    if (comm === "") {
      showFlashMessage("Comment is empty!", "danger");
      return;
    }
    try {
      const response = await Axios.post(
        `http://localhost:8080/feed/${artId}/${commentId}/reply`,
        { username: localStorage.getItem("username"), comment: comm },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      updateC(response);
      setComm("");
    } catch (error) {
      showFlashMessage(error.response.data.msg, "danger");
    }
  };

  return (
    <Fragment key={val._id.toString()}>
      <Card
        body
        color="dark"
        className="comments"
        style={{ border: "solid 2px #B08CE1" }}
      >
        <CardTitle tag="h5">
          <CgProfile /> {val.username}
        </CardTitle>
        <CardText style={{ wordWrap: "break-word" }}>{val.comment}</CardText>
      </Card>
      <Button
        onClick={toggle}
        style={{ marginLeft: "4px", marginBottom: "10px", marginTop: "3px" }}
      >
        {isOpen || <MdArrowDropDown />}
        {isOpen && <MdArrowDropUp />}
      </Button>
      <br />
      <Collapse isOpen={isOpen}>
        {val.replies.map((nval, nindex) => {
          return <Reply nindex={nindex} nval={nval} />;
        })}

        <br />
        <InputGroup style={{ marginLeft: "50px", width: "990px" }}>
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
      </Collapse>
      <br />
    </Fragment>
  );
}

export default App;
