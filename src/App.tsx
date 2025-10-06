import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import ActivityList from "./components/ActivityList";
import EventList from "./components/EventList";
import NotesInput from "./components/NotesInput";
import TotalSummary from "./components/TotalSummary";
import { getItem, setItem, removeItem } from "./utils/storage";
import "./index.css";
import "preline";

export interface EventEntry {
  start: Date | string;
  end: Date | string | null;
  note: string;
}

export interface Activity {
  name: string;
  color: string;
  events: EventEntry[];
}

const ACTIVITIES_KEY = "activities";
const STARTED_KEY = "startedActivity";

export default function App() {
  const [activities, setActivities] = useState<Activity[]>(
    () => getItem<Activity[]>(ACTIVITIES_KEY) || []
  );
  const [startedActivity, setStartedActivity] = useState<string | undefined>(
    () => getItem<string>(STARTED_KEY) || undefined
  );
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    setItem(ACTIVITIES_KEY, activities);
  }, [activities]);

  useEffect(() => {
    if (startedActivity) {
      setItem(STARTED_KEY, startedActivity);
    } else {
      removeItem(STARTED_KEY);
    }
  }, [startedActivity]);

  const addActivity = (name: string, color: string) => {
    if (!name || activities.some((a) => a.name === name)) return;
    const newActivity: Activity = { name, color, events: [] };
    setActivities((prev) => [...prev, newActivity]);
  };

  const handleActivityClick = (activityName: string) => {
    const updated = [...activities];
    const selected = updated.find((a) => a.name === activityName);
    if (!selected) return;

    if (!startedActivity) {
      selected.events.push({ start: new Date(), end: null, note: "" });
      setActivities(updated);
      setStartedActivity(activityName);
    } else if (startedActivity === activityName) {
      const lastEvent = selected.events.at(-1);
      if (lastEvent) lastEvent.end = new Date();
      setActivities(updated);
      setStartedActivity(undefined);
      setNote("");
    }
  };

  const updateEventNote = (value: string) => {
    setNote(value);
    if (!startedActivity) return;

    const updated = [...activities];
    const active = updated.find((a) => a.name === startedActivity);
    if (!active) return;

    const lastEvent = active.events.at(-1);
    if (lastEvent) lastEvent.note = value;

    setActivities(updated);
  };

  const updateEventTime = (
    activityName: string,
    eventIndex: number,
    type: "start" | "end",
    newTime: string
  ) => {
    const updated = [...activities];
    const activity = updated.find((a) => a.name === activityName);
    if (!activity) return;

    const event = activity.events[eventIndex];
    if (!event) return;

    const now = new Date();
    const [hours, minutes] = newTime.split(":").map(Number);
    const updatedTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    event[type] = updatedTime;
    setActivities(updated);
  };

  const deleteAllEvents = () => {
    const cleared = activities.map((a) => ({ ...a, events: [] }));
    setActivities(cleared);
    setStartedActivity(undefined);
  };

  return (
    <div
      data-hs-layout-splitter='{
        "horizontalSplitterTemplate": "<div><span class=\"absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 block w-4 h-6 flex justify-center items-center bg-white border border-gray-200 text-gray-400 rounded-md cursor-col-resize hover:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-600 dark:hover:bg-neutral-900\"><svg class=\"shrink-0 size-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"9\" cy=\"12\" r=\"1\"/><circle cx=\"9\" cy=\"5\" r=\"1\"/><circle cx=\"9\" cy=\"19\" r=\"1\"/><circle cx=\"15\" cy=\"12\" r=\"1\"/><circle cx=\"15\" cy=\"5\" r=\"1\"/><circle cx=\"15\" cy=\"19\" r=\"1\"/></svg></span></div>",
        "horizontalSplitterClasses": "relative flex border-s border-gray-200 dark:border-neutral-700"
      }'
    >
      <div
        className="flex h-screen"
        data-hs-layout-splitter-horizontal-group=""
      >
        <div
          className="overflow-hidden h-full p-4 bg-neutral-100"
          data-hs-layout-splitter-item="20"
          style={{ flex: "20 1 0px" }}
        >
          <InputForm onAdd={addActivity} />
          <ActivityList
            activities={activities}
            startedActivity={startedActivity}
            onActivityClick={handleActivityClick}
          />
          {startedActivity && (
            <NotesInput value={note} onChange={updateEventNote} />
          )}
        </div>
        <div
          className="overflow-x-hidden h-full p-4"
          data-hs-layout-splitter-item="80"
          style={{ flex: "80 1 0px" }}
        >
          <EventList activities={activities} onTimeUpdate={updateEventTime} />
          <TotalSummary activities={activities} />
          <button
            onClick={deleteAllEvents}
            className="bg-red-500 text-white text-sm px-4 py-2 rounded flex gap-2"
          >
            <svg
              className="w-5 h-5 text-whiet-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
            Delete events
          </button>
        </div>
      </div>
    </div>
  );
}
