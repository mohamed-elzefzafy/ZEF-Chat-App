

const SendMessage = ({messages , sender , setMessages , socket , chatId}) => {
  const sendMessage = () => {
    let message = document.getElementById("new-message").value;
    if (message && message.length > 0) {
      document.getElementById("new-message").value = ""
      const newMessage = {text : message , sender , chatId}
      const token = localStorage.getItem("token");

      socket.emit("message" , { message :newMessage , token});
      setMessages([...messages , newMessage]);
      
    }
  }
  return (
  
<>
<footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                <div className="flex items-center">
                    <textarea id="new-message" type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"/>
                    <button     onClick={sendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                </div>
            </footer>






</>
    
  )
}

export default SendMessage