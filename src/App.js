import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TopNavbar from './components/TopNavbar';
import Home from './pages/Home'
import Help from './pages/Help'
import Chat from './pages/Chat'
import Dashboard from './pages/Dashboard'
function App() {
  return (
    <>
      <TopNavbar />
      <div className='p-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/help' element={<Help />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
