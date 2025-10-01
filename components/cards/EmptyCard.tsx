// components/cards/EmptyCard.tsx
import React from "react";

interface EmptyCardProps {
  message?: string;
}

const EmptyCard: React.FC<EmptyCardProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-600 bg-gray-800/50 p-6 text-gray-400 shadow-sm min-h-[200px]">
      <span className="text-sm font-medium">
        {message || "No content available"}
      </span>
    </div>
  );
};

export default EmptyCard;
