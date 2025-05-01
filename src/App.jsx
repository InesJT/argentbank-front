import { BrowserRouter, Route, Routes } from "react-router";

import Layout from "./layout";

import Home from "/src/pages/home";
import Error404 from "/src/pages/error";
import Login from "./pages/login";
import Profile from "./pages/profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
