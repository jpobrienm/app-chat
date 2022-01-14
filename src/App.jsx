import Login from './pages/Login';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicHeader from './components/PublicHeader';
import Chats from './pages/Chats';
import {useEffect, useState} from "react";
import firebase from "firebase/compat/app";
import {PrivateHeader} from "./components/PrivateHeader";

const App = () => {

    const [auth, setAuth] = useState({authenticated: false, loading: true})

    const componentDidMount = () =>{
        firebase.auth().onAuthStateChanged((response) =>{
            setAuth({authenticated: true, loading: false})
            if(!response){
                setAuth({authenticated: false, loading: false})
            }
        });
    }

    useEffect(() =>{
        componentDidMount()
    },[])


    return (
        <Router>
            {auth.authenticated===true && <>
                <PrivateHeader/>
                <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/Chats" element={<Chats />}/>
                </Routes>
                </>}
            {auth.authenticated===false && <>
                <PublicHeader/>
                <Routes>
                    <Route path="/" element={<Login />}/>
                </Routes>
            </>}
        </Router>
    );
}

export default App;
