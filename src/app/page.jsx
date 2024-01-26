"use client";
import { useTareasContext } from "./context/TaskContext";
import TaskCard from "@/components/TaskCard";
import Link from "next/link";
import { useTheme } from "./context/ThemeContext";

function HomePage() {
  const { tasksUser } = useTareasContext();
  const { tasksUserLength } = useTareasContext();

  return (
    <section className={`transition flex flex-col w-[600px] max-sm:w-[90%] min-h-[150px] absolute top-[-50px] gap-6 mt-4 p-4 rounded-2xl h-[100%] overflow-scroll`}>
      {tasksUserLength == 0 ? (
        <div className="w-[100%] h-[100%] flex flex-col items-center gap-8">
          <h2>Crear mi primer tarea</h2>
          <Link
            href={"/tasks/new"}
            className={`scale-150 group w-[40px] h-[40px] grid place-items-center bg-sky-600 rounded-[50%]`}
          >
            <svg
              className="group-hover:scale-110 transition"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_403_3168)">
                <path
                  d="M23 11H13V1C13 0.734784 12.8946 0.48043 12.7071 0.292893C12.5196 0.105357 12.2652 0 12 0V0C11.7348 0 11.4804 0.105357 11.2929 0.292893C11.1054 0.48043 11 0.734784 11 1V11H1C0.734784 11 0.48043 11.1054 0.292893 11.2929C0.105357 11.4804 0 11.7348 0 12H0C0 12.2652 0.105357 12.5196 0.292893 12.7071C0.48043 12.8946 0.734784 13 1 13H11V23C11 23.2652 11.1054 23.5196 11.2929 23.7071C11.4804 23.8946 11.7348 24 12 24C12.2652 24 12.5196 23.8946 12.7071 23.7071C12.8946 23.5196 13 23.2652 13 23V13H23C23.2652 13 23.5196 12.8946 23.7071 12.7071C23.8946 12.5196 24 12.2652 24 12C24 11.7348 23.8946 11.4804 23.7071 11.2929C23.5196 11.1054 23.2652 11 23 11Z"
                  fill="#ffffff"
                />
              </g>
              <defs>
                <clipPath id="clip0_403_3168">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      ) : (
        tasksUser.map((task, index) => (
          <TaskCard task={task} index={index + 1} key={index} />
        ))
      )}
    </section>
  );
}

export default HomePage;
