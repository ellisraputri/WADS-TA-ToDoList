import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where, doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import defaultProfile from "../assets/pic1.jpg";

function ProfilePage() {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [imageUrl, setImageUrl] =useState("");
    const navigate = useNavigate();
    const [docId, setDocId] = useState(""); 

    const fetchUserName = async () => {
        if (!user) return;

        try {
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docSnap = await getDocs(q);

            if (docSnap.empty) {
                console.log("No document found for UID:", user.uid);
                return;
            }

            const docRef = docSnap.docs[0]; 
            setDocId(docRef.id); 
            setName(docRef.data().name);
            setBio(docRef.data().bio);
            setEmail(docRef.data().email);
            setImageUrl(docRef.data().image || defaultProfile);

            console.log("Document ID:", docRef.id);
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    };

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result;
            setImageUrl(base64Image); 

            await updateDoc(doc(db, "users", docId), {
                image: base64Image
            });

            alert("Profile picture updated successfully!");
        };
    }
    

    const updateBio = async (newBio) => {
        try {
            const userDocRef = doc(db, "users", docId); // Use document ID
            await updateDoc(userDocRef, { bio: newBio });
    
            alert("Bio updated successfully!");
        } catch (err) {
            console.error("Error updating bio:", err);
            alert("Failed to update bio.");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

    return (
        <>
            <p className='text-center mt-10 font-semibold text-4xl text-blue-950'>Profile Page</p>
            <div className='flex flex-col justify-center mt-5 mb-5'>
                <img 
                    src={imageUrl} 
                    alt="Profile" 
                    className="w-40 place-self-center h-40 rounded-full object-cover"
                />
                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="file-upload" className="cursor-pointer mt-3 font-semibold bg-blue-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition">
                        Upload Image
                    </label>
                    <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={handleImageChange} 
                    />
                </div>
            </div>
            <div className='mb-4'>
                <p className='text-center text-xl text-blue-900'><b>Name:</b></p>
                <p className='text-center text-xl text-blue-900'>{name || "Loading..."}</p>
            </div>
            <div className='mb-4'>
                <p className='text-center text-xl text-blue-900'><b>Email:</b></p>
                <p className='text-center text-xl text-blue-900'>{email}</p>
            </div>
            <div className="flex flex-col justify-center">
                <p className='text-center text-xl text-blue-900'><b>Bio:</b></p>
                <textarea
                    className='border border-blue-900 p-2 rounded-2xl w-1/2 mx-auto block text-black'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button
                    className="mt-4 shadow-md font-semibold bg-blue-900 w-40 cursor-pointer place-self-center text-white p-2 rounded-2xl hover:bg-blue-800"
                    onClick={() => updateBio(bio)}
                >
                    Save Bio
                </button>
            </div>
        </>
    );
}

export default ProfilePage;
