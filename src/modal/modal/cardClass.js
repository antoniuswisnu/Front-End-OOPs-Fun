import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./style/cardClass.css";

const WithHeaderExample = ({ label }) => {
  const nav = useNavigate();

  const createQuestion = (labels, key) => {
    nav("/dashboard/create-question/create");
    localStorage.setItem("key", JSON.stringify({ label: labels, key: key }));
  };

  const enterClass = (labels, key) => {
    nav("/teacher/class/quiz");
    localStorage.setItem("key", JSON.stringify({ class: labels, key: key }));
  };

  const deleteLabel = async (key) => {
    let deletelabel = await fetch(`http://localhost:8080/dashboard/create-question/deletelabel/${key}`, {
      method: "delete",
    }).then(alert("Berhasil dihapus"));
  };

  const deleteClass = async (key) => {
    let deletelabel = await fetch(`http://localhost:8080/dashboard/create-class/deleteclass/${key}`, {
      method: "delete",
    }).then(alert("Berhasil dihapus"));
  };

  return (
    <div className="container card-body-class">
      <Card className="mt-3 label-card-class">
        <Card.Header className="header-card-class">{label.class}</Card.Header>
        <Card.Body>
          <Card.Text className="text-card-class">Key : {label._id}</Card.Text>
          <Card.Text className="text-card-class">Token : {label.token}</Card.Text>
          <Button variant="text-sm btn-enter-class" onClick={() => enterClass(label.class, label._id)}>
            Enter Class
          </Button>
          <Button className="ms-3 text-sm btn-delete-class2" variant="danger" onClick={() => deleteClass(label._id)}>
            Delete Class
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WithHeaderExample;
