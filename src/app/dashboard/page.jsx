"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function DashboardPage() {
  const { theme } = useTheme();

  const { data: session, status } = useSession();
  const userId = session?.user._id;

  const [viewName, setViewName] = useState(false);
  const [viewEmail, setViewEmail] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    email: "",
  });

  const router = useRouter();

  async function getUser() {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    setUser(data);
  }

  async function updateUser() {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "aplication/json",
      },
    });
    const data = await res.json();
    router.refresh();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateUser();
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  return (
    <section className={`${
      theme == "light"
        ? "bg-gray-50 text-slate-600"
        : "bg-slate-800 text-slate-200"
    } flex flex-col w-[600px] max-sm:w-[90%] min-h-[150px] absolute top-[-50px] gap-6 mt-4 p-4 rounded-2xl`}>
      <h2 className="font-semibold text-2xl text-center">Datos de mi cuenta</h2>
      <div>
        <div
          className={`${
            viewName == false ? "visible" : "hidden"
          } flex gap-2 max-[380px]:flex-col`}
        >
          <div className="flex gap-2">
            <p>Nombre: </p>
            <p>{user.fullname}</p>
          </div>
          <button
            className="text-sky-600 max-[380px]:border-b-2"
            onClick={() => setViewName(true)}
          >
            (editar)
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`${
            viewName == true ? "visible" : "hidden"
          } flex gap-2 max-[560px]:flex-col max-[560px]:gap-2`}
        >
          <div className="flex gap-2">
            <label htmlFor="">Nombre: </label>
            <input
              type="text"
              name="fullname"
              className="bg-slate-100 w-50 h-6 max-[560px]:w-full rounded pl-2 text-slate-600"
              onChange={handleChange}
              value={user.fullname}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-2 rounded text-white bg-sky-600"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setViewName(false)}
              className="ml-2 px-2 rounded text-white bg-red-600"
            >
              Calcelar
            </button>
          </div>
        </form>
      </div>
      <div>
        <div
          className={`${
            viewEmail == false ? "visible" : "hidden"
          } flex gap-2 max-[380px]:flex-col`}
        >
          <div className="flex gap-2">
            <p>Correo: </p>
            <p>{user.email}</p>
          </div>
          <button
            className="text-sky-600 max-[380px]:border-b-2"
            onClick={() => setViewEmail(true)}
          >
            (editar)
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`${
            viewEmail == true ? "visible" : "hidden"
          } flex gap-2 max-[560px]:flex-col max-[560px]:gap-2`}
        >
          <div className="flex gap-2">
            <label htmlFor="">Correo: </label>
            <input
              type="text"
              name="email"
              className="bg-slate-100 w-50 h-6 max-[560px]:w-full rounded pl-2 text-slate-600"
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-2 rounded text-white bg-sky-600"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setViewEmail(false)}
              className="ml-2 px-2 rounded text-white bg-red-600"
            >
              Calcelar
            </button>
          </div>
        </form>
      </div>
      <div className="flex gap-2">
        <p>Contraceña: </p>
        <p>******</p>
        <span className="text-sky-600">(editar)</span>
      </div>
    </section>
  );
}

export default DashboardPage;
