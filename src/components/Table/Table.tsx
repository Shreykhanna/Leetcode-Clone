import React, { useState } from "react";
import ProblemsTable from "../ProblemsTable/ProblemsTable";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { LoadingSkeleton } from "@/pages";
type TableProps = {};

const Table: React.FC<TableProps> = () => {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(inputs);
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newProblem = {
      ...inputs,
      order: Number(inputs.order),
    };
    await setDoc(doc(firestore, "problems", inputs.id), newProblem);
    alert("saved to db");
  };
  return (
    <>
      <h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt 18 mb 5">
        QUALITY OVER QUANTITY
      </h1>
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        {loadingProblems && (
          <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
            {[...Array(10)].map((_, idx) => (
              <LoadingSkeleton key={idx} />
            ))}
          </div>
        )}
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          {
            <>
              {!loadingProblems && (
                <thead className="text-xs tex-gray-700 uppercase dark:text-gray-400 border-b">
                  <tr>
                    <th scope="col" className="px-1 py-3 w-0 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Difficulty
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Solution
                    </th>
                  </tr>
                </thead>
              )}
              <ProblemsTable setLoadingProblems={setLoadingProblems} />
            </>
          }
        </table>
      </div>
    </>
  );
};

export default Table;
