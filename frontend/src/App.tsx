import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import TaskBoard from "./components/TaskBoard";
import Header from "./components/Header";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div className="App">
        <TaskBoard />
      </div>
    </DndProvider>
  );
}

export default App;
