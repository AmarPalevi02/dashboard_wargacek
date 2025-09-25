import React from "react";

type LogoAuthProps = {
  className?: string;
};

const LogoAuth: React.FC<LogoAuthProps> = ({ className }) => {
  return (
    <h1
      className={`font-semibold tracking-wide font-poppins relative ${className}`}
    >
      <span className="font-bold text-3xl animate-gradient text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-blue-500">
        W
      </span>
      <span className="text-white">arga</span>
      <span className="font-bold text-3xl animate-gradient text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-blue-500">
        C
      </span>
      <span className="text-white">ek</span>
    </h1>
  );
};

export default LogoAuth;
