import { authModalState } from "@/atoms/authModalAtom";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev: any) => ({ ...prev, type }));
  };
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [input, setInput] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log("inputs", input);
  };
  const handleRegister = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!input.email || !input.displayName || !input.password)
      return alert("Please fill all the fields");
    try {
      toast.loading("Creating your account", {
        position: "top-center",
        toastId: "loadingToast",
      });

      const newUser = await createUserWithEmailAndPassword(
        input.email,
        input.password
      );
      const userData = {
        uid: newUser?.user.uid,
        email: newUser?.user.email,
        displayName: input?.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser!.user.uid), userData);
      if (!newUser) return;
      router.push("/");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };
  return (
    <>
      <form className="space-y-6 px-6 py-4">
        <h3 className="text-xl font-medium text-white">Register to LeetCode</h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-grey-300"
          >
            Email
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
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-grey-300"
          >
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            id="text"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="John Doe"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium block mb-2 text-grey-300"
          >
            Password
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
            type="submit"
            className="w-full text-white rounded-md focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
            onClick={handleRegister}
          >
            {loading ? "Registering" : "Register"}
          </button>
        </div>
        <div></div>
        <div className="text-sm font-medium text-gray-300">
          Already have an account?{" "}
          <a
            onClick={() => handleClick("login")}
            className="text-blue-700 hover:underline"
          >
            LogIn
          </a>
        </div>
      </form>
    </>
  );
};

export default SignUp;
