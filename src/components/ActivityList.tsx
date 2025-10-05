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
    <div className="flex flex-col">
      <h3 className="mb-2">Activities</h3>
      <ul className="flex flex-wrap gap-2">
        {activities.map((a) => {
          const active = a.name === startedActivity;
          const color = a.color.slice(3);
          return (
            <li
              key={a.name}
              onClick={() => onActivityClick(a.name)}
              className={`border px-2 py-1 rounded text-sm cursor-pointer ${
                active ? "text-white" : "text-black"
              } border-${color} ${active ? "bg-" + color : "bg-opacity-0"}`}
            >
              {a.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityList;
