import React from "react";
import type { Activity } from "../App";

interface Props {
  activities: Activity[];
  startedActivity?: string;
  onActivityClick: (name: string) => void;
}

const ActivityList: React.FC<Props> = ({
  activities,
  startedActivity,
  onActivityClick,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <h3 className="mb-2">Activities</h3>
      <ul className="flex flex-wrap gap-2">
        {activities.map((a) => {
          const active = a.name === startedActivity;
          const color = a.color.slice(3);
          return (
            <li
              key={a.name}
              onClick={() => onActivityClick(a.name)}
              className={`border pl-2 pr-1 py-1 rounded text-sm cursor-pointer ${
                active ? "text-white" : "text-black"
              } border-${color} ${active ? "bg-" + color : "bg-opacity-0"}`}
            >
              <div className="flex gap-1 items-center">
                {a.name}
                {active ? (
                  <svg
                    className="w-4 h-4 text-white-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-white-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityList;
