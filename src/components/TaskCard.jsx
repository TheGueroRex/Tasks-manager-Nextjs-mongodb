"use client";
import { useTheme } from "@/app/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function TaskCard({ task, index }) {
  const { theme } = useTheme();

  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const hadnleMauseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure want to delete this task?")) {
      try {
        const res = await fetch(`../api/tasks/${task._id}`, {
          method: "DELETE",
        });
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateStatus = async () => {
    let taskStatus;
    if (task.status) {
      taskStatus = false;
    } else {
      taskStatus = true;
    }

    try {
      const res = await fetch(`../api/tasks/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status: taskStatus }),
        headers: {
          "Content-Type": "aplication/json",
        },
      });
      const data = await res.json();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={task._id}
      onMouseEnter={hadnleMauseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${
        theme == "light"
          ? "bg-slate-50 text-slate-800"
          : "bg-slate-800 text-slate-100"
      } relative p-5 flex gap-4 rounded-xl w-[100%] min-h-[150px] transition`}
    >
      <span className="bg-sky-600 w-6 h-6 rounded-[50%] grid place-items-center self-center text-white">
        {index}
      </span>
      <div className="w-[85%] max-sm:w-[80%] max-[500px]:w-[70%] flex flex-col">
        <h3 className="uppercase">{task.title}</h3>
        <p
          className={`${
            theme == "light" ? "text-slate-600" : "text-slate-300"
          } mb-41`}
        >
          {task.description}
        </p>
        <p className="text-sm mt-auto text-slate-500">
          Creado el:{" "}
          <span className="text-sky-600 font-semibold">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>

      <Link
        href={`/tasks/${task._id}`}
        className={`absolute ${
          isHovered
            ? "scale-1 translate-x-[-90%] translate-y-[-120%]"
            : "scale-0"
        }
            ${
              theme == "light" ? "bg-slate-200" : "bg-slate-900"
            }  group  p-2 rounded-[50%] right-4 self-center transition hover:bg-yellow-400`}
      >
        <svg
          className="fill-yellow-400 group-hover:fill-white scale-90 transition"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_403_3224)">
            <path d="M22.8532 1.14801C22.1733 0.469212 21.2519 0.0879517 20.2912 0.0879517C19.3304 0.0879517 18.409 0.469212 17.7292 1.14801L1.46515 17.412C0.999404 17.8751 0.630115 18.426 0.37865 19.0328C0.127186 19.6396 -0.00146065 20.2902 0.00015231 20.947V23C0.00015231 23.2652 0.105509 23.5196 0.293046 23.7071C0.480582 23.8947 0.734936 24 1.00015 24H3.05315C3.70991 24.0019 4.36052 23.8734 4.96731 23.6221C5.57409 23.3708 6.12501 23.0017 6.58815 22.536L22.8532 6.27101C23.5317 5.59121 23.9127 4.66998 23.9127 3.70951C23.9127 2.74905 23.5317 1.82782 22.8532 1.14801ZM5.17415 21.122C4.61016 21.6823 3.84812 21.9977 3.05315 22H2.00015V20.947C1.99914 20.5529 2.07631 20.1625 2.22719 19.7985C2.37807 19.4344 2.59967 19.1039 2.87915 18.826L15.2222 6.48301L17.5222 8.78302L5.17415 21.122ZM21.4382 4.85701L18.9322 7.36401L16.6322 5.06901L19.1392 2.56201C19.2902 2.41132 19.4694 2.29185 19.6666 2.21042C19.8638 2.129 20.0751 2.0872 20.2884 2.08744C20.5018 2.08767 20.713 2.12992 20.91 2.21178C21.107 2.29363 21.286 2.41349 21.4367 2.56451C21.5873 2.71553 21.7068 2.89476 21.7882 3.09195C21.8697 3.28914 21.9115 3.50044 21.9112 3.71378C21.911 3.92713 21.8687 4.13833 21.7869 4.33535C21.705 4.53236 21.5852 4.71132 21.4342 4.86201L21.4382 4.85701Z" />
          </g>
          <defs>
            <clipPath id="clip0_403_3224">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Link>

      <button
        onClick={handleUpdateStatus}
        className={`
        ${theme == "light" ? task.status ? "bg-green-500 hover:bg-slate-200" : "bg-slate-200 hover:bg-green-500" : task.status ? "bg-green-500 hover:bg-slate-900" : "bg-slate-900 hover:bg-green-500"}        

        group p-2  absolute right-4 self-center rounded-[50%] transition`}
      >
        <svg
          className={`${
            task.status
              ? "fill-white group-hover:fill-green-500"
              : "fill-green-500 group-hover:fill-white"
          } transition`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_403_3015)">
            <path d="M22.3188 4.43101L8.49985 18.249C8.40694 18.3423 8.29652 18.4163 8.17494 18.4668C8.05336 18.5173 7.923 18.5433 7.79135 18.5433C7.65969 18.5433 7.52933 18.5173 7.40775 18.4668C7.28617 18.4163 7.17576 18.3423 7.08285 18.249L1.73885 12.9C1.64594 12.8067 1.53552 12.7327 1.41394 12.6822C1.29236 12.6317 1.162 12.6057 1.03035 12.6057C0.898693 12.6057 0.768335 12.6317 0.646752 12.6822C0.52517 12.7327 0.414756 12.8067 0.321847 12.9C0.22857 12.9929 0.154557 13.1033 0.104056 13.2249C0.053554 13.3465 0.0275574 13.4769 0.0275574 13.6085C0.0275574 13.7402 0.053554 13.8705 0.104056 13.9921C0.154557 14.1137 0.22857 14.2241 0.321847 14.317L5.66785 19.662C6.23179 20.2249 6.99604 20.5411 7.79285 20.5411C8.58965 20.5411 9.3539 20.2249 9.91785 19.662L23.7358 5.84701C23.829 5.75412 23.9029 5.64377 23.9533 5.52228C24.0037 5.40079 24.0296 5.27054 24.0296 5.13901C24.0296 5.00747 24.0037 4.87723 23.9533 4.75574C23.9029 4.63425 23.829 4.5239 23.7358 4.43101C23.6429 4.33773 23.5325 4.26372 23.4109 4.21322C23.2894 4.16272 23.159 4.13672 23.0273 4.13672C22.8957 4.13672 22.7653 4.16272 22.6438 4.21322C22.5222 4.26372 22.4118 4.33773 22.3188 4.43101Z" />
          </g>
          <defs>
            <clipPath id="clip0_403_3015">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <button
        onClick={handleDelete}
        className={`absolute ${
          isHovered
            ? "scale-1 translate-x-[-90%] translate-y-[120%]"
            : "scale-0"
        } ${
          theme == "light" ? "bg-slate-200" : "bg-slate-900"
        } group p-2 rounded-[50%] right-4 self-center transition hover:bg-red-500`}
      >
        <svg
          className="fill-red-500 group-hover:fill-white scale-90 transition"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_403_3137)">
            <path d="M20.9999 4H17.8999C17.6678 2.87141 17.0537 1.85735 16.1611 1.12872C15.2686 0.40009 14.1521 0.00145452 12.9999 0L10.9999 0C9.84767 0.00145452 8.7312 0.40009 7.83863 1.12872C6.94606 1.85735 6.33197 2.87141 6.09988 4H2.99988C2.73466 4 2.48031 4.10536 2.29277 4.29289C2.10523 4.48043 1.99988 4.73478 1.99988 5C1.99988 5.26522 2.10523 5.51957 2.29277 5.70711C2.48031 5.89464 2.73466 6 2.99988 6H3.99988V19C4.00147 20.3256 4.52876 21.5964 5.4661 22.5338C6.40344 23.4711 7.67428 23.9984 8.99988 24H14.9999C16.3255 23.9984 17.5963 23.4711 18.5337 22.5338C19.471 21.5964 19.9983 20.3256 19.9999 19V6H20.9999C21.2651 6 21.5194 5.89464 21.707 5.70711C21.8945 5.51957 21.9999 5.26522 21.9999 5C21.9999 4.73478 21.8945 4.48043 21.707 4.29289C21.5194 4.10536 21.2651 4 20.9999 4ZM10.9999 2H12.9999C13.6202 2.00076 14.225 2.19338 14.7315 2.55144C15.238 2.90951 15.6213 3.41549 15.8289 4H8.17088C8.37846 3.41549 8.76178 2.90951 9.26826 2.55144C9.77475 2.19338 10.3796 2.00076 10.9999 2ZM17.9999 19C17.9999 19.7956 17.6838 20.5587 17.1212 21.1213C16.5586 21.6839 15.7955 22 14.9999 22H8.99988C8.20423 22 7.44117 21.6839 6.87856 21.1213C6.31595 20.5587 5.99988 19.7956 5.99988 19V6H17.9999V19Z" />
            <path d="M10 17.9994C10.2652 17.9994 10.5196 17.894 10.7071 17.7065C10.8946 17.5189 11 17.2646 11 16.9994V10.9994C11 10.7342 10.8946 10.4798 10.7071 10.2923C10.5196 10.1047 10.2652 9.99939 10 9.99939C9.73478 9.99939 9.48043 10.1047 9.29289 10.2923C9.10536 10.4798 9 10.7342 9 10.9994V16.9994C9 17.2646 9.10536 17.5189 9.29289 17.7065C9.48043 17.894 9.73478 17.9994 10 17.9994Z" />
            <path d="M13.9999 17.9994C14.2651 17.9994 14.5195 17.894 14.707 17.7065C14.8945 17.5189 14.9999 17.2646 14.9999 16.9994V10.9994C14.9999 10.7342 14.8945 10.4798 14.707 10.2923C14.5195 10.1047 14.2651 9.99939 13.9999 9.99939C13.7347 9.99939 13.4803 10.1047 13.2928 10.2923C13.1052 10.4798 12.9999 10.7342 12.9999 10.9994V16.9994C12.9999 17.2646 13.1052 17.5189 13.2928 17.7065C13.4803 17.894 13.7347 17.9994 13.9999 17.9994Z" />
          </g>
          <defs>
            <clipPath id="clip0_403_3137">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}

export default TaskCard;
