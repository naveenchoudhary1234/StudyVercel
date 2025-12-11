import React from 'react';
import { Link } from 'react-router-dom';

export default function CTAButton({children,active,linkto}) {
  // children text active colour linkto kha refer hogaa yee
    return (
   <Link to={linkto}>
   <div className={`text-center text-xs sm:text-sm lg:text-[13px] px-4 sm:px-6 py-2 sm:py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black hover:bg-yellow-100" : "bg-richblack-800 hover:bg-richblack-700"} hover:scale-95 transition-all duration-200 touch-padding`}>
  {children}
</div>

   
   </Link>
  )
}
