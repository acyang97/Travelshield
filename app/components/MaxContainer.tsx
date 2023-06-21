"use client";

import React from "react";

interface MaxContainerProps {
  children: React.ReactNode;
}
const MaxContainer: React.FC<MaxContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto md:px-20 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default MaxContainer;
