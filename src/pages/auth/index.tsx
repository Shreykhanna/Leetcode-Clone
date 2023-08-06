import React, { useEffect } from "react";
import NavBar from "@/components/Navbar/Navbar";
import AuthModal from "@/components/Modals/AuthModal";
import Login from "@/components/Modals/Login";
import { useRecoilValue } from "recoil";
import { AuthModalState } from "@/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
type AuthProps = {};

const AuthPage: React.FC<AuthProps> = () => {
  const authModal = useRecoilValue(AuthModalState);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    user && router.push("/");
  }, [user, router]);
  if (loading) return null;
  return (
    <div className="bg-gradient-to-b from-gray-600 to black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <NavBar />
      </div>
      <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
        <img src="/hero.png" alt="hero_image" />
      </div>
      {authModal.isOpen && <AuthModal />}
    </div>
  );
};
export default AuthPage;
