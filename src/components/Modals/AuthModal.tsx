import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import SignUp from "./Signup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthModalState } from "@/atoms/authModalAtom";
import ResetPassword from "./ResetPassword";
type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const authModal = useRecoilValue(AuthModalState);
  const closeModal = useCloseModal();
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
        onClick={closeModal}
      />
      <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounder-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                onClick={closeModal}
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>
            {/* <Login /> */}
            {authModal.type == "login" ? (
              <Login />
            ) : authModal.type == "register" ? (
              <SignUp />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;

function useCloseModal() {
  const setAuthModal = useSetRecoilState(AuthModalState);
  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "escape" && closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  return closeModal;
}