import React, { useState, useEffect } from 'react';
import AxiosInstance from '../components/Axios';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { courseId } = useParams(); // Extract the course ID from the URL
  const [course, setCourse] = useState(null);

  // Fetch course details when component mounts
  useEffect(() => {
    AxiosInstance.get(`/api/courses/${courseId}`)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
  }, [courseId]);

  // Render a loading message while data is being fetched
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Course Details</h1>
      <p><strong>Course Title:</strong> {course.title}</p>
      <p><strong>Course Code:</strong> {course.code}</p>
      <p><strong>Course Description:</strong> {course.description}</p>
    </div>
  );
};

export default CourseDetails;
