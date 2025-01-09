import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Course.css';

const CourseComponent = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/courses', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching courses!", error);
      });
  }, []);


  const handleCreate = () => {
    axios.post('http://127.0.0.1:8000/api/courses', {
      name: courseName,
      description: courseDescription,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setCourses([...courses, response.data]);
        setCourseName('');
        setCourseDescription('');
      })
      .catch(error => {
        console.error("There was an error creating the course!", error);
      });
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setCourseName(course.name);
    setCourseDescription(course.description);
  };

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/courses/${editingCourse.id}`, {
      name: courseName,
      description: courseDescription,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setCourses(courses.map(course => course.id === editingCourse.id ? response.data : course));
        setEditingCourse(null);
        setCourseName('');
        setCourseDescription('');
      })
      .catch(error => {
        console.error("There was an error updating the course!", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        setCourses(courses.filter(course => course.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the course!", error);
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
          <h2 className="text-center mb-4">Courses</h2>

          <div className="mb-4">
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="form-control mb-2"
              placeholder="Course Name"
            />
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="form-control mb-2"
              placeholder="Course Description"
            />
            <button
              onClick={editingCourse ? handleUpdate : handleCreate}
              className={`btn ${editingCourse ? 'btn-warning' : 'btn-success'} w-100`}
            >
              {editingCourse ? 'Update Course' : 'Create Course'}
            </button>
          </div>

          <table className="table table-striped table-bordered mt-3">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>
                    <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(course)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(course.id)}>
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

export default CourseComponent;
