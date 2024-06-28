import useAppStore from '../zustandStores/appStore';

const ChatOptions = ({chatId , socket}) => {
  const {setModal} = useAppStore();

  const invitedUsers = () => {
    const token = localStorage.getItem("token");
    setModal({
      show : true,
      children :  (
        <>
          <label
            htmlFor='inviteduser'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            enter the email for the user to invite:
          </label>
          <input
            type="email"
            id='inviteduser'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Your Name'
            required
          />
        </>
      ),
      onclick : () => {
        const invitedUser = document.getElementById("inviteduser").value
        socket.emit("invitedUsers" , {chatId , token , invitedUser})
        setModal({
          show : false,
        })
      }
     })
    
  };
  return (
    <button onClick={invitedUsers} className='bg-indigo-900 text-white px-3 ml-2 text-lg rounded-md
    hover:scale-[1.05] transition-all duration-200'>
   Invite Users</button>
  )
}

export default ChatOptions