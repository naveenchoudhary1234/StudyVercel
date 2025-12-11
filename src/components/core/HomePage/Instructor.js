import React from 'react';
import HighlighText from '../HighlighText';
import CTAButton from '../../CTAButton';
import { FaArrowRight } from "react-icons/fa";

export default function Instructor() {
  return (
    <div className='mt-10 sm:mt-12 lg:mt-15'>
    <div className='flex flex-col lg:flex-row gap-8 lg:gap-20 items-center'>
     <div className='w-full lg:w-[50%]'>
      <img src="https://github.com/The-StudyNotion/StudyNotion-V1/blob/main/Client/src/Asset/Image/Instructor.png?raw=true" alt='Instructor' className='shadow-white w-full object-cover rounded-lg'/>

     </div>
     <div className='w-full lg:w-[50%] flex flex-col gap-6 sm:gap-8 lg:gap-10 px-2 lg:px-0'>  
     <p className='text-2xl sm:text-3xl lg:text-4xl font-semibold w-full lg:w-[70%]'>Become an <HighlighText text={"Instructor"}/></p>
     <p className='font-medium text-sm sm:text-base lg:text-[16px] w-full lg:w-[80%] text-richblack-300'>Grateful to my instructor at StudyNotion for their invaluable guidance and support in my learning journey.</p>
     <div className='w-fit'>
      <CTAButton active={true} linkto={"/signup"}>
      <div className='flex flex-row gap-2 items-center'>
        Start Teaching Today
        <FaArrowRight/>
      </div>
      </CTAButton>
      </div>
      
     </div>


    </div>


    </div>
  )
}
