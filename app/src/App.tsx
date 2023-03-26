import './App.css'
import Header from './Components/Header/Header'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
function App() {
  const authSlice = useSelector((state: any) => state.auth);
  return (
    <div className="App">
      <Header />
      <Routes>
        {
          authSlice ?
            <Route path='*' element={<Home />}></Route>
            :
            <Route path='*' element={<LandingPage />}></Route>
        }
      </Routes>
    </div>
  )
}

export default App
