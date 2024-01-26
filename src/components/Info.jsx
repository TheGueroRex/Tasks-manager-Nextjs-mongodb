"use client";
import { useSession } from "next-auth/react";
import { useTareasContext } from "@/app/context/TaskContext";
import { usePathname } from "next/navigation";

function Info() {
  const currentRoute = usePathname();
  const { data: session } = useSession();
  const userName = session?.user.fullname;

  const { tasksUserLength } = useTareasContext();
  const { tasksCompletLength } = useTareasContext();

  return (
    <section className={`flex w-[600px] max-sm:w-[90%] absolute`}>
      <h3 className="text-white p-8 max-[500px]:px-2 py-10">
        
        {currentRoute == "/login" || currentRoute == "/register" ? <p><strong className="text-3xl">Bienvenido a <h2 className="text-sky-500">DevTasks </h2></strong>Administrador de tareas minimalista</p> : <div className="text-3xl">Hola, <br /> {userName}</div> }
      </h3>

      <div className={`${currentRoute == "/login" || currentRoute == "/register" ? "hidden" : "visible"} flex self-start p-8 ml-auto gap-[20px] max-[500px]:p-2 max-[500px]:flex-col`}>
        <div className="flex flex-col">
          <h2 className="text-white text-3xl self-end">{tasksUserLength}</h2>
          <p className="text-white text-xs font-light max-[500px]:self-end">Tareas</p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-white text-3xl self-end">
            {tasksCompletLength}
          </h2>
          <p className="text-white text-xs font-light max-[500px]:self-end">Completadas</p>
        </div>
      </div>
    </section>
  );
}

export default Info;
