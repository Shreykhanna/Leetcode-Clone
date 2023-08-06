import { AuthModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(AuthModalState);
  const router = useRouter();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log("inputs", input);
  };
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const handleLogin = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    try {
      const newUser = await signInWithEmailAndPassword(
        input.email,
        input.password
      );
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };
  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
  }, [error]);
  return (
    <>
      <form className="space-y-6 px-6 py-4">
        <h3 className="text-xl font-medium text-white">Sign in to LeetCode</h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-grey-300"
          >
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="name@company.com"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium block mb-2 text-grey-300"
          >
            Your Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="******"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <button
            className="w-full text-white rounded-md focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div>
          <button className="flex w-full justify-end">
            <a
              onClick={() => handleClick("forgotPassword")}
              className="text-sm block text-brand-orange hover:underline w-full text-right"
            >
              Forgot Password
            </a>
          </button>
        </div>
        <div className="text-sm font-medium text-gray-300">
          Not Registered?{" "}
          <a
            onClick={() => handleClick("register")}
            className="text-blue-700 hover:underline"
          >
            Create Account
          </a>
        </div>
      </form>
    </>
  );
};

export default Login;
