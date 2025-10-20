import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './components/login.jsx'
import ChatPage from './components/chat.jsx'
import { useAuthStore } from './components/useAuthStore.js'
function App() {
  
const {authUser,isLoggedin,login}=useAuthStore();
console.log(authUser,isLoggedin);
  return (
    <>
     
      <Routes>
       <Route path='/login' element={<Login/>} />
        <Route path='/Chat' element={<ChatPage/>} />
      </Routes>
      
      
    </>
  )
}

export default App
