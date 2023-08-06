import { auth } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await sendPasswordResetEmail(email);
    success &&
      toast.success("Password reset email sent", {
        position: "top-center",
        autoClose: 3000,
      });
  };
  useEffect(() => {
    error && alert(error.message);
  }, [error]);
  return (
    <>
      <form className="space-y-6 px-6 py-4" onSubmit={handleReset}>
        <h3 className="text-xl font-medium text-white">
          Forgot your password ? Enter your e-mail address below and we will
          send you an e-mail allowing you to reset it
        </h3>
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
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full text-white rounded-md focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
          >
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
