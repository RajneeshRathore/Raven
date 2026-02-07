import React from "react";

const Message = ({ text, sender, avatar, time }) => {
  return (
    <div className="flex gap-3 mb-4">
      <img
        src={avatar}
        alt={sender}
        className="w-9 h-9 rounded-full"
      />

      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {sender}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>
        </div>

        <p className="text-white text-sm">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Message;
