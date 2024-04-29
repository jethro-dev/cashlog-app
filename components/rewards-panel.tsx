import React from "react";
import Panel from "./panel";
import { ChevronRight, Repeat } from "lucide-react";
import Image from "next/image";
import { getNextMonthName } from "@/lib/utils";

type Props = {};

const RewardsPanel = (props: Props) => {
  return (
    <Panel title="Rewards">
      <div className="px-4 py-6">
        <div className="flex justify-between">
          <div className="flex-1 py-10">
            <p className="text-sm text-muted-foreground">Your reward balance</p>
            <p className="text-2xl font-medium text-blue-900">£0</p>
          </div>

          <div className="flex-1 relative">
            <Image
              src="/gifts.svg"
              alt="Rewards"
              fill
              className="object-contain object-center"
            />
          </div>
        </div>

        <div className="mt-6 bg-blue-100 py-4 px-6 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Repeat className="w-5 h-5 text-blue-700" />
            <div>
              <p className="text-xs font-light">
                Your current cashback offer ends on 19 {getNextMonthName()}.
              </p>
              <p className="text-xs font-light">
                Qualify now for everyday cashback in {getNextMonthName()}.
              </p>
            </div>
          </div>
          <div>
            <ChevronRight className="w-5 h-5 text-blue-700" />
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default RewardsPanel;
