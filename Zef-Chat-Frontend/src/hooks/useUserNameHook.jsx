import { useEffect, useState } from "react";
import useAppStore from "../zustandStores/appStore";

export default function useUserNameHook () {
  const [sender, setSender] = useState("test");
  const {setModal} = useAppStore();

  useEffect(()=>{
    const senderName = localStorage.getItem("sender");
    if (senderName) {
      setSender(JSON.parse(localStorage.getItem("sender")));
    }else {
      // const senderInput = prompt("Enter your name" , sender);

      setModal({
        show : true,
        children :  (
          <>
            <label
              htmlFor='senderName'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Please enter your name:
            </label>
            <input
              type='text'
              id='senderName'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Your Name'
              required
            />
          </>
        ),
        onclick : () => {
          const senderInput = document.getElementById("senderName").value
          setSender(senderInput);
          localStorage.setItem("sender", JSON.stringify(senderInput));
          setModal({
            show : false,
          })
        }
       })
      
    
    }
  },[])

  return sender
}
