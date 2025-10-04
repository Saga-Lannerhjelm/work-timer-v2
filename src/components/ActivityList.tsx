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
    <ul className="flex flex-wrap gap-2">
      {activities.map((a) => {
        const active = a.name === startedActivity;
        return (
          <li
            key={a.name}
            onClick={() => onActivityClick(a.name)}
            className={`border px-4 py-2 rounded cursor-pointer ${
              active ? "text-white" : "text-black"
            }`}
            style={{
              borderColor: a.color,
              backgroundColor: active ? a.color : "transparent",
            }}
          >
            {a.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ActivityList;
