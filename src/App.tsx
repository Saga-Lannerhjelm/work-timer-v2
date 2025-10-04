import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import ActivityList from "./components/ActivityList";
import EventList from "./components/EventList";
import NotesInput from "./components/NotesInput";
import TotalSummary from "./components/TotalSummary";
import { getItem, setItem, removeItem } from "./utils/storage";
import "./index.css";

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
    <div className="p-4 max-w-3xl mx-auto flex flex-col gap-6">
      <InputForm onAdd={addActivity} />
      <ActivityList
        activities={activities}
        startedActivity={startedActivity}
        onActivityClick={handleActivityClick}
      />
      {startedActivity && (
        <NotesInput value={note} onChange={updateEventNote} />
      )}
      <EventList activities={activities} onTimeUpdate={updateEventTime} />
      <TotalSummary activities={activities} />
      <button
        onClick={deleteAllEvents}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Rensa alla events
      </button>
    </div>
  );
}
