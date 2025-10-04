import React, { useState } from "react";

interface InputFormProps {
  onAdd: (name: string, color: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff0000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(name.trim(), color);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        value={name}
        placeholder="Activity"
        onChange={(e) => setName(e.target.value)}
        className="border p-2 flex-1 rounded"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-10 h-12"
      />
      <button
        disabled={true}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        +
      </button>
    </form>
  );
};

export default InputForm;
