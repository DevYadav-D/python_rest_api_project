import React from 'react'
import { Outlet } from "react-router-dom";


function Body() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Welcome to User CRUD Application</h2>
      <Outlet /> 
    </div>
  )
}

export default Body