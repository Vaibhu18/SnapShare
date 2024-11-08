import React from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import { CiUser } from "react-icons/ci";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationAsRead } =
    useContext(ChatContext);
  const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const thisUserNotifications = unreadNotifications?.filter((n) => {
    return n.senderId == recipientUser?._id;
  });

  const isOnline = onlineUsers?.some(
    (user) => user?.userId == recipientUser?._id
  );

  const truncateTest = (text) => {
    let shortText = text.substring(0, 20);
    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };

  return (
    <>
      <div
        onClick={() => {
          if (thisUserNotifications?.length !== 0) {
            markThisUserNotificationAsRead(
              thisUserNotifications,
              notifications
            );
          }
        }}
        className="relative flex justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-[35px] h-[35px] bg-[#5f5f5f76] rounded-full flex justify-center items-center">
            <CiUser size={25} />
          </div>
          <div>
            <div className=" font-poppins font-medium text-[15px]">
              {recipientUser?.name}
            </div>
            <div className=" font-poppins text-[13px] font-light">
              {latestMessage?.text && (
                <span>{truncateTest(latestMessage?.text)}</span>
              )}
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-1 items-center justify-center">
          <div className="text-[13px]">
            {moment(latestMessage?.createdAt).calendar()}
          </div>
          {thisUserNotifications?.length > 0 && (
            <div className="w-[20px] h-[20px] bg-[#0cff3c] text-black font-poppins font-semibold text-[14px] rounded-full flex justify-center items-center">
              {thisUserNotifications?.length}
            </div>
          )}
        </div>
        <span
          className={
            isOnline
              ? " absolute w-[10px] h-[10px] top-[8px] bg-[#0cff3c] rounded-full"
              : ""
          }
        ></span>
      </div>
    </>
  );
};

export default UserChat;
