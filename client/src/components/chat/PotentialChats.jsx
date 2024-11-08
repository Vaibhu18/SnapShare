import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  return (
    <div className="relative max-w-[35%] h-[35px] flex items-center gap-3 overflow-x-auto scrollbar-hide">
      {potentialChats &&
        potentialChats.map((chat, index) => (
          <span
            key={index}
            onClick={() => createChat(user._id, chat._id)}
            className="bg-[#00bfff] px-1 py-1 rounded-lg text-black text-[15px]"
          >
            {chat.name}

            <span className={onlineUsers?.some((user)=> user?.userId == chat?._id ) ? "absolute top-0 w-[10px] h-[10px] bg-[#03ff03] rounded-full" : ""}></span>
          </span>
        ))}
    </div>
  );
};

export default PotentialChats;
