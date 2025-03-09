import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";


function ResetPage() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/landing");
  }, [user, loading]);
  return (
    <div className="reset">
      <div className="bg-white shadow-md rounded-2xl mt-20 w-3/5 lg:w-1/3 p-5 m-5 flex flex-col justify-center place-self-center border-b-gray-100 border-l-gray-100">
        <input
          type="text"
          className="border border-blue-900 mr-4 p-2 rounded-2xl mb-5 placeholder-cyan-800 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="font-bold text-white shadow-md bg-blue-900 mb-4 p-3 place-self-center rounded-2xl hover:cursor-pointer hover:bg-blue-800"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register" className="underline hover:text-blue-700">Register</Link>
        </div>
      </div>
    </div>
  );
}
export default ResetPage;