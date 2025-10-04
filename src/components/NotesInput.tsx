import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const NotesInput: React.FC<Props> = ({ value, onChange }) => (
  <div>
    <input
      type="text"
      placeholder="Note"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full"
    />
  </div>
);

export default NotesInput;
