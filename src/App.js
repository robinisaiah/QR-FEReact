import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import Course from './Course';
import Student from './Student';

function App() {
    return (
      <Router>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/course" element={<Course />} />
          <Route path="/student" element={<Student />} />
      </Routes>
  </Router>
    );
}

export default App;
