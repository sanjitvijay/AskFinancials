import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import TopNavbar from './components/TopNavbar';
function App() {
  return (
    <>
      <TopNavbar />
      <div className='p-5'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
