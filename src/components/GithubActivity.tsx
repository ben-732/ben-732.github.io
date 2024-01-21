import React, { useEffect } from "react";

import Card, { iProps as iCardProps } from "./Card";
import { FaExclamationTriangle, FaGithub, FaSpinner } from "react-icons/fa";
import getGithubActivity, { iGithubActivity } from "../util/getGithubActivity";

interface iProps
  extends Omit<iCardProps, "children" | "href" | "target" | "hover"> {}

const SIZE = 14;
const MARGIN = 2.5;
const TOTAL_SIZE = SIZE + MARGIN;
const BORDER = MARGIN;
const BORDER_RADIUS = 3;

const WEEKS = 30;

function GithubActivity(props: iProps) {
  const [activity, setActivity] = React.useState<iGithubActivity | undefined>();
  const [status, setStatus] = React.useState<"loading" | "idle" | "error">(
    "loading"
  );

  useEffect(() => {
    // Calculate the sunday of the week WEEKS weeks ago
    const date = new Date();
    date.setDate(date.getDate() - (WEEKS - 1) * 7);
    date.setDate(date.getDate() - date.getDay());

    getGithubActivity(date)
      .then((activity) => {
        setActivity(activity);
        setStatus("idle");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

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
        <div className="flex-grow" />
        <span className="text-xs text-gray-400">
          {activity?.totalContributions} contributions in the last {WEEKS} weeks
        </span>
      </div>
      <svg
        height={TOTAL_SIZE * 7 - MARGIN + BORDER * 2}
        width={TOTAL_SIZE * WEEKS - MARGIN + BORDER * 2}
      >
        {activity?.contributions.map((day, index) => (
          <ActivitySquare
            key={index}
            dayIndex={index}
            color={getColor(day.level)}
            titleText={`${day.count} ${
              day.count === 1 ? "Contribution" : "Contributions"
            } on ${new Date(day.date).toLocaleDateString("en-NZ")}`}
          />
        ))}
      </svg>
    </>
  );
}

function ErrorContent() {
  const errorActivity = Array.from({ length: WEEKS * 7 });

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
        width={TOTAL_SIZE * WEEKS - MARGIN + BORDER * 2}
      >
        {errorActivity.map((_, index) => (
          <ActivitySquare
            key={index}
            dayIndex={index}
            color={randomErrorColor()}
          />
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
        width={TOTAL_SIZE * WEEKS - MARGIN + BORDER * 2}
      >
        {Array.from({ length: WEEKS * 7 }).map((_, index) => (
          <ActivitySquare
            key={index}
            dayIndex={index}
            color={getColor(0)}
            pulse
          />
        ))}
      </svg>
    </>
  );
}

interface iActivitySquareProps {
  dayIndex: number;
  color: string;
  pulse?: boolean;
  titleText?: string;
}

function ActivitySquare({
  dayIndex,
  color,
  pulse = false,
  titleText = "",
}: iActivitySquareProps) {
  const xPos = BORDER + ~~(dayIndex / 7) * TOTAL_SIZE;
  const yPos = BORDER + (dayIndex % 7) * TOTAL_SIZE;

  return (
    <rect
      width={SIZE}
      height={SIZE}
      x={xPos}
      y={yPos}
      fill={color}
      rx={BORDER_RADIUS}
      ry={BORDER_RADIUS}
      // scale={Math.random() * 0.5 + 0.5}
      style={{
        transformOrigin: `${xPos + SIZE / 2}px ${yPos + SIZE / 2}px`,
        // transition: "all 0.4s ease-in-out",
      }}
      className={`hover:scale-[1.15] transition duration-150 ease-in-out ${
        pulse && "animate-pulse"
      }`}
    >
      <title>{titleText}</title>
    </rect>
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
