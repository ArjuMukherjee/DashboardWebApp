import React, { useEffect, useState } from 'react';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const DisplayCourse = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get('/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const deleteCourse = async (courseId) => {
    try {
      await AxiosInstance.delete(`/api/courses/${courseId}`);
      alert('Course deleted successfully!');
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course.');
    }
  };

  return (
    <Container>
      <Header as='h2'>Course List</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Course Title</Table.HeaderCell>
            <Table.HeaderCell>Course Code</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {courses.length > 0 ? (
            courses.map(course => (
              <Table.Row key={course.id}>
                <Table.Cell>{course.title}</Table.Cell>
                <Table.Cell>{course.code}</Table.Cell>
                <Table.Cell>
                  <Button primary onClick={() => navigate(`/courses/${course.id}`)}>View</Button>
                  <Button negative onClick={() => deleteCourse(course.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan='3'>No courses available</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default DisplayCourse;
