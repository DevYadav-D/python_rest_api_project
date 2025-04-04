import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Welcome from "./components/Welcome";
import CreateUser from "./components/CreateUser";
import GetAllUser from "./components/GetAllUser";
import GetSingleUser from "./components/GetSingleUser";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/get-all-users" element={<GetAllUser />} />
          <Route path="/get-single-user" element={<GetSingleUser />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import { createBrowserRouter, Route, RouterProvider, BrowserRouter as Router } from 'react-router-dom';
// import Header from "./components/Header";
// import Body from "./components/Body";
// import Welcome from "./components/Welcome";
// import CreateUser from "./components/CreateUser";
// import GetAllUser from "./components/GetAllUser";
// import GetSingleUser from "./components/GetSingleUser";
// import UpdateUser from "./components/UpdateUser";
// import DeleteUser from "./components/DeleteUser";
// import Login from "./components/Login";


// const appRouter = createBrowserRouter([{
//   path : "/",
//   element: <Body />,
//   children : [
//     {
//       path:"/",
//       element: <Welcome />
//     },
//     {
//       path:"/create-user",

//       element: <CreateUser />
//     },
//     {
//       path:"/get-all-users",

//       element: <GetAllUser />
//     },
//     {
//       path:"/get-single-user",

//       element: <GetSingleUser />
//     },
//     {
//       path:"/update-user",

//       element: <UpdateUser />
//     },
//     {
//       path:"/delete-user",

//       element: <DeleteUser />
//     },
//     {
//       path:"/login",

//       element: <Login />
//     },
//   ]},
// ]);
// function App() {
//   return (
//     <div>
//       <Header />
//       <RouterProvider router={appRouter} />
//     </div>
//   );
// }

// export default App;
