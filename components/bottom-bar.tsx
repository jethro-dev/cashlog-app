import {
  AreaChart,
  CirclePlus,
  Home,
  Plus,
  ScrollText,
  Settings,
} from "lucide-react";
import React from "react";
import { AddDrawer } from "./add-drawer";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {};

export const BottomBar = (props: Props) => {
  return (
    <div className="max-w-5xl mx-auto w-full bg-background text-foreground text-xs border-t border-border">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Analytics Button */}

        <Link href="/summary" className="flex-1">
          <div className="flex flex-col items-center justify-center">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </div>
        </Link>

        {/* Add Button */}
        <div className="flex-1 flex justify-center">
          <AddDrawer />
        </div>

        <Link href="/settings" className="flex-1">
          <div className="flex flex-col items-center justify-center">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
