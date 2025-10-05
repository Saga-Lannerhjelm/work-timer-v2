import React, { useState } from "react";

interface InputFormProps {
  onAdd: (name: string, color: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [selectedColor, setColor] = useState("");

  const handleSubmit = () => {
    console.log("hello");

    onAdd(name.trim(), selectedColor);
    setName("");
  };

  const setActiveColor = (color: string) => {
    console.log(color);

    setColor(color);
  };

  const colors = [
    "bg-red-500",
    "bg-amber-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-green-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-rose-500",
  ];

  const isDisabled = name.trim() === "" || selectedColor === "";

  return (
    <form className="flex flex-col gap-4 mb-10">
      <div>
        <h1 className="mb-2 font-bold">Add activity</h1>
        <input
          type="text"
          value={name}
          placeholder="Activity"
          onChange={(e) => setName(e.target.value)}
          className="border p-1 flex-1 rounded w-full"
        />
      </div>
      <div className="grid grid-cols-10 gap-1 grid-rows-1">
        {colors.map((color) => (
          <div
            key={color}
            className={`h-6 w-6 rounded ${color} ${
              selectedColor === color ? "border-2 border-stone-950" : ""
            }`}
            onClick={() => setActiveColor(color)}
          ></div>
        ))}
      </div>
      <button
        disabled={isDisabled}
        className={
          "bg-blue-500 text-white px-2 py-2 rounded" +
          (isDisabled ? "bg-blue-200 cursor-not-allowed opacity-50" : "")
        }
        onClick={() => handleSubmit()}
      >
        Add activity
      </button>
    </form>
  );
};

export default InputForm;
