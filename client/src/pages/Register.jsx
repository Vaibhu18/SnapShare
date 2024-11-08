import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <>
      <div className="w-[100%] h-[93vh] flex flex-col justify-center items-center">
        <div className="border rounded-lg p-3 flex flex-col gap-3">
          <h1 className="text-[20px] font-poppins font-medium">Register</h1>
          <form onSubmit={registerUser} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                updateRegisterInfo({ ...registerInfo, name: e.target.value })
              }
              className="w-[250px] pl-2 py-1 rounded-lg outline-none text-black font-poppins"
            />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) =>
                updateRegisterInfo({ ...registerInfo, email: e.target.value })
              }
              className="w-[250px] pl-2 py-1 rounded-lg outline-none text-black font-poppins"
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  password: e.target.value,
                })
              }
              className="w-[250px] pl-2 py-1 rounded-lg outline-none text-black font-poppins"
            />
            <input
              type="submit"
              className="w-[250px] pl-2 py-1 rounded-lg bg-[#06b8ff] text-black cursor-pointer font-poppins"
              value={isRegisterLoading ? "Creating account.." : "Register"}
            />
          </form>
        </div>
        {registerError && (
          <div className="bg-[#ffbbbb] mt-5 w-[275px] p-3 text-[#770505] rounded-md">
            {registerError}
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
