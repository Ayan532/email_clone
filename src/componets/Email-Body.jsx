/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { getDateFormat } from "../utils/date-formater";
import { getTextFromHtml } from "../utils/html-parser";
import {  addtoFavorite, addtoReads } from "../redux/Slices/emailSlice";
import { useEffect } from "react";


const EmailBody = ({body,setisSelected,selectedData}) => {
    const dispatch=useDispatch()
     useEffect(()=>{
        dispatch(addtoReads(selectedData))
        
     },[dispatch])
    const avatarUrl = `https://ui-avatars.com/api/?name=Ayan&background=random&rounded=true`;
  return (
    <div className="w-full px-10 py-4">
    <div className="flex w-full justify-end items-end">

    <button onClick={()=>setisSelected(false)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 2.70711L3.41421 1.29289L12 9.87868L20.5858 1.29289L22 2.70711L13.4142 11.2929L22 19.8787L20.5858 21.2929L12 12.7071L3.41421 21.2929L2 19.8787L10.5858 11.2929L2 2.70711Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
    <div className="w-full flex justify-between items-center ">
       <div className="flex  gap-4">
         <img className="rounded-full w-15 h-15" src={avatarUrl} alt={"avatar_pic"} />
         
         <div className="flex flex-col gap-4 ">
          <h2 className="text-[#636363] font-semibold text-lg">{selectedData?selectedData?.subject:"Lorem Ipsum"}</h2>
          <p className="text-[#636363]">{selectedData?getDateFormat(selectedData?.date):"26/02/2020 10:30am"}</p>

         </div>
      </div>
    <div className="">
        <button onClick={()=>dispatch(addtoFavorite(selectedData))} className="bg-[#E54065] text-white rounded-full text-sm px-3 py-1">Mark as favorite</button>
    </div>
    </div>
    <div className="px-10 mt-5 w-full text-justify text-[#636363] ">
      {getTextFromHtml(body.body)}
    </div>
    </div>
  )
}

export default EmailBody