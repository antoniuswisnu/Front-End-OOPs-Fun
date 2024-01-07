import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

import UserComponents from "./components/UserComponents";
import StudentComponents from "./components/StudentComponents";
import TeacherComponents from "./components/TeacherComponents";

import DashboardClass from "./dashboard/DashboardClass";
import DashboardQuestion from "./dashboard/DashboardQuestion";
import CreateQuestion from "./teacher/quiz/CreateQuestion";

import TokenStudent from "./modal/TokenStudent";

import TeacherClass from "./teacher/class/TeacherClass";
import AddListQuestion from "./teacher/class/AddListQuestion";
import ListQuestion from "./teacher/class/ListQuestion";
import ListGradeClass from "./teacher/class/ListGradeClass";
import ListLabel from "./teacher/class/ListLabel";

import DashboardQuiz from "./student/DashboardQuiz";
import StudentClass from "./student/StudentClass";
import StudentQuiz from "./student/StudentQuiz";
import SaveGrade from "./student/SaveGrade";

import TeacherBoard from "./leaderboard/TeacherBoard";
import StudentBoard from "./leaderboard/StudentBoard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<UserComponents />}>
            <Route element={<TeacherComponents />}>
              <Route path="/dashboard/create-class" element={<DashboardClass />} />
              <Route path="/dashboard/create-question" element={<DashboardQuestion />} />
              <Route path="/dashboard/create-question/create" element={<CreateQuestion />} />
            </Route>

            <Route element={<StudentComponents />}>
              <Route path="/student/inputtoken/" element={<TokenStudent />} />
              <Route path="/student/class/" element={<StudentClass />} />
              <Route path="/student/class/leaderboard/" element={<StudentBoard />} />
            </Route>

            <Route path="/student/class/quiz/" element={<DashboardQuiz />} />
            <Route path="/student/class/quiz/started/" element={<StudentQuiz />} />
            <Route path="/student/class/quiz/started/saved" element={<SaveGrade />} />

            <Route path="/teacher/class/quiz" element={<TeacherClass />} />
            <Route path="/teacher/class/quiz/question" element={<ListQuestion />} />
            <Route path="/teacher/class/quiz/question/listlabel" element={<ListLabel />} />
            <Route path="/teacher/class/quiz/question/listlabel/listquestion" element={<AddListQuestion />} />
            <Route path="/teacher/class/leaderboard" element={<TeacherBoard />} />

            <Route path="/teacher/class/quiz/grades" element={<ListGradeClass />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
