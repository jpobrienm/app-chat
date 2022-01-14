import {Link} from "react-router-dom";
import React, {useState} from "react";
import firebase from "firebase/compat/app";

export const PrivateHeader = () =>{

    const [user, setUSer] = useState({user: firebase.auth().currentUser})

    const handleLogout = () =>{
        firebase.auth().signOut().then(() =>{})
    }

    return(
    <div className='header'>
        <Link className="item" to="/chats">Chats</Link>
        <Link className="item" to="/" onClick={handleLogout}>Logout</Link>
    </div>
    )
}