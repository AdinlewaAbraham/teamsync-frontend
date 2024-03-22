"use client";
import { useGlobalContext } from "@/context/GeneralContext";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaChartLine, FaRegCalendar, FaRegListAlt } from "react-icons/fa";
import { LuClipboardCheck } from "react-icons/lu";
import { BiHomeAlt2, BiSolidBarChartAlt2 } from "react-icons/bi";
import SubLayoutReusableNavbar from "@/components/navbar/SubLayoutReusableNavbar/SubLayoutReusableNavbar";
import { FiMessageSquare } from "react-icons/fi";
import useTrackProject from "@/hooks/UseTrackProject";
import Workspace from "@/interfaces/workspace";
import Project from "@/interfaces/project";
import { fetchAndHelpRedirect } from "@/helpers/redirect";
import LayoutHeaderSideComponent from "@/components/project/LayoutHeaderSideComponent";
import { useQuery } from "react-query";
import { getProject } from "@/services/project";
import ProjectNotAuthorized from "@/components/project/error/ProjectNotAuthorized";
import ProjectNotFound from "@/components/project/error/ProjectNotFound";
import ProjectGenericErrorComponent from "@/components/project/error/ProjectGenericErrorComponent";

const Layout = ({
  params,
  children,
}: {
  params: { projectId: string };
  children: ReactNode;
}) => {
  const {
    user,
    activeWorkspace,
    setActiveWorkspace,
    activeProject,
    setActiveProject,
  } = useGlobalContext();
  const [showNavbar, setShowNavbar] = useState(true);
  const router = useRouter();

  useTrackProject(params.projectId, activeProject, setActiveProject);

  const navbarBaseUrl = "/project/" + params.projectId + "/";
  const navbarItemsArray = [
    {
      href: navbarBaseUrl + "home",
      title: "home",
      icon: <BiHomeAlt2 />,
    },
    {
      href: navbarBaseUrl + "board",
      title: "Board",
      icon: <BiSolidBarChartAlt2 />,
    },
    {
      href: navbarBaseUrl + "table",
      title: "Table",
      icon: <FaRegListAlt />,
    },
    {
      href: navbarBaseUrl + "calendar",
      title: "Calendar",
      icon: <FaRegCalendar />,
    },
    {
      href: navbarBaseUrl + "timeline",
      title: "Timeline",
      icon: <FaChartLine />,
    },
    {
      href: navbarBaseUrl + "map",
      title: "map",
      icon: <FaChartLine />,
    },
    {
      href: navbarBaseUrl + "dashboard",
      title: "dashboard",
      icon: <FaChartLine />,
    },
    {
      href: navbarBaseUrl + "files",
      title: "files",
      icon: <FaChartLine />,
    },
    {
      href: navbarBaseUrl + "messages",
      title: "messages",
      icon: <FiMessageSquare />,
    },
  ];

  const hanldeTextSave = async (text: string) => {
    console.log(text);
    if (
      text.trim() !== "" &&
      activeProject?.projectName &&
      text !== activeProject?.projectName
    ) {
      const body = { projectName: text };
      const newProjectObject = {
        ...activeProject,
        projectName: text,
      };
      setActiveProject(newProjectObject);
      const newWorspaceProjectArray = activeWorkspace?.projects
        .map((project) => {
          if (project._id === activeProject._id) {
            return { ...project, projectName: text };
          } else {
            return project;
          }
        })
        .filter((project) => typeof project === "object");
      const newWorkspace = {
        ...activeWorkspace,
        projects: newWorspaceProjectArray,
      } as Workspace;
      setActiveWorkspace(newWorkspace);
      try {
        const { _response } = await fetchAndHelpRedirect(
          "/api/project/" + activeProject._id,
          {
            method: "PUT",
            body: JSON.stringify(body),
          },
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

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

  if (error) {
    switch ((error as any)?.response?.status) {
      case 401:
        return <ProjectNotAuthorized />;
      case 404:
        return <ProjectNotFound />;
      default:
        return <ProjectGenericErrorComponent />;
    }
  }

  return (
    <section className="relative flex flex-1 flex-col overflow-x-hidden">
      <SubLayoutReusableNavbar
        isLoading={!activeProject}
        navHeader={activeProject?.projectName || ""}
        navbarItemsArray={navbarItemsArray}
        showNavbar={showNavbar}
        hanldeTextSave={hanldeTextSave}
        headerSideComponent={<LayoutHeaderSideComponent />}
        // key={activeProject?.projectName}
      />

      <button
        onClick={() => setShowNavbar(!showNavbar)}
        className="absolute right-5 top-5 z-50"
      >
        toggle nav
      </button>
      {/* <div className="flex justify-center">
        <button onClick={addTask} className="bg-green-400 px-2">
          add task
        </button>
        <button onClick={del/eteTask} className="bg-red-400 px-2">
          delete task
        </button>
      </div> */}
      <main className="relative flex-1 overflow-auto">
        <div className="absolute inset-0 flex"> {children}</div>
      </main>
    </section>
  );
};

export default Layout;
