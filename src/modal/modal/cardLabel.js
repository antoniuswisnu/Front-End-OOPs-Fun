import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./style/cardLabel.css";

const WithHeaderExample = ({ label }) => {
  const nav = useNavigate();

  const listQuestion = (labels, key) => {
    nav("/teacher/class/quiz/question/listlabel/listquestion");
    localStorage.setItem("keyLabel", JSON.stringify({ keyLabel: key }));
  };

  const deleteLabel = async (key) => {
    let deletelabel = await fetch(`http://localhost:8080/dashboard/create-question/deletelabel/${key}`, {
      method: "delete",
    }).then(alert("Berhasil dihapus"));
  };

  return (
    <div className="container card-body-class">
      <Card className="mt-3 label-card-class">
        <Card.Header className="header-card-class">{label.label}</Card.Header>
        <Card.Body>
          <Card.Text className="text-card-class">Key : {label._id}</Card.Text>
          <Button variant="text-sm btn-enter-class" onClick={() => listQuestion(label.label, label._id)}>
            Add Question
          </Button>
          <Button className="ms-3 text-sm btn-delete-class2" variant="danger" onClick={() => deleteLabel(label._id)}>
            Delete Label
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WithHeaderExample;
