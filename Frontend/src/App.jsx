import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Todo from "./components/Todo";
import UdpateTodo from "./components/udpateTodo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
        </Routes>
        <Routes>
          <Route path="/update/:todoId" element={<UdpateTodo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
