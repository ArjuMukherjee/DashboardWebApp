import React, { useState, useEffect } from 'react';
import AxiosInstance from './Axios';

const CreateInstance = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);

  // Fetch the courses for the dropdown list
  const fetchCourses = () => {
    AxiosInstance.get('/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the courses!', error);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    var Year = parseInt(JSON.parse(JSON.stringify(year)));
    var sem = parseInt(JSON.parse(JSON.stringify(semester)));
    var course = parseInt(JSON.parse(JSON.stringify(courseId)));

    const data = {
      'year':Year,
      'semester':sem,
      'course':course
    };

    AxiosInstance.post('/api/instances/', data)
      .then(response => {
        alert('Instance created successfully!');
      })
      .catch(error => {
        console.error('There was an error creating the instance!', error);
        alert('Failed to create instance.');
      });
  };

  // Handle form reset
  const handleRefresh = () => {
    setYear('');
    setSemester('');
    setCourseId('');
    fetchCourses();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Year:</label>
        <input 
          type="number" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Semester:</label>
        <input 
          type="number" 
          value={semester}
          onChange={(e) => setSemester(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Course:</label>
        <select 
          value={courseId} 
          onChange={(e) => setCourseId(e.target.value)} 
          required
        >
          <option value="" disabled>Select a course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleRefresh}>Refresh</button>
      </div>
    </form>
  );
};

export default CreateInstance;
