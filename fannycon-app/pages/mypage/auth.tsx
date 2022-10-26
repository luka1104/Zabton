import { NextPage } from 'next'
import React from 'react'
import dynamic from "next/dynamic";

const App = dynamic(
  () => {
    return import("../../src/components/auth/auth");
  },
  { ssr: false }
);

const Auth: NextPage = () => {
  return <App />;
}

export default Auth
