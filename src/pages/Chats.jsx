import "../styles/Chats.css"
import {createRef, useEffect, useRef, useState} from "react";
import firebase from "firebase/compat/app";
import {database} from "../service/firebase";

const Chats = () =>{

    const initialState = {
        user: firebase.auth().currentUser,
        chats: [],
        content: "",
        readError: null,
        writeError: null,
        loadingChats: false,
    }

    const [chats, setChats] = useState(initialState)
    const [auth, setAuth] = useState({authenticated: false, loading: true})

    const myRef = createRef();
    const authRef = useRef(false)

    const componentDidMount = () =>{
        setChats({...chats, readError: null, loadingChats: true})
        const chatArea = myRef.current;
        try{
            database.ref("chats").on("value", (snapshot) =>{
                let dbChats = []
                snapshot.forEach(snap =>{
                    dbChats.push(snap.val());
                });
                setChats({...chats, chats: dbChats})
                dbChats.sort(function (a,b){
                    return a.timestamp - b.timestamp
                });
                chatArea.scrollBy(0, chatArea.scrollHeight);
                setChats({...chats, loadingChats: false})
            })
        }catch (error){
            setChats({ ...chats, readError: error.message, loadingChats: false})
        }
    }

    const handleChange = (e) =>{
        setChats({...chats, content: e.target.value})
    }

    const handleSubmit =  (e) =>{
        e.preventDefault();
        setChats({...chats, writeError: null});
        const chatArea = myRef.current;
        try{
            const messagePackage = {
                content: chats.content,
                timestamp: Date.now(),
                uid: chats.user.uid
            }
             database.ref("chats").push(messagePackage)
            setChats({...chats, content: ""});
            chatArea.scrollBy(0, chatArea.scrollHeight)
            chats.chats.push(messagePackage)
        } catch (error){
            setChats({...chats, writeError: error.message})
        }
    }

    const formatTime = (timestamp) =>{
        const d = new Date(timestamp);
        return `${d.getDate()}/${
            d.getMonth() + 1
        }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    }


    useEffect(() =>{
        if(!authRef.current){
            firebase.auth().onAuthStateChanged( (response) =>{
                componentDidMount()
                authRef.current = true
            })
        }
    }, [authRef.current])


    return(
        <>
            <div className="messageBox" ref={myRef}>
                {chats.loadingChats ? (
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    ""
                )}
                {chats && chats.chats.map(chat =>{
                    return (
                        <div
                            key={chat.timestamp}
                            className="chat-bubble"
                        >
                            {chats.user.multiFactor.user.uid === chat.uid && <p className="myP"><small>(current-user)</small></p>}
                            {chats.user.multiFactor.user.uid !== chat.uid && <p className="myP"><small>({chat.uid})</small></p>}
                            {chat.content}
                            <br />
                            <span className="chat-time float-right">
                    {formatTime(chat.timestamp)}
                  </span>
                        </div>
                    );
                })
                }
            </div>
            <div className="sendbox">
                <form onSubmit={handleSubmit}>
                   <input className="message"
                             type="text"
                             name="name"
                             id="name"
                             placeholder="Escribe tu mensaje"
                             autoComplete="off"
                             onChange={handleChange}
                             value={chats.content}/>
                    {chats.error ? (
                        <p className="text-danger">{chats.error}</p>
                    ) : null}
                    <button type="submit">
                        Enviado
                    </button>
                </form>
                <div className="py-5 mx-3">
                    Usuario actual:{" "}
                    <strong className="text-info">{chats.user.email}</strong>
                </div>
            </div>
        </>
    )
}

export default Chats;