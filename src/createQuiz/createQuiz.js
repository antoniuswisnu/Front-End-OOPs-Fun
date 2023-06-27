import React, { useState, useEffect } from "react";
import "./style/createQuiz.css";
import { Link } from "react-router-dom";

function CreateQuizPage() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [label, setLabel] = useState("");
  const [keyLabel, setKey] = useState("");

  useEffect(() => {
    const labels = JSON.parse(localStorage.getItem("key") || []);
    setLabel(labels.label);
    setKey(labels.key);
    // const data = JSON.parse(localStorage.getItem("data")) || [];
    // setQuestions(data);

    const getQuestions = async () => {
      let result = await fetch("http://localhost:8080/dashboard/create-question/getquestions", {
        method: "post",
        body: JSON.stringify({ key: JSON.parse(localStorage.getItem("key")).key }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setQuestions(response);
          return response;
        });
    };

    getQuestions();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      updateQuestion();
    } else {
      addQuestion();
    }
  }

  const addQuestion = async () => {
    const newQuestion = {
      question,
      option1,
      option2,
      option3,
      option4,
      option5,
      correctAnswer,
      label,
      keyLabel,
    };

    let result = await fetch("http://127.0.0.1:8080/dashboard/create-question/create", {
      method: "post",
      body: JSON.stringify(newQuestion),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        alert("Berhasil menambah pertanyaan!");
        return response;
      });

    resetForm();
  };

  function updateQuestion() {
    const newQuestions = [...questions];
    newQuestions[editingIndex] = {
      question,
      option1,
      option2,
      option3,
      option4,
      option5,
    };
    setQuestions(newQuestions);
    localStorage.setItem("data", JSON.stringify(newQuestions));
    resetForm();
  }

  const deleteQuestion = async (index, key) => {
    // const newQuestions = [...questions];
    // newQuestions.splice(index, 1);
    // setQuestions(newQuestions);
    // localStorage.setItem("data", JSON.stringify(newQuestions));
    let deleteQues = await fetch(`http://localhost:8080/dashboard/create-question/delete/${key}`, {
      method: "delete",
    }).then(alert("Berhasil dihapus"));
  };

  function editQuestion(index) {
    const question = questions[index];
    setQuestion(question.question);
    setOption1(question.option1);
    setOption2(question.option2);
    setOption3(question.option3);
    setOption4(question.option4);
    setOption5(question.option5);
    setEditing(true);
    setEditingIndex(index);
  }

  function resetForm() {
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setOption5("");
    setCorrectAnswer(null);
    setEditing(false);
    setEditingIndex(null);
  }

  return (
    <div className="container">
      <div className="close2">
        <Link to="/dashboard/create-question">
          <button type="button" class="btn-close">
            <span class="icon-cross"></span>
            <span class="visually-hidden">Close</span>
          </button>
        </Link>
      </div>

      <h1 className="judul-add-question">CRUD Soal dan Pilihan Jawaban</h1>

      <hr className="garis2"></hr>

      <form onSubmit={handleSubmit} className="container soal-container">
        <div className="pertanyaan-container">
          <div className="form-soal">
            <label>Create Question</label>
          </div>

          <div className="form-group">
            <label htmlFor="question">Pertanyaan</label>
            <textarea placeholder="untitled question" type="textarea" className="form-control" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="option1">Pilihan Jawaban A</label>
            <input type="text" className="form-control" id="option1" value={option1} onChange={(e) => setOption1(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="option2">Pilihan Jawaban B</label>
            <input type="text" className="form-control" id="option2" value={option2} onChange={(e) => setOption2(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="option3">Pilihan Jawaban C</label>
            <input type="text" className="form-control" id="option3" value={option3} onChange={(e) => setOption3(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="option4">Pilihan Jawaban D</label>
            <input type="text" className="form-control" id="option4" value={option4} onChange={(e) => setOption4(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="option5">Pilihan Jawaban E</label>
            <input type="text" className="form-control" id="option5" value={option5} onChange={(e) => setOption5(e.target.value)} required />
          </div>
        </div>

        <h4 className="right-choices">Pilihan Jawaban Benar</h4>

        <div className="pilihan-jawaban">
          <div>
            <input type="radio" id="A" name="correct-answer" onChange={(e) => setCorrectAnswer(e.target.value)} value="option1"></input>
            <label for="A">A</label>
          </div>
          <div>
            <input type="radio" id="B" name="correct-answer" onChange={(e) => setCorrectAnswer(e.target.value)} value="option2"></input>
            <label for="B">B</label>
          </div>
          <div>
            <input type="radio" id="C" name="correct-answer" onChange={(e) => setCorrectAnswer(e.target.value)} value="option3"></input>
            <label for="C">C</label>
          </div>
          <div>
            <input type="radio" id="D" name="correct-answer" onChange={(e) => setCorrectAnswer(e.target.value)} value="option4"></input>
            <label for="D">D</label>
          </div>
          <div>
            <input type="radio" id="E" name="correct-answer" onChange={(e) => setCorrectAnswer(e.target.value)} value="option5"></input>
            <label for="E">E</label>
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="btn btn-primary btn-add-question2">
            {editing ? "Update" : "Tambah"}
          </button>

          {editing && (
            <button type="button" className="btn btn-secondary ml-2 btn-batal" onClick={resetForm}>
              Batal
            </button>
          )}
        </div>
      </form>

      <h1 className="judul-add-question mt-3">Daftar Soal</h1>

      <hr className="garis2"></hr>

      {questions.map((question, index) => (
        <div key={index} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">
              {index + 1}. {question.question}
            </h5>
            <ul className="list-group">
              <li className="list-group-item">A. {question.option1}</li>
              <li className="list-group-item">B. {question.option2}</li>
              <li className="list-group-item">C. {question.option3}</li>
              <li className="list-group-item">D. {question.option4}</li>
              <li className="list-group-item">E. {question.option5}</li>
            </ul>
            <div className="button-container mt-2">
              {/* <button type="button" className="btn btn-secondary mr-2" onClick={() => editQuestion(index)}>
                Edit
              </button> */}
              <button type="button" className="btn btn-batal" onClick={() => deleteQuestion(index, question._id)}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CreateQuizPage;
