import React from "react";
import TopBar from "@/components/TopBar/TopBar";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import Workspace from "@/components/Workspace/Workspace";

type ProblemPageProps = { problem: Problem };

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  return (
    <div>
      <TopBar problemPage={true} />
      <Workspace problem={problem} />
    </div>
  );
};

export default ProblemPage;

export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({
    params: { pid: key },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problems[pid];
  if (!problem) {
    return {
      notFound: true,
    };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem,
    },
  };
}
