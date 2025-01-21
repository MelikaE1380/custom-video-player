
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EmployeesDashboard from './EmployeesDashboard'
import IosPlayer from './IosPlayer/IosPlayer'

function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<EmployeesDashboard />} />

          <Route path='/ios' element={<IosPlayer />} />


        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
