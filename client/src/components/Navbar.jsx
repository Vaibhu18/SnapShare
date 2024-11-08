import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ChatContext } from "../context/ChatContext";
import { unreadNotificationsFunc } from "../utils/unreadNotifications";
import moment from "moment";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id == n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });


  return (
    <>
      <div className="bg-[#2d2d2d] w-[100%] h-[7vh] flex justify-between items-center px-16 py-2">
        <h1 className=" text-[25px] font-semibold">
          <Link to="/">ChatApp</Link>
        </h1>
        {user && <h1 className="text-[#b7b70e]">Logged in as: {user.name}</h1>}
        {user ? (
          <>
            <div className="relative flex gap-5 items-center">
              <IoIosNotificationsOutline
                size={30}
                onClick={() => setIsOpen(!isOpen)}
              />
              <Link
                to="/login"
                onClick={logoutUser}
                className="text-[17px] px-4 py-1 rounded-lg bg-[#1f1f1f] hover:bg-[black]"
              >
                Logout
              </Link>
              {unreadNotifications?.length > 0 && (
                <span className=" absolute -top-1 left-4 w-[17px] h-[17px] rounded-full bg-[red] flex justify-center items-center text-[12px] text-black font-poppins font-semibold">
                  {unreadNotifications?.length}
                </span>
              )}
              {isOpen && (
                <>
                  <div className="absolute top-12 -left-32 bg-black py-2 px-3 rounded-lg">
                    {modifiedNotifications.length > 0 ? (
                      <>
                        <div className="inline-block text-[18px]">
                          Notifications
                        </div>
                        <h1
                          className="inline-block ml-5"
                          onClick={() =>
                            markAllNotificationsAsRead(notifications)
                          }
                        >
                          Mark all as read
                        </h1>
                      </>
                    ) : (
                      <h1 className="inline-block ml-5">
                        no notification yet...
                      </h1>
                    )}
                    <div className=" mt-2">
                      {modifiedNotifications?.map((n, index) => {
                        return (
                          <div
                            key={index}
                            className="mb-2 border-b-2 p-1 bg-[#3d6082] text-[13px] font-poppins"
                            onClick={() => {
                              markNotificationAsRead(
                                n,
                                userChats,
                                user,
                                notifications
                              );
                              setIsOpen(false);
                            }}
                          >
                            <p> {`${n.senderName} sent you a message`} </p>
                            <p>{moment(n.date).calendar()}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-10">
            <Link
              to="/login"
              className="text-[17px] px-4 py-1 rounded-lg bg-[#1f1f1f] hover:bg-[black]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-[17px] px-4 py-1 rounded-lg bg-[#1f1f1f] hover:bg-[black]"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
