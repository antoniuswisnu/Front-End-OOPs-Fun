import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./style/cardQuiz.css";

const WithHeaderExample = ({ label }) => {
  const nav = useNavigate();

  const enterQuiz = (key) => {
    nav("/teacher/class/quiz/question");
    localStorage.setItem("keyQuiz", JSON.stringify({ keyQuiz: key }));
  };

  const deleteQuiz = async (key) => {
    if (window.confirm("Are you sure to delete this quiz?")) {
      await fetch(`http://localhost:8080/teacher/class/quiz/delete/${key}`, {
        method: "delete",
      });
      window.location.reload();
    } else {
      // do nothing
    }
  };

  return (
    <div className="container card-body-quiz">
      <Card className="mt-3 label-card-quiz">
        <Card.Header className="header-card-quiz">
          {label.nameQuiz} | Minimum Level : {label.levelMinimum}
        </Card.Header>
        <Card.Body>
          <Card.Text className="text-card-quiz">Key : {label._id}</Card.Text>
          <Button variant="danger text-sm btn-delete-quiz" onClick={() => deleteQuiz(label._id)}>
            Delete Quiz
          </Button>
          <Button variant="primary ms-3 btn-start-quiz" onClick={() => enterQuiz(label._id)}>
            Enter Quiz
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WithHeaderExample;
