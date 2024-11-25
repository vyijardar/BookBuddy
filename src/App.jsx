// import { useState } from 'react'
import bookLogo from './assets/books.png'
import { Routes, Route } from 'react-router-dom'
import Books from "./components/Books"
import SingleBook from './components/SingleBook'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'

function App() {
  // const [token, setToken] = useState(null)

  return (
    <>
      <h1><img id='logo-image' src={bookLogo} />BookBuddy Library App</h1>

      <Routes>
        <Route path='/books' element={<Books />}></Route>
        <Route path='/:id' element={<SingleBook />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/account' element={<Account />}></Route> 
      </Routes>
      {/* <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

      <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

      <p>Don't forget to set up React Router to navigate between the different views of your single page application!</p> */}
    </>
  )
}

export default App
