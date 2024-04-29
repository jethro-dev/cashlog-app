import React from "react";
import { type ComponentProps } from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

type Props = ComponentProps<"div"> & {
  title?: string;
};

const Panel = ({ children, title }: Props) => {
  return (
    <div className="bg-background border border-border rounded-lg shadow-sm">
      <Button
        variant={"ghost"}
        className="w-full justify-start py-6 border-b border-border rounded-none"
      >
        {title}
        <ChevronRight className="h-4 w-4" />
      </Button>
      {children}
    </div>
  );
};

export default Panel;
