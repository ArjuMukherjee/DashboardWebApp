import React, { useEffect, useState } from 'react';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';

const DisplayCourse = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch all courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await AxiosInstance.get('/api/courses');
      setCourses(response.data); // Assuming the API returns an array of courses
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const viewCourse = (courseId) => {
    // Handle viewing the course details
    // Typically, you would navigate to a different route to view course details
    navigate(`/courses/${courseId}`);
  };

  const deleteCourse = async (courseId) => {
    try {
      await AxiosInstance.delete(`/api/courses/${courseId}`);
      alert('Course deleted successfully!');
      // Refresh the list of courses after deletion
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course.');
    }
  };

  return (
    <div>
      <h1>Course List</h1>
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Course Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.code}</td>
                <td>
                  <button onClick={() => viewCourse(course.id)}>View</button>
                  <button onClick={() => deleteCourse(course.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No courses available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayCourse;
