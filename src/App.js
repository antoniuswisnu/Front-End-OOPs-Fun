import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import Modal from "./modal/modal/dashboardClass";
import Question from "./modal/modal/dashboardQuestion";
import UserComponents from "./components/UserComponents";
import StudentComponents from "./components/SiswaComponents";
import TeacherComponents from "./components/TeacherComponents";
import TokenStudent from "./modal/modal/TokenStudent";
import ClassPage from "./class/class";
import Board from "./leaderboard/board";
import QuestionQuiz from "./class/questionQuiz";
import CreateQuiz from "./createQuiz/createQuiz";
import ListLabel from "./class/listLabel";
import ClassListQuestion from "./class/ClassListQuestion";
import StudentClass from "./student/studentClass";
import StudentBoard from "./studentLeaderboard/Studentboard";
import QuizApp from "./student/studentQuiz";
import DashboardQuiz from "./student/dashboardQuiz";
import SaveGrade from "./student/saveGrade";
import ListGradeInClass from "./class/listGradeClass";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          <Route element={<UserComponents />}>
            <Route element={<TeacherComponents />}>
              <Route path="/dashboard/create-class" element={<Modal />} />
              <Route path="/dashboard/create-question" element={<Question />} />
              <Route path="/dashboard/create-question/create" element={<CreateQuiz />} />
            </Route>

            <Route element={<StudentComponents />}>
              <Route path="/student/inputtoken/" element={<TokenStudent />} />
              <Route path="/student/class/" element={<StudentClass />} />
              <Route path="/student/class/leaderboard/" element={<StudentBoard />} />
            </Route>

            <Route path="/student/class/quiz/" element={<DashboardQuiz />} />
            <Route path="/student/class/quiz/started/" element={<QuizApp />} />
            <Route path="/student/class/quiz/started/saved" element={<SaveGrade />} />
            <Route path="/teacher/class/quiz/question/listlabel/listquestion" element={<ClassListQuestion />} />
            <Route path="/teacher/class/quiz/question/listlabel" element={<ListLabel />} />
            <Route path="/teacher/class/quiz/question" element={<QuestionQuiz />} />
            <Route path="/teacher/class/quiz" element={<ClassPage />} />
            <Route path="/teacher/class/leaderboard" element={<Board />} />

            <Route path="/teacher/class/quiz/grades" element={<ListGradeInClass />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
