import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function LandingPage() {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/todolist`; 
        navigate(path);
    }
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const fetchUserName = async () => {
        try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
        } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

  return (
    <>
        <h1 className='text-center mt-20 font-semibold text-xl text-blue-950'>
            Welcome {name}!
        </h1>
        <div className='text-center justify-center flex'>
            <button className='bg-white mt-10 rounded-2xl hover:cursor-pointer text-blue-900 p-4 font-semibold border-l-blue-900 border-b-blue-900 shadow-lg hover:bg-blue-50'
            onClick={routeChange}>
            Click here to proceed!</button>
        </div>
        
    </>
  )
}

export default LandingPage

