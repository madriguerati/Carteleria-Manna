import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/holi" element={'string'}/>
      <Route path="/otro" element={'qwerty'}/>
    </Routes>
  );
};

export default AppRouter;
