import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, currentChat, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
  return (
    <>
      <div className=" w-[91.5%] mx-auto h-[93vh] py-2">
        <PotentialChats />
        <div className=" flex gap-3 mt-2">
          <div className="min-w-[35%]">
            {isUserChatsLoading && <p>Loading Chats...</p>}
            {userChats?.map((chat, index) => (
              <div
                onClick={() => updateCurrentChat(chat)}
                key={index}
                className=" border-b pb-1"
              >
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </div>
          <div className="min-w-[65%] border min-h-[500px] max-h-[500px]">
            {currentChat && <ChatBox />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
