import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/landing");
  }, [user, loading]);
  return (
    <div className="login">
        <p className='text-center mt-20 font-bold text-4xl text-blue-950'>
            Login Page
        </p>
      <div className="bg-white shadow-md rounded-2xl w-3/5 lg:w-1/3 p-5 m-5 flex flex-col justify-center place-self-center border-b-gray-100 border-l-gray-100">
        <input
          type="text"
          className="border border-blue-900 mr-4 p-2 rounded-2xl mb-5 placeholder-cyan-800 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="border mb-5 border-blue-900 mr-4 p-2 rounded-2xl placeholder-cyan-800 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="font-bold text-white shadow-md bg-blue-900 mb-4 p-2 w-1/2 place-self-center rounded-2xl hover:cursor-pointer hover:bg-blue-800"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="mb-5 font-bold text-white shadow-md bg-gray-600 p-2 w-1/2 place-self-center rounded-2xl hover:cursor-pointer hover:bg-gray-500" onClick={signInWithGoogle}>
           <FontAwesomeIcon icon={faGoogle} /> &nbsp;
           Login with Google
        </button>
        <div>
          <Link to="/reset" className="underline hover:text-blue-700">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register" className="underline hover:text-blue-700">Register</Link> 
        </div>
      </div>
    </div>
  );
}
export default LoginPage;