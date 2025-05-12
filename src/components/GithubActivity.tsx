import React, { useEffect, useRef } from "react";

import Card, { iProps as iCardProps } from "./Card";
import { FaExclamationTriangle, FaGithub, FaSpinner } from "react-icons/fa";
import getGithubActivity, { iGithubActivity } from "../util/getGithubActivity";
import { animate, createScope, Scope, stagger, utils } from "animejs";

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
      <GithubGrid weeks={WEEKS} content={activity} />
    </>
  );
}

function ErrorContent() {
  return (
    <>
      <div className="text-sm font-medium flex items-center gap-2 border-b-1 pb-1 mb-1">
        <FaExclamationTriangle size={18} />
        Could not load github activity
      </div>

      <GithubGrid weeks={WEEKS} colorPalette="error" />
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

      <GithubGrid weeks={WEEKS} pulsing />
    </>
  );
}

interface iGithubGridProps {
  weeks: number;
  content?: iGithubActivity;
  pulsing?: boolean;
  colorPalette?: "normal" | "error";
}

function GithubGrid({
  weeks,
  content,
  pulsing = false,
  colorPalette = "normal",
}: iGithubGridProps) {
  const height = TOTAL_SIZE * 7 - MARGIN + BORDER * 2;
  const width = TOTAL_SIZE * weeks - MARGIN + BORDER * 2;

  const weeksArray = Array.from({ length: weeks }).map((_, i) => i);
  const daysArray = Array.from({ length: 7 }).map((_, i) => i);

  const dayIndex = (week: number, day: number) => day + week * 7;

  const total = weeks * 7 - 1;

  const root = useRef(null);
  const scope = useRef<Scope | null>(null);

  const squareColor = (level: number): string => {
    if (colorPalette === "error") {
      return randomErrorColor();
    }
    return getColor(level);
  };

  useEffect(() => {
    const sc = createScope({ root }).add((self) => {
      animate(".activitySquare", {
        scale: [{ to: [0, 1.1] }, { to: 1 }],

        delay: stagger(10, {
          grid: [7, WEEKS - 1],
          from: 0,
        }),
      });

      self.add("pulsing", () => {
        animate(".activitySquare", {
          scale: [
            { to: 1.1, duration: 0 },
            { to: 1.2, duration: 1000 },
            { to: 1, duration: 1000 },
          ],
          easing: "easeInOutSine",
          loop: true,
        });
      });

      self.add("growSquare", (i) => {
        animate(".activitySquare", {
          scale: stagger([1.2, 1], {
            grid: [7, WEEKS - 1],
            from: i,
            ease: "outExpo",
          }),
          duration: stagger(10, {
            grid: [7, WEEKS - 1],
            from: i,
          }),
        });
      });

      self.add("revert", () => {
        animate(".activitySquare", {
          scale: [{ to: 1 }],
          duration: 0,
        });
      });
    });

    scope.current = sc;

    return () => scope.current?.revert();
  }, []);

  return (
    <>
      <div
        ref={root}
        className="flex gap-[2px]"
        style={{
          height: height,
          width: width,
        }}
        onMouseLeave={() => scope.current?.methods.revert()}
      >
        {weeksArray.map((week) => (
          <div
            key={week}
            className="grid gap-[2px]"
            style={{ height: TOTAL_SIZE }}
          >
            {daysArray.map((day) => {
              const index = dayIndex(week, day);
              const activity = content?.contributions[index];

              return (
                <div
                  key={index}
                  title={`${activity?.date} - ${activity?.count} contribution${
                    activity?.count !== 1 ? "s" : ""
                  }`}
                  style={{ backgroundColor: squareColor(activity?.level ?? 0) }}
                  className="h-[14.6px] w-[14.6px] rounded-sm activitySquare"
                  onMouseOver={() => scope.current?.methods.growSquare(index)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </>
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

function randomErrorColor() {
  const colors = ["#ff8080", "#fc6565", "#fa5555", "#f5bcbc", "#fff0f0"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default GithubActivity;
