import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Header.css"

function Header() {
    return (
    <div className='header'>
        <Link className="item" to="/">Home</Link>
        <Link className="item" to="/Chats">Chats</Link>
    </div>
  );
}

export default Header;