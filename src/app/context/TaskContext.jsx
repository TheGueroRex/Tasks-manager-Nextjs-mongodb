"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";

const tasksContext = createContext();

export function useTareasContext(){
  return useContext(tasksContext);
}

function TaskContextProvider({ children }) {
  const { data: session } = useSession();
  const userId = session?.user._id;

  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, [tasks]);

  const tasksUser = tasks.filter((task) => task.userId == userId);
  const tasksComplet = tasksUser.filter((task) => task.status === true);

  const tasksUserLength = tasksUser.length;
  const tasksCompletLength = tasksComplet.length;
  
  return (
    <tasksContext.Provider value={{tasksUser, tasksComplet, tasksUserLength, tasksCompletLength}}>
      {children}
    </tasksContext.Provider>
  );
}

export default TaskContextProvider;
