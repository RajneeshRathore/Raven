import React from "react";
import InputBar from "./InputBar";
import Message from "./Message";
import { chatMessages } from "../../SampleData";

const OpenDm = ({ item }) => {
  const filteredMessages = chatMessages.filter(
    (msg) => msg.senderId === item._id
  );

  return (
    <div className="text-white h-full flex flex-col">

      <div className="flex justify-center items-center border-b border-white/10 h-[7%]">
        <img
          src={item.avatar}
          className="h-[70%] rounded-full mx-2"
          alt={item.username}
        />
        <h1>{item.username}</h1>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col px-4 py-3">
        {filteredMessages.map((msg) => (
          <Message
            key={msg._id}
            text={msg.content}              
            sender={msg.senderName}
            avatar={msg.senderAvatar}
            time={msg.createdAt}
          />
        ))}
      </div>

      <div className="h-20 w-full flex justify-center items-center">
        <InputBar />
      </div>
    </div>
  );
};

export default OpenDm;
