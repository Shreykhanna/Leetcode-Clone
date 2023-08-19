import Image from "next/image";
import { Inter } from "next/font/google";
import TopBar from "@/components/TopBar/TopBar";
import Table from "@/components/Table/Table";
import React, { useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;
  return (
    <>
      <main className="bg-dark-layer-2 min-h-screen">
        <TopBar />
        <Table />
      </main>
    </>
  );
}
export const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
