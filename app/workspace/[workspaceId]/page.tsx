"use client";
import LoadingComponent from "@/components/others/LoadingComponent";
import { useGlobalContext } from "@/context/GeneralContext";
import fetchUser from "@/helpers/user/fetchUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    const handleRedirect = async () => {
      if (!user) {
        const userData = await fetchUser();
        setUser(userData); 
      }
      router.push("/workspace/" + user?.activeWorkspaceId + "/home");
    };
    handleRedirect();
  }, [user]);

  return <LoadingComponent />;
};

export default Page;
