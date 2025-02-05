import React, { useState, useEffect } from "react";
import "./task.scss";
import flowers from "../../../images/flowers.png";
import remove from "../../../images/remove.png";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      {
        value: newTask,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setNewTask("");
  };

  const changeInput = (e) => {
    setNewTask(e.target.value);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const dayOfWeek = dayNames[time.getDay()];

  return (
    <>
      <div className="container">
        <div>
          <div>
            <img src={flowers} alt="flowers" />
          </div>
          <div className="time">
            <h1 className="day">{dayOfWeek}</h1>
            <h1>
              {hours}:{minutes}AM
            </h1>
          </div>
        </div>
        <div className="inputDiv">
          <input
            type="text"
            value={newTask}
            onChange={changeInput}
            placeholder="Note"
          />
          <button onClick={addTask}>+</button>
        </div>

        {tasks.map((task, index) => (
          <div key={index} className="tasks-div">
            <div className="names">
              <p>{task.value}</p>
              <span>Today at {task.time}</span>
            </div>
            <div className="delete">
              <input type="checkbox" onChange={() => toggleCompleted(index)} />

              <button onClick={() => deleteTask(index)}>
                <img src={remove} alt="remove" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Tasks;
