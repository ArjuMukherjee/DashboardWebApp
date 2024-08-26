import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Course from './pages/Course';
import CourseDetails from './pages/CourseDetail';
import Instance from './pages/Instance';
import InstanceDetail from './pages/InstanceDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Course/>}/>
          <Route path="/courses" element={<Course/>}/>
          <Route path="/courses/:courseId" Component={CourseDetails}/>
          <Route path="/instances" element={<Instance/>}/>
          <Route path="/instances/:year/:sem/:course_id" Component={InstanceDetail}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
