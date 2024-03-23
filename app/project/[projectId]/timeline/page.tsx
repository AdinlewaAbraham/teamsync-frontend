"use client";
import { useGlobalContext } from "@/context/GeneralContext";
import React from "react";
import Timeline from "@/components/tasks/timeline/Timeline";

export interface TimelineSectionObj {
  [key: string]: {
    showComponent: boolean;
    componentHeight: number;
  };
}

const Page = ({ params }: { params: { projectId: string } }) => {
  const { activeProject } = useGlobalContext();
  return <Timeline paramProjectId={params.projectId} project={activeProject} />;
};

export default Page;
