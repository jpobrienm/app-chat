import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Header.css"
import firebase from "firebase/compat/app";

const PublicHeader = () => {

    const handleLogout = () =>{
        firebase.auth().signOut().then(() =>{})
    }

    return (
        <div className='header'>
            <Link className="item" to="/" onClick={handleLogout}>Login</Link>
        </div>
  );
}

export default PublicHeader;