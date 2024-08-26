import React, { useState } from 'react';
import AxiosInstance from './Axios';

const CreateCourse = () => {

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const courseData = {
      title: title,
      code: code,
      description: description,
    };

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Course Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="code">Course Code:</label>
        <input
          type="text"
          id="code"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Course Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateCourse;
