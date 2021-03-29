import { Card, CardTitle, CardText, Button } from "reactstrap";
import { CgProfile } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";

function App({ nval, nindex }) {
  return (
    <Card
      body
      color="dark"
      style={{
        marginLeft: "50px",
        border: "solid 2px #B08CE1",
      }}
      key={nindex}
    >
      <CardTitle tag="h5">
        {" "}
        <CgProfile /> {nval.username}
      </CardTitle>
      <CardText style={{ wordWrap: "break-word" }}>{nval.comment}</CardText>
    </Card>
  );
}

export default App;
