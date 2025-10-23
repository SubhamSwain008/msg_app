import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './components/login.jsx'
import ChatPage from './components/chat.jsx'
import { useAuthStore } from './components/useAuthStore.js'
import Signup from './components/signup.jsx'
function App() {
  

  return (
    <>
     
      <Routes>
       <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/' element={<ChatPage/>} />
      </Routes>
      
      
    </>
  )
}

export default App
