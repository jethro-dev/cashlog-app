import React from "react";
import DeployButton from "./DeployButton";
import AuthButton from "./AuthButton";

type Props = {};

const LandingNavbar = (props: Props) => {
  return (
    <nav className="w-full flex items-center border-b border-b-foreground/10 h-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between w-full">
        <div>
          <h1 className="font-medium text-2xl uppercase">Cashlog</h1>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
};

export default LandingNavbar;
