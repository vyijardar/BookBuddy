import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Books from "./components/Books"
import SingleBook from './components/SingleBook'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import Navigations from './components/Navigations'

function App() {
const [token,setToken] = useState("");
  return (
      <>
        <Navigations />
        <Routes>
          <Route path='/books' element={<Books />}></Route>
          <Route path='/:id' element={<SingleBook />}></Route>
          <Route path='/login' element={<Login  token={token} setToken={setToken}/>}></Route>
          <Route path='/register' element={<Register token={token} setToken={setToken}/>}></Route>
          <Route path='/account' element={<Account token={token} setToken={setToken} />}></Route>
        </Routes>

      </>
  )
}

export default App
