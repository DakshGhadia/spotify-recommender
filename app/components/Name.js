"use client";
import { useSession } from "next-auth/react";
export default function LogIn() {
  const { data: session } = useSession();
  const classes = "text-md font-semibold leading-6 text-gray-900";
  if (session) {
    const fullName = session.user?.name;
    const [firstName] = fullName ? fullName.split(" ") : [""];
    return (
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
        Hi{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
          {firstName}
        </span>
        , welcome to Your Personalized Songs Recommender
      </h1>
    );
  } else {
    return (
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
        Welcome to Your Personalized Songs Recommender
      </h1>
    );
  }
}
