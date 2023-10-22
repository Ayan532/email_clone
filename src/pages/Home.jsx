import { useEffect, useState } from "react"
import EmailCard from "../componets/Email-Card"
import EmailBody from "../componets/Email-Body"
import { useDispatch, useSelector } from "react-redux"
import { filter, getEmail, getEmailById } from "../redux/Slices/emailSlice"
import Pagination from "../componets/Pagination"


const Home = () => {
    const [isSelected,setisSelected]=useState(false)

    //Using this state as getById api only showing description
    const [selectedData,setSelectedData]=useState({})
    const dispatch=useDispatch()
    const {emails,email_body,filterEmails}=useSelector((state)=>state.email)

   
  
    useEffect(()=>{
        dispatch(getEmail())
    },[dispatch])
    useEffect(()=>{
        dispatch(getEmailById(selectedData.id))
    },[dispatch,selectedData.id])
  return (
    <div className="w-full p-10">
     <div className="w-full flex justify-start items-center">
      <p>Filter By: </p>
      <div className=" ml-5 flex  gap-5">

      <button className="hover:bg-[#E1E4EA] hover:text-[#636363] rounded-full p-2 ">Unread</button>
      <button  onClick={()=>dispatch(filter("reads"))}className="hover:bg-[#E1E4EA] hover:text-[#636363]  rounded-full p-2">Read</button>
      <button onClick={()=>dispatch(filter('favorites'))} className="hover:bg-[#E1E4EA] hover:text-[#636363]  rounded-full p-2 ">Favorites</button>
      </div>

     </div>
    <div className={isSelected?`flex gap-3`:``}>

     <div className={`email-container ${ isSelected?"flex-[6]":""} flex flex-col gap-4 h-[80vh] mt-5 overflow-y-scroll `}>
        
            {filterEmails && filterEmails.length>0 ? filterEmails.map((email)=><EmailCard key={email.id} setSelectedData={setSelectedData} setisSelected={setisSelected} email={email}/>):emails && emails?.map((email)=><EmailCard key={email.id} setSelectedData={setSelectedData} setisSelected={setisSelected} email={email}/>)}
     
        
     </div>
     {isSelected&&<div className="flex-[5] bg-white mt-5 rounded-md border border-[#CFD2DC] h-[80vh] overflow-y-scroll">
        <EmailBody body={email_body} selectedData={selectedData} setisSelected={setisSelected}/>
     </div>}
    </div>
     <Pagination/>
    </div>
  )
}

export default Home