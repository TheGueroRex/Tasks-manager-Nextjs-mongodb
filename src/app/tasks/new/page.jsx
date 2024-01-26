"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/app/context/ThemeContext";

function FormPage() {
  const { theme } = useTheme();

  const { data: session } = useSession();
  const userId = session.user._id;

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: false,
    userId: userId,
  });

  const router = useRouter();
  const params = useParams();

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setNewTask({
      title: data.title,
      description: data.description,
    });
  };

  const createTask = async () => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "aplication/json",
        },
      });
      const data = await res.json();
      if (res.status == 200) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newTask),
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure want to delete this task?")) {
      try {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "DELETE",
        });
        router.push("/");
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      await createTask();
    } else {
      await updateTask();
    }
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, []);

  return (
    <>
      <section
        className={`${
          theme == "light"
            ? "bg-gray-50 text-slate-600"
            : "bg-slate-800 text-slate-200"
        } w-[600px] max-sm:w-[90%] absolute top-[-30px] p-4 rounded-2xl`}
      >
        <h1 className="font-bold text-center text-2xl">
          {!params.id ? "Nueva tarea" : "Actualizar tarea"}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className={`${
              theme == "light" ? "bg-slate-100" : "bg-slate-900"
            }  w-full h-10 rounded-xl my-4 pl-2`}
            placeholder="Titulo"
            onChange={handleChange}
            value={newTask.title}
          />
          <textarea
            name="description"
            rows={3}
            placeholder="Descripcion"
            className={`${theme == "light" ? "bg-slate-100":"bg-slate-900"} bg-slate-100 w-full rounded-xl my-4 pl-2`}
            onChange={handleChange}
            value={newTask.description}
            style={{ resize: "none" }}
          ></textarea>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-violet-700 px-8 py-2 text-white rounded-xl"
            >
              {!params.id ? "Guardar" : "Actualizar"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={`${
                params.id ? "visible" : "hidden"
              } bg-red-600 h-[40px] w-[100px] ml-5 text-white rounded-xl`}
            >
              Eliminar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default FormPage;
