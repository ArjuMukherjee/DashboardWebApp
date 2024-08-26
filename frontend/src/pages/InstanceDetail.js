import React, { useState, useEffect } from 'react';
import AxiosInstance from '../components/Axios';
import { useParams } from 'react-router-dom';

const InstanceDetail = () => {
  const [instance, setInstance] = useState(null);
  const { year, sem, course_id } = useParams(); // Extract year, sem, and course_id from URL params

  useEffect(() => {
    fetchInstanceDetails();
  },[]);

  const fetchInstanceDetails = async () => {
    try {
      const response = await AxiosInstance.get(`/api/instances/${year}/${sem}/${course_id}`);
      setInstance(response.data[0]);
    } catch (error) {
      console.error('Error fetching instance details:', error);
    }
  };

  if (!instance) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Course Instance Details</h1>
      <p><strong>Year:</strong> {instance.year}</p>
      <p><strong>Semester:</strong> {instance.semester}</p>
      <p><strong>Course Title:</strong> {instance.course_title}</p>
      <p><strong>Course Code:</strong> {instance.course_code}</p>
      <p><strong>Course Description:</strong> {instance.course_description}</p>
    </div>
  );
};

export default InstanceDetail;
