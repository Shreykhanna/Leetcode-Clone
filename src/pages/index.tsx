import Image from "next/image";
import { Inter } from "next/font/google";
import TopBar from "@/components/TopBar/TopBar";
import Table from "@/components/Table/Table";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className="bg-dark-layer-2 min-h-screen">
        <TopBar />
        <Table />
      </main>
    </>
  );
}
