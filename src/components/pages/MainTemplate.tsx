'use client';

import LoginPage from "@/components/pages/LoginPage";
import MainPage from "@/components/pages/MainPage";
import {useSession} from "next-auth/react";

export function MainTemplate() {
  const {data: session} = useSession();

  return !session ? <LoginPage/> : <MainPage/>;
}