"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import {
  GoogleLogin,
  UseGoogleLoginOptionsAuthCodeFlow,
  GoogleCredentialResponse,
  GoogleOAuthProvider,
  CredentialResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import errorHandlerAxiosInstance from "@/utilis/api/client/ErrorHandlerAxios";
import { useRouter } from "next/navigation";
// import { clientId } from "@/constants/google";

const Login = () => {
  const router = useRouter();
  const handleLogin = async (googleData: CredentialResponse) => {
    console.log(googleData);
    const { data, status } = await errorHandlerAxiosInstance.post(
      "/auth/google",
      {
        token: googleData.credential,
      },
    ); 
    router.push("/home");
  };

  const onFail = () => {
    console.error("Login Failed:");
  };

  const onTest = async () => {
    const { data, status } = await axios.get("/api/");
    console.log(data, status);
  };

  useEffect(() => {
    const getGoogleClientId = async () => {
      const { data, status } = await axios.get("/api/get-google-clientid");
      if (status === 200 && data?.clientID) {
        setClientId(data?.clientID);
      }
    };
    getGoogleClientId();
  }, []);

  const [clientId, setClientId] = useState("");

  if (!clientId) return <>loading google clientID</>;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex h-[calc(100vh-0px)] flex-col items-center justify-center text-white">
        <h1 className="mb-4 text-2xl font-semibold">Log into TeamSync</h1>
        <div className="flex w-[200px] flex-col items-center justify-center space-y-4 sm:w-[350px]">
          <button
            onClick={onTest}
            className="hover:text-accent-foreground flex h-9 w-full items-center justify-center whitespace-nowrap rounded-lg 
            border border-border-default  
            bg-transparent px-4 py-2 text-sm 
            font-medium shadow-sm transition-colors hover:bg-[#27272a] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <i className="mr-3">
              <AiOutlineGoogle />
            </i>
            Continue with Google
          </button>
          <GoogleLogin onSuccess={handleLogin} onError={onFail} useOneTap />
          <span className="text-xs text-gray-300">or</span>
          <div className="grid w-full gap-y-2">
            <label
              htmlFor="email"
              className="block text-start text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email address
            </label>
            <input
              type="text"
              id="email"
              className=" text-input w-full"
              placeholder="example@gmail.com"
            />
          </div>
          <button
            className=" accent-color bg-primary text-primary-foreground hover:bg-primary/90 button-default inline-flex w-full items-center 
        justify-center rounded-lg text-sm
        font-medium shadow transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Continue
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-200 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
