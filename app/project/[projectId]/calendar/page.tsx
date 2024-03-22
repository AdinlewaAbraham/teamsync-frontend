"use client";
import CalendarBox from "@/components/tasks/calendar/CalendarBox";
import { useGlobalContext } from "@/context/GeneralContext";
import React, { useEffect, useRef, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Project from "@/interfaces/project";
import generateDates from "@/utilis/generateDates";
import generateDatesForFourMonths from "@/utilis/generateDatesMonths";
import TaskHoverStatusObj from "@/interfaces/taskHoverStatusObj";
import findMinFreeRowNumber from "@/utilis/findMinFreeRowNumber";
import Task from "@/interfaces/task";
import CalendarRow from "@/components/tasks/calendar/CalendarRow";
import Calendar from "@/components/tasks/calendar/Calendar";
import { getProject } from "@/services/project";
import { useQuery } from "react-query";

const Page = ({ params }: { params: { projectId: string } }) => {
  const { activeProject, setActiveProject } = useGlobalContext();

  const getProjectFunc = async () => {
    return await getProject(params.projectId);
  };
  const { data, error } = useQuery(
    ["project", params.projectId],
    getProjectFunc,
    {
      retryDelay: 1000,
      retryOnMount: false,
    },
  );

  if (data) setActiveProject(data);

  return (
    <Calendar paramsProjectId={params.projectId} project={activeProject} />
  );
};

export default Page;
