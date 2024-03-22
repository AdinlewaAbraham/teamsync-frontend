"use client";
import MainLayout from "@/components/others/MainLayout";
import React, { useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/context/GeneralContext";
import User from "@/interfaces/user";
import LoadingComponent from "@/components/others/LoadingComponent";
import fetchUser from "@/helpers/user/fetchUser";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser();
      setUser(user);
    };
    getUser();
  }, []);
  useEffect(() => {
    if (user?.activeWorkspaceId) {
      router.push("/workspace/" + user?.activeWorkspaceId + "/home");
    }
  }, [user]);

  return <>this page is not used again</>;
};

export default Page;
