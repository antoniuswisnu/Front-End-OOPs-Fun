import Card from "react-bootstrap/Card";

const CardGrade = ({ data }) => {
  return (
    <Card className="mt-4">
      <Card.Header>Grade</Card.Header>
      <Card.Body>
        <Card.Text>Nama : {data.userID}</Card.Text>
        <Card.Text>Attempt : {data.attempt}</Card.Text>
        <Card.Text>Grade : {data.grade}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardGrade;
