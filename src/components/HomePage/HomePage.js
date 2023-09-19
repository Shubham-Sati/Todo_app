import React, { useEffect, useState } from "react";
import "./HomePage.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";

//getting tasks in the local storage
const getTasksFromLocalStorage = () => {
  let allTasks = localStorage.getItem("tasksToDo");

  if (allTasks) {
    return JSON.parse(localStorage.getItem("tasksToDo"));
  } else {
    return [];
  }
};

const HomePage = () => {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState(getTasksFromLocalStorage());
  const [toggle, setToggle] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  //setting tasks in the local storage
  useEffect(() => {
    localStorage.setItem("tasksToDo", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (!inputTask) return;

    if (toggle === true) {
      setTasks(
        tasks.map((task) => {
          if (task.id === updatingId) {
            return {
              ...task,
              name: inputTask,
            };
          }
          return task;
        })
      );

      setToggle(false);
      setUpdatingId(null);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputTask,
      };
      setTasks([...tasks, newInputData]);
    }

    setInputTask("");
  };

  // Delete Task
  const deleteTask = (id) => {
    const updatedTask = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(updatedTask);
  };

  // Edit Task
  const editTask = (id) => {
    const editingTask = tasks.find((elem) => elem.id === id);
    setToggle(true);

    setInputTask(editingTask.name);
    setUpdatingId(id);
  };

  // Delete All Tasks
  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div className="mainDiv">
      <div className="childDiv">
        <div className="title">
          <h2>Todo App</h2>
        </div>

        <div className="addItems">
          <input
            type="text"
            value={inputTask}
            placeholder="Add Task..."
            onChange={(e) => setInputTask(e.target.value)}
          />

          {toggle === false ? (
            <AddIcon className="addIcon" onClick={addTask} />
          ) : (
            <EditCalendarRoundedIcon className="editIcon" onClick={addTask} />
          )}
        </div>

        <div className="showItems">
          {tasks.map((task) => {
            return (
              <div className="item" key={task.id}>
                <p className="itemName">{task.name}</p>

                <div className="buttons">
                  <EditCalendarRoundedIcon
                    className="editIcon"
                    onClick={() => editTask(task.id)}
                  />

                  <DeleteForeverIcon
                    className="trashIcon"
                    onClick={() => deleteTask(task.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="clearAll">
          {tasks.length > 0 ? (
            <button onClick={clearAll}>Clear All</button>
          ) : (
            <div className="noTasks">
              <p>No Tasks Added</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
