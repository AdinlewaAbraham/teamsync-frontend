"use client";
import "./globals.css";
import MainLayout from "@/components/others/MainLayout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  GeneralContextProvider,
  useGlobalContext,
} from "@/context/GeneralContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import fetchUser from "@/helpers/user/fetchUser";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useGlobalContext();
  useEffect(() => {
    const handleUser = async () => {
      try {
        if (!user) {
          const data = await fetchUser();
          if (data) {
            setUser(data);
            // router.push("/workspace/" + user?.activeWorkspaceId + "/home");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleUser();
  });

  const googleClientID = process.env.NEXT_GOOGLE_CLIENT_ID
    ? process.env.NEXT_GOOGLE_CLIENT_ID
    : "";
  return (
    <html lang="en" className="h-full w-full ">
      <body className={`${inter.className}  flex-1`}>
        <GoogleOAuthProvider clientId="554019925939-2os1u8upg3d1v7mg0t6oe8ds156bpsle.apps.googleusercontent.com">
          <GeneralContextProvider>
            {pathname.startsWith("/login") ||
            pathname.startsWith("/signup") ||
            pathname.startsWith("/project/new") ||
            // pathname.startsWith("/home") ||
            pathname === "/" ? (
              <>{children}</>
            ) : (
              <MainLayout>{children}</MainLayout>
            )}
          </GeneralContextProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
