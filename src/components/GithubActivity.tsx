import React from "react";

import Card, { iProps as iCardProps } from "./Card";
import { FaGithub } from "react-icons/fa";
import getGithubActivity from "../util/getGithubActivity";

interface iProps
  extends Omit<iCardProps, "children" | "href" | "target" | "hover"> {}

const SIZE = 18;
const MARGIN = 4;
const TOTAL_SIZE = SIZE + MARGIN;
const BORDER = MARGIN;

const weeks = 14;

function GithubActivity(props: iProps) {
  getGithubActivity(weeks * 7);

  const days = Array.from({ length: weeks * 7 }, (_, i) => i);

  return (
    <Card {...props}>
      <div className="text-sm font-medium flex items-center gap-2 border-b-1 pb-1 mb-1">
        <FaGithub size={18} />
        Recent activity across accounts
      </div>
      <svg
        height={TOTAL_SIZE * 7 - MARGIN + BORDER * 2}
        width={TOTAL_SIZE * weeks - MARGIN + BORDER * 2}
      >
        {days.map((day) => (
          <ActivitySquare
            dayIndex={day}
            level={Math.floor(Math.random() * 5)}
          />
        ))}
      </svg>
    </Card>
  );
}

function ActivitySquare({
  dayIndex,
  level,
}: {
  dayIndex: number;
  level: number;
}) {
  const xPos = BORDER + ~~(dayIndex / 7) * TOTAL_SIZE;
  const yPos = BORDER + (dayIndex % 7) * TOTAL_SIZE;

  return (
    <rect
      width={SIZE}
      height={SIZE}
      x={xPos}
      y={yPos}
      fill={getColor(level)}
      rx={4}
      ry={4}
      // scale={Math.random() * 0.5 + 0.5}
      style={{
        transformOrigin: `${xPos + SIZE / 2}px ${yPos + SIZE / 2}px`,
        // transition: "all 0.4s ease-in-out",
      }}
      className="hover:scale-125 transition duration-300 ease-in-out cursor-pointer"
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
