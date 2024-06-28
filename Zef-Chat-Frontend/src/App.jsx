import { useEffect, useState } from 'react';
import SendMessage from './components/SendMessage';
import Messages from './components/Messages';
import useUserNameHook from './hooks/useUserNameHook';
import useSocketHook from './hooks/useSocketHook';
import useAuthHook from './hooks/useAuthHook';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import useMessagesHook from './hooks/useMessagesHook';
import Modal from './components/Modal';
import useAppStore from './zustandStores/appStore';
import ChatOptions from './components/ChatOptions';

function App() {
  const [messages, setMessages] = useState([]);
const sender = useUserNameHook();

const {modal , setModal} = useAppStore();
console.log(window.location.search);
const urlParams = new URLSearchParams(window.location.search);
const [chatId, setChatId] = useState(urlParams.get("chatid"));

const socket = useSocketHook({chatId});

useMessagesHook(chatId , socket , setMessages);

const {isLoggedIn}  = useAuthHook(socket);






useEffect(()=>{
  if (socket !== null) {
    socket.on("message", (msg) => {
      setMessages([...messages , msg]);
    } )
  }
},[messages, socket , setMessages]);


const makePrivasy = () => {
  const token = localStorage.getItem("token");
  socket.emit("makePrivate" , {chatId , token})
};


  return (
  <>
  {isLoggedIn ? 
  (
    <div className="flex h-screen overflow-hidden">
  <Sidebar socket={socket}/>
  <div className="flex-1">
  <header className="bg-white p-4 text-gray-700"> 
     <h1 className="text-2xl font-semibold">
     {chatId}
     <button onClick={makePrivasy} className='bg-indigo-600 text-white px-3 ml-2 text-lg rounded-md
      hover:scale-[1.05] transition-all duration-200'>
     Make Chat Private</button>

<ChatOptions chatId={chatId} socket={socket}/>
     </h1>

      </header>


  
  <Messages messages={messages}/>
  
    
     <SendMessage chatId={chatId} messages={messages} sender={sender} setMessages={setMessages} socket={socket}/>



    </div>
  </div>
  )
  :
  (
<Login socket={socket}/>
  )
  }
  <Modal  onClick={modal.onClick} show={modal.show}> {modal.children} </Modal>
  </>
  )
}

export default App;

