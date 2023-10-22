/* eslint-disable react/prop-types */

import { getDateFormat } from "../utils/date-formater";


const EmailCard = ({setisSelected,email,setSelectedData}) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=Ayan&background=random&rounded=true`;
    const handleClick=()=>{
        setisSelected(true)
        setSelectedData({...email,["read"]:true})

    }
   
  return (
    <div onClick={handleClick} className="w-full bg-white p-5 cursor-pointer rounded-md border border-[#CFD2DC] hover:bg-[#CFD2DC]">
     <div className="flex gap-4 w-full">
        <div>
            <img className="rounded-full w-12 h-12" src={avatarUrl} alt={"avatar_pic"} />
        </div>
        <div className="flex flex-col gap-1">
            <div className="flex gap-2">
                <h3 className="text-gray-500">From:</h3>
                <p className="text-[#636363] font-semibold">{email.from.name} <span className="text-[#636363] font-semibold"> &lt;{email.from.email}&gt;</span></p>
            </div>
            <div className="flex gap-1">
                <h3 className="text-gray-500">Subject:</h3>
                <p className="text-[#636363] font-semibold">{email?.subject}</p>
            </div>
            <p className="text-[#636363] mt-2 line-clamp-1">{email?.short_description}</p>
            <div className="w-full flex justify-between">

            <p className="text-[#636363]">{getDateFormat(email?.date)}</p>
            {email.fav && <button className="bg-[#E54065] text-white rounded-full text-sm px-3 py-1">favorite</button>}
            </div>
        </div>
     </div>
    </div>
  )
}

export default EmailCard