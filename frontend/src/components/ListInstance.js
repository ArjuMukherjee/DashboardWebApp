import React, { useState, useEffect } from 'react';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';

const CourseInstances = () => {
  const [instances, setInstances] = useState([]);
  const [year, setYear] = useState('');
  const [sem, setSem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstances();
  }, []);

  const fetchInstances = async (year = '', sem = '') => {
    try {
      const url = year && sem 
        ? `/api/instances/${year}/${sem}` 
        : '/api/instances';
      const response = await AxiosInstance.get(url);
      setInstances(response.data);
    } catch (error) {
      console.error('Error fetching instances:', error);
    }
  };

  const handleView = (year, sem, courseId) => {
    navigate(`/instances/${year}/${sem}/${courseId}`);
  };

  const handleDelete = async (year, sem, courseId) => {
    try {
      await AxiosInstance.delete(`/api/instances/${year}/${sem}/${courseId}`);
      fetchInstances();
    } catch (error) {
      console.error('Error deleting instance:', error);
    }
  };

  const handleSearch = () => {
    fetchInstances(year, sem);
  };

  return (
    <div>
      <h1>Course Instances</h1>
      
      <div>
        <input 
          type="text" 
          placeholder="Year" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Semester" 
          value={sem} 
          onChange={(e) => setSem(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Course Code</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance) => (
            <tr key={instance.id}>
              <td>{instance.course_title}</td>
              <td>{instance.course_code}</td>
              <td>{instance.semester}</td>
              <td>{instance.year}</td>
              <td>
                <button onClick={() => handleView(instance.year, instance.semester, instance.course)}>View</button>
                <button onClick={() => handleDelete(instance.year, instance.semester, instance.course)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseInstances;
