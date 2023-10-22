import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getEmail } from "../redux/Slices/emailSlice";


const Pagination = () => {
    const {emails,total}=useSelector(state=>state.email)
    const [page, setPage] = useState(1)
    const dispatch=useDispatch()
    console.log(Math.ceil(total/emails?.length));

  useEffect(()=>{
   dispatch(getEmail(page))
  },[dispatch,page])
  return (
    <div className="w-full flex justify-center items-center mt-5">
      
     <div className="flex gap-3">
       <button className={`${page===1?"hidden":"text-lg font-semibold px-4 py-2 bg-[#CFD2DC] rounded-full text-gray-600"}`} onClick={()=>setPage(page-1)} >
         &lt;
       </button>
       <button onClick={()=>setPage(page+1)} className={`${page===Math.ceil(total/emails?.length)-1?"hidden":"text-lg font-semibold px-4 py-2 bg-[#CFD2DC] rounded-full text-gray-600"} `}>
         &gt;
       </button>

     </div>
      
    </div>

  )
}

export default Pagination