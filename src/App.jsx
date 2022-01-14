import Login from './pages/Login';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Chats from './pages/Chats';

const App = () => {

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/Chats" element={<Chats />}/>
            </Routes>
        </Router>
    );
}

export default App;
