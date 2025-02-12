import React, { useState } from 'react';
import AxiosInstance from './Axios';
import { Form, Input, TextArea, Button, Container } from 'semantic-ui-react';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const courseData = { title, code, description };

    try {
      const response = await AxiosInstance.post('/api/courses/', courseData);
      if (response.status === 201 || response.status === 200) {
        alert('Course created successfully!');
        setTitle('');
        setCode('');
        setDescription('');
      }
    } catch (error) {
      console.error('There was an error creating the course!', error);
      alert('Failed to create course.');
    }
  };

  return (
    <Container>
      <h2>Create Course</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Course Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Field>
        <Form.Field>
          <label>Course Code</label>
          <Input value={code} onChange={(e) => setCode(e.target.value)} required />
        </Form.Field>
        <Form.Field>
          <label>Course Description</label>
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Field>
        <Button type="submit" primary>Submit</Button>
      </Form>
    </Container>
  );
};

export default CreateCourse;
