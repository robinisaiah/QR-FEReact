import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css';

const StudentComponent = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentDob, setStudentDob] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/students', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching students!", error);
      });
  }, []);


  const handleCreate = () => {
    console.log(setStudentEmail);
    axios.post('http://127.0.0.1:8000/api/students', {
      name: studentName,
      email: studentEmail,
      dob: studentDob,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setStudents([...students, response.data]);
        setStudentName('');
        setStudentEmail('');
        setStudentDob('');
      })
      .catch(error => {
        console.error("There was an error creating the student!", error);
      });
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setStudentName(student.name);
    setStudentEmail(student.email);
    setStudentDob(student.dob);
  };

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/students/${editingStudent.id}`, {
        name: studentName,
        email: studentEmail,
        dob: studentDob,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setStudents(students.map(student => student.id === editingStudent.id ? response.data : student));
        setEditingStudent(null);
        setStudentName('');
        setStudentEmail('');
        setStudentDob('');
      })
      .catch(error => {
        console.error("There was an error updating the student!", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/students/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the student!", error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white p-4">
          <h4 className="text-center">Sidebar</h4>
          <ul className="list-unstyled">
          <li><a href="/course" className="text-white">Courses</a></li>
            <li><a href="/student" className="text-white">Students</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <h2 className="text-center mb-4">Students</h2>

          <div className="mb-4">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="form-control mb-2"
              placeholder="Student Name"
            />
             <input
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="form-control mb-2"
              placeholder="Student Email"
            />
            <input
              type="date"
              value={studentDob}
              onChange={(e) => setStudentDob(e.target.value)}
              className="form-control mb-2"
              placeholder="Student DOB"
            />
            <button
              onClick={editingStudent ? handleUpdate : handleCreate}
              className={`btn ${editingStudent ? 'btn-warning' : 'btn-success'} w-100`}
            >
              {editingStudent ? 'Update Student' : 'Create Student'}
            </button>
          </div>

          <table className="table table-striped table-bordered mt-3">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Student DOB</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.dob}</td>
                  <td>
                    <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(student)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentComponent;
