import React, { useState, useEffect } from 'react';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Input, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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
      const url = year && sem ? `/api/instances/${year}/${sem}` : '/api/instances';
      const response = await AxiosInstance.get(url);
      setInstances(response.data);
    } catch (error) {
      console.error('Error fetching instances:', error);
    }
  };

  const handleSearch = () => {
    fetchInstances(year, sem);
  };

  return (
    <Container>
      <Header as='h2'>Course Instances</Header>
      <Input 
        placeholder='Year' 
        value={year} 
        onChange={(e) => setYear(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Input 
        placeholder='Semester' 
        value={sem} 
        onChange={(e) => setSem(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button primary onClick={handleSearch}>Search</Button>
      
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Course Title</Table.HeaderCell>
            <Table.HeaderCell>Course Code</Table.HeaderCell>
            <Table.HeaderCell>Semester</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {instances.map(instance => (
            <Table.Row key={instance.id}>
              <Table.Cell>{instance.course_title}</Table.Cell>
              <Table.Cell>{instance.course_code}</Table.Cell>
              <Table.Cell>{instance.semester}</Table.Cell>
              <Table.Cell>{instance.year}</Table.Cell>
              <Table.Cell>
                <Button primary onClick={() => navigate(`/instances/${instance.year}/${instance.semester}/${instance.course}`)}>View</Button>
                <Button negative>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default CourseInstances;
