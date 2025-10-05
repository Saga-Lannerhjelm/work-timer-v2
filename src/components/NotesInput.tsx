import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const NotesInput: React.FC<Props> = ({ value, onChange }) => (
  <div>
    <label
      htmlFor="message"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Add notes to the started activity
    </label>
    <textarea
      id="message"
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Add note to event..."
      onChange={(e) => onChange(e.target.value)}
      value={value}
      rows={5}
    ></textarea>
  </div>
);

export default NotesInput;
