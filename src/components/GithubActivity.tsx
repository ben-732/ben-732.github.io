import React, { useEffect } from "react";

import Card, { iProps as iCardProps } from "./Card";
import { FaExclamationTriangle, FaGithub, FaSpinner } from "react-icons/fa";
import getGithubActivity, { iGithubActivity } from "../util/getGithubActivity";

interface iProps
  extends Omit<iCardProps, "children" | "href" | "target" | "hover"> {}

const SIZE = 18;
const MARGIN = 4;
const TOTAL_SIZE = SIZE + MARGIN;
const BORDER = MARGIN;

const weeks = 30;

function GithubActivity(props: iProps) {
  getGithubActivity(weeks * 7);

  const [activity, setActivity] = React.useState<iGithubActivity | undefined>();
  const [status, setStatus] = React.useState<"loading" | "idle" | "error">(
    "loading"
  );

  useEffect(() => {
    getGithubActivity(weeks * 7)
      .then((activity) => {
        setActivity(activity);
        setStatus("idle");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  const days = Array.from({ length: weeks * 7 }, (_, i) => i);

  return (
    <Card {...props}>
      {status === "loading" && <LoadingContent />}

      {status === "error" && <ErrorContent />}

      {status === "idle" && <SuccessContent activity={activity!} />}
    </Card>
  );
}

function SuccessContent({ activity }: { activity: iGithubActivity }) {
  return (
    <>
      <div className="text-sm font-medium flex items-center gap-2 border-b-1 pb-1 mb-1">
        <FaGithub size={18} />
        Recent activity across accounts
      </div>
      <svg
        height={TOTAL_SIZE * 7 - MARGIN + BORDER * 2}
        width={TOTAL_SIZE * weeks - MARGIN + BORDER * 2}
      >
        {activity?.contributions.map((day, index) => (
          <ActivitySquare dayIndex={index} color={getColor(day.level)} />
        ))}
      </svg>
    </>
  );
}

function ErrorContent() {
  const errorActivity = Array.from({ length: weeks * 7 });

  const colors = ["#ff8080", "#fc6565", "#fa5555", "#f5bcbc", "#fff0f0"];

  function randomErrorColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <>
      <div className="text-sm font-medium flex items-center gap-2 border-b-1 pb-1 mb-1">
        <FaExclamationTriangle size={18} />
        Could not load github activity
      </div>
      <svg
        height={TOTAL_SIZE * 7 - MARGIN + BORDER * 2}
        width={TOTAL_SIZE * weeks - MARGIN + BORDER * 2}
      >
        {errorActivity.map((_, index) => (
          <ActivitySquare dayIndex={index} color={randomErrorColor()} />
        ))}
      </svg>
    </>
  );
}

function LoadingContent() {
  return (
    <>
      <div className="text-sm font-medium flex items-center gap-2 border-b-1 pb-1 mb-1">
        <FaSpinner size={18} className="animate-spin" />
        Loading recent activity...
      </div>
      <svg
        height={TOTAL_SIZE * 7 - MARGIN + BORDER * 2}
        width={TOTAL_SIZE * weeks - MARGIN + BORDER * 2}
      >
        {Array.from({ length: weeks * 7 }).map((_, index) => (
          <ActivitySquare dayIndex={index} color={getColor(0)} pulse />
        ))}
      </svg>
    </>
  );
}

function ActivitySquare({
  dayIndex,
  color,
  pulse = false,
}: {
  dayIndex: number;
  color: string;
  pulse?: boolean;
}) {
  const xPos = BORDER + ~~(dayIndex / 7) * TOTAL_SIZE;
  const yPos = BORDER + (dayIndex % 7) * TOTAL_SIZE;

  return (
    <rect
      width={SIZE}
      height={SIZE}
      x={xPos}
      y={yPos}
      fill={color}
      rx={4}
      ry={4}
      // scale={Math.random() * 0.5 + 0.5}
      style={{
        transformOrigin: `${xPos + SIZE / 2}px ${yPos + SIZE / 2}px`,
        // transition: "all 0.4s ease-in-out",
      }}
      className={`hover:scale-125 transition duration-300 ease-in-out cursor-pointer ${
        pulse && "animate-pulse"
      }`}
    ></rect>
  );
}

function getColor(level: number) {
  switch (level) {
    case 1:
      return "#c6e48b";
    case 2:
      return "#7bc96f";
    case 3:
      return "#239a3b";
    case 4:
      return "#196127";
    default:
      return "#ebedf0";
  }
}

export default GithubActivity;
