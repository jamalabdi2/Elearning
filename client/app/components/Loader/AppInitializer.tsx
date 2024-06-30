import React, { FC } from "react";
import { useInitializeApp } from "@/app/hooks/useInitializeApp";
import Loader from "./Loader";

type Props = {
  children: React.ReactNode;
};

const AppInitializer: React.FC<Props> = ({ children }) => {
  const isInitialized = useInitializeApp();

  if (!isInitialized) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AppInitializer;
