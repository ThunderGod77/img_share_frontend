import "./../App.css";
import { Fragment } from "react";

import {
  Card,
  CardTitle,
  Button,
  CardText,
  InputGroup,
  Input,
  InputGroupAddon,
} from "reactstrap";

import { useState } from "react";
import Comment from "./Comment";

function Comments({ comments, updateC }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      {comments.map((val, index) => {
        return <Comment val={val} key={val._id.toString()} updateC={updateC} />;
      })}
    </Fragment>
  );
}
export default Comments;
