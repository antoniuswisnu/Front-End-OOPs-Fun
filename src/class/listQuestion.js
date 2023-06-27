import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ListGroupWithHeaderExample() {
  return (
    <div className="container mt-5">
      <h1>List Question</h1>
      <Card className="mt-5" style={{ width: "18rem" }}>
        <Card.Header>Pertanyaan</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>A. Jawaban 1</ListGroup.Item>
          <ListGroup.Item>B. Jawaban 2</ListGroup.Item>
          <ListGroup.Item>C. Jawaban 3</ListGroup.Item>
          <ListGroup.Item>D. Jawaban 4</ListGroup.Item>
          <ListGroup.Item>E. Jawaban 5</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="primary">Add Qeustion</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListGroupWithHeaderExample;
