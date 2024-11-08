import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { VscSend } from "react-icons/vsc";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (!recipientUser)
    return (
      <p className="flex justify-center pt-[200px]">
        No Convertiation selected yed
      </p>
    );

  if (isMessagesLoading)
    return (
      <p className="flex justify-center pt-[200px]">Loading messages...</p>
    );

  return (
    <div className="flex flex-col h-[500px] ">
      <div className=" text-center bg-[black] py-2 h-[40px] font-poppins">
        {recipientUser.name}
      </div>
      <div className="h-[460px] flex flex-col  px-4 py-2 overflow-y-auto scrollbar-hide">
        {messages &&
          messages.map((msg, index) => (
            <div
              ref={scroll}
              className={
                msg.senderId == user._id
                  ? "text-right mb-2"
                  : "text-left mb-2 max-w-[300px]"
              }
              key={index}
            >
              <span className="bg-[#00bfff] px-3 py-1 rounded-[10px] inline-block max-w-[300px] text-left">
                {msg.text}
                <p className="text-[12px] font-poppins mt-[5px] text-right">
                  {moment(msg.createdAt).calendar()}
                </p>
              </span>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center gap-1 m-1">
        <InputEmoji value={textMessage} onChange={setTextMessage} />
        <button
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
          className="bg-[#05e2ff] px-3 rounded-[10px] hover:bg-[#00b7ff] h-[40px]"
        >
          <VscSend className="text-black text-[20px]" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
