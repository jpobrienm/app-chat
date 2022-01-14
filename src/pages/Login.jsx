import { Link, useNavigate} from "react-router-dom";
import "../styles/Login.css"
import {useState} from "react";
import {app, github, google} from "../service/firebase";
import firebase from "firebase/compat/app";

const Login = () => {

    const [user, setUser] = useState({error: null, email:null})
    const navigate = useNavigate();

    console.log(firebase.auth().currentUser)

    const loginWithGoogle = () => {
        try{
            app.auth().signInWithPopup(google)
                .then(response => {
                    setUser({...user, email:response.user.multiFactor.user.email})
                    navigate("/chats")
                })
        } catch (error){
            setUser({...user, error:error.message})
        }
    }

    const loginWithGithub = () => {
        try{
            app.auth().signInWithPopup(github)
                .then(response => {
                    setUser({...user, email:response.user.multiFactor.user.email})
                    navigate("/chats")
                })
        } catch (error){
            setUser({...user, error:error.message})
        }
    }

    return (
      <>
        <div className="centered">
          <h1>Sign up to
              <Link className="link" to="/"> Chatty</Link>
          </h1>
          <h2>Login</h2>
          <div>
              <input type="submit" name="name" id="name" value="Iniciar Sesion con Google" onClick={loginWithGoogle}/>
              <input type="submit" name="name" id="name" value="Iniciar Sesion con Github" onClick={loginWithGithub}/>
          </div>
        </div>
        <div className="bottom">already have an account?
          <Link className="login" to="/"> Log in</Link>
        </div>
      </>
    );
}

export default Login;