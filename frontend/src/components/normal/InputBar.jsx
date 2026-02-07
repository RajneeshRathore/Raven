import React, { useState } from "react";
import { MdGifBox, MdAttachment } from "react-icons/md";
import { BsEmojiGrin } from "react-icons/bs";
import EmojiPicker from "./EmojiPicker";
const InputBar = () => {
    const [message,setMessage]=useState("");
      const [showEmoji, setShowEmoji] = useState(false);
  return (
    <div
      className="h-[70%] w-[90%] rounded-xl 
  bg-[#1a1a1a]/90 backdrop-blur-md
  border border-white/10
  flex items-center px-4 justify-between
  shadow-[0_0_20px_rgba(0,0,0,0.4)]
"
    >
      <input
        type="text"
        placeholder="Message..."
        className="flex-1 bg-transparent outline-none 
      text-white placeholder-gray-400
      text-sm tracking-wide"
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
      />

      <div className="ml-4 flex items-center gap-4 text-gray-400">
        <MdAttachment
          size={22}
          className="hover:text-white cursor-pointer transition"
        />
          <BsEmojiGrin
          size={20}
          onClick={() => setShowEmoji((prev) => !prev)}
          className="hover:text-white cursor-pointer transition"
        />

        {/* Emoji Picker */}
        {showEmoji && (
          <EmojiPicker
            onSelect={(emoji) => {
              setMessage((prev) => prev + emoji);
              setShowEmoji(false);
            }}
          />
        )}
        <MdGifBox
          size={24}
          className="hover:text-white cursor-pointer transition"
        />
      </div>
    </div>
  );
};

export default InputBar;
