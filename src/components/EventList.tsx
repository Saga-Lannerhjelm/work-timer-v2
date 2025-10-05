import React from "react";
import type { Activity } from "../App";

interface Props {
  activities: Activity[];
  onTimeUpdate: (
    activityName: string,
    eventIndex: number,
    type: "start" | "end",
    newTime: string
  ) => void;
}

function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDuration(start: Date | string, end: Date | string): string {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h}h ${m}m`;
}

const EventList: React.FC<Props> = ({ activities, onTimeUpdate }) => {
  const events = activities
    .flatMap((a) =>
      a.events.map((ev, i) => ({
        ...ev,
        activity: a.name,
        color: a.color,
        index: i,
      }))
    )
    .filter((e) => e.end);

  if (!events.length) return null;

  const sorted = events.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  return (
    <ul className="space-y-3" id="events">
      {sorted.map((e, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className={`w-3 h-8 rounded-full mt-2 bg-${e.color.slice(3)}`}
          />
          <div>
            <h4 className="font-bold">{e.activity}</h4>
            <div className="flex items-center gap-2">
              <input
                type="time"
                defaultValue={formatTime(e.start)}
                onBlur={(ev) =>
                  onTimeUpdate(e.activity, e.index, "start", ev.target.value)
                }
              />
              <span>→</span>
              <input
                type="time"
                defaultValue={formatTime(e.end!)}
                onBlur={(ev) =>
                  onTimeUpdate(e.activity, e.index, "end", ev.target.value)
                }
              />
              <p className="text-sm text-gray-600">
                ({getDuration(e.start, e.end!)})
              </p>
            </div>
            {e.note && <p className="italic text-gray-700">{e.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
