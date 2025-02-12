import React, { useState, useEffect } from 'react';
import AxiosInstance from './Axios';
import { Form, Input, Select, Button, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const CreateInstance = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    AxiosInstance.get('/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { year: parseInt(year), semester: parseInt(semester), course: parseInt(courseId) };
    try {
      await AxiosInstance.post('/api/instances/', data);
      alert('Instance created successfully!');
    } catch (error) {
      console.error('Error creating instance:', error);
      alert('Failed to create instance.');
    }
  };

  return (
    <Container>
      <h2>Create Course Instance</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Year</label>
          <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </Form.Field>
        <Form.Field>
          <label>Semester</label>
          <Input type="number" value={semester} onChange={(e) => setSemester(e.target.value)} required />
        </Form.Field>
        <Form.Field>
          <label>Course</label>
          <Select
            placeholder="Select a course"
            options={courses.map(course => ({ key: course.id, text: course.title, value: course.id }))}
            value={courseId}
            onChange={(e, { value }) => setCourseId(value)}
            required
          />
        </Form.Field>
        <Button type="submit" primary>Submit</Button>
      </Form>
    </Container>
  );
};

export default CreateInstance;
