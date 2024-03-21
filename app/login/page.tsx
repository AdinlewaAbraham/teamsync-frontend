"use client";

import Link from "next/link";
import React from "react";
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
    console.log(data);
    router.push("/home");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "auth-code",
  });
  const onFail = () => {
    console.error("Login Failed:");
  };

  const onTest = async () => {
    const { data, status } = await axios.post("/api/", {
      token:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5YmNmODAyOGUwNjUzN2Q0ZDNhZTRkODRmNWM1YmFiY2YyYzBmMGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NTQwMTk5MjU5MzktMm9zMXU4dXBnM2QxdjdtZzB0Nm9lOGRzMTU2YnBzbGUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NTQwMTk5MjU5MzktMm9zMXU4dXBnM2QxdjdtZzB0Nm9lOGRzMTU2YnBzbGUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDUzNDEyMTE0NTI4MzMxNzk3OTIiLCJlbWFpbCI6ImFicmFoYW1hZGlubGV3YUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzExMDIzMzA4LCJuYW1lIjoiQURJTkxFV0EgQUJSQUhBTSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKcEp0QmNEX3J5OGhCN2ItdDkyemt0SGdGanZRWTVIVnpjRTlFZXhzemx6ZEE9czk2LWMiLCJnaXZlbl9uYW1lIjoiQURJTkxFV0EiLCJmYW1pbHlfbmFtZSI6IkFCUkFIQU0iLCJpYXQiOjE3MTEwMjM2MDgsImV4cCI6MTcxMTAyNzIwOCwianRpIjoiYjJjM2ZhYWU1YTY2ZTgzYTJhMTY4NzgzNWJiOTg3MjEzMGRiYWE5OSJ9.kkEavdOnNiPZ21QCG5CSFsYIpfy9k6FQflFdYY9pPUrXhRoa8JKeMQDsIECM2IgOu4b_jFr3KscGauFU49BjUyEuIJd61L9UfG_mubXMD2RBnVFOEeLAWxZYVfWwhsZgQmQU2iuinahrGT8rS2IkVnz7cHGeBSKY3M0gjt_knImC9KOQPNL8eDxzOhymSovEK4mvRA7VUBTmfLS0Nq7CSyi9gJ8ncwpYjuOuKEf7wUX0YV1p0IsreXCpONrPOwzrIk0UAgHFpuhY2EoCB5hd9VX7GJ9S5mA78O4BA-Vu8n9ch0FEnFXt1jb8fGDm_zLkgXmT8bcfmTnBqIfpH0LSAQ",
    });
    console.log(data, status);
  };
  return (
    <div className="flex h-[calc(100vh-0px)] flex-col items-center justify-center text-white">
      <button onClick={onTest} className="fixed left-48 top-48 bg-red-500 p-4">
        testt
      </button>
      <h1 className="mb-4 text-2xl font-semibold">Log into TeamSync</h1>
      <div className="flex w-[200px] flex-col items-center justify-center space-y-4 sm:w-[350px]">
        <button
          onClick={
            googleLogin
            // authWithGoogle
          }
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
  );
};

export default Login;
