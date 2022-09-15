import './App.css';
import Signup from './Signup';
import Login from './Login'
import Dashboard from './Dashboard'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
