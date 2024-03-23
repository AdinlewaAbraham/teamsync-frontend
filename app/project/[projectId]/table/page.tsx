"use client";
import { useGlobalContext } from "@/context/GeneralContext";
import React from "react";
import Table from "@/components/tasks/table/Table";

const Page = ({ params }: { params: { projectId: string } }) => {
  const { activeProject, setActiveProject } = useGlobalContext();

  return <Table paramsProjectId={params.projectId} project={activeProject} />;
};

export default Page;
