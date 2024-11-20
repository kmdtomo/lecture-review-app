"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

export const Loading = () => {
  // スピナーのサイズや色をカスタマイズ
  const size = 80;
  const color = "#0BA595";

  return (
    <div className="spinner-container flex items-center justify-center min-h-screen">
      <ClipLoader size={size} color={color} />

      {/* スタイル */}
      <style jsx>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Loading;
