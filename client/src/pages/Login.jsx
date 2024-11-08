import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);
  return (
    <>
      <div className="w-[100%] h-[93vh] flex flex-col justify-center items-center">
        <div className="border rounded-lg p-3 flex flex-col gap-3">
          <h1 className="text-[20px] font-poppins font-medium">Login</h1>
          <form action="" onSubmit={loginUser} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }
              className="w-[250px] pl-2 py-1 rounded-lg outline-none text-black font-poppins"
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
              className="w-[250px] pl-2 py-1 rounded-lg outline-none text-black font-poppins"
            />
            <input
              type="submit"
              className="w-[250px] pl-2 py-1 rounded-lg bg-[#06b8ff] text-black font-poppins"
              value={isLoginLoading ? "Getting you in..." : "Login"}
            />
          </form>
        </div>
        {loginError && (
          <div className="bg-[#ffbbbb] mt-5 w-[275px] p-3 text-[#770505] rounded-md">
            {loginError}
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
