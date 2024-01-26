"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) return setError(res.error);

    if (res?.ok) return router.push("/");

  };

  return (
    <section className="w-[600px] max-sm:w-[90%] absolute top-[-50px] mt-4 bg-gray-50 p-4 rounded-2xl">
      
      <div className="text-center">
        <h1 className="font-semibold text-3xl">Iniciar sesión</h1>
        <p className="text-sm">¿No tienes cuenta? <Link href={"/register"} className="text-sky-600">registrate</Link></p>
      </div>
      <form onSubmit={handleSubmit} className="relative mt-5 flex flex-col gap-5 items-center">
        <input type="email" placeholder="someemail@mail.com" name="email" className="bg-slate-100 w-[60%] max-sm:w-full h-10 rounded-xl pl-2 text-slate-600"/>
        <input type="password" placeholder="******" name="password" className="bg-slate-100 w-[60%] max-sm:w-full h-10 rounded-xl pl-2 text-slate-600"/>
        {error && <div className="text-red-500 absolute bottom-12 text-sm">{error}</div>}
        <button className="bg-violet-700 mt-4 px-8 py-2 text-white rounded-xl">Entrar</button>
      </form>
    </section>
  );
}
