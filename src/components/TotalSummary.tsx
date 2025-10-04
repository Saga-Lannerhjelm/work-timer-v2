import React from "react";
import type { Activity } from "../App";

interface Props {
  activities: Activity[];
}

function getTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  return `${h}h ${m}m`;
}

const TotalSummary: React.FC<Props> = ({ activities }) => {
  const withEvents = activities
    .map((a) => ({
      ...a,
      events: a.events.filter((e) => e.end),
    }))
    .filter((a) => a.events.length > 0);

  if (!withEvents.length) return null;

  const totalTime = withEvents.reduce(
    (acc, a) =>
      acc +
      a.events.reduce(
        (s, e) =>
          s + (new Date(e.end!).getTime() - new Date(e.start).getTime()),
        0
      ),
    0
  );

  const workDayMs = 8 * 60 * 60 * 1000;
  const percent = (totalTime / workDayMs) * 100;

  return (
    <div className="space-y-2">
      <div>
        <h3 className="font-bold">Total</h3>
        <p>{getTime(totalTime)}</p>
      </div>
      {withEvents.map((a) => {
        const sum = a.events.reduce(
          (acc, e) =>
            acc + (new Date(e.end!).getTime() - new Date(e.start).getTime()),
          0
        );
        return (
          <div key={a.name}>
            <h3 className="font-semibold">{a.name}</h3>
            <p>{getTime(sum)}</p>
          </div>
        );
      })}
      <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TotalSummary;
