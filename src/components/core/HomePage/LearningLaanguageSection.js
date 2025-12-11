import React from 'react';
import HighlighText from '../HighlighText';
import CTAButton from '../../CTAButton';

export default function LearningLaanguageSection() {
  return (
    <div>
    <div className='flex flex-col gap-4 sm:gap-5 mt-16 sm:mt-24 lg:mt-[150px] items-center mb-16 sm:mb-24 lg:mb-32 px-2'>
     <p className='text-center font-semibold text-2xl sm:text-3xl lg:text-4xl'>Your Swiss Knife for <HighlighText text={"learning any language"}/></p>
   <div className='text-center text-richblack-600 mx-auto text-xs sm:text-sm lg:text-base w-full sm:w-[85%] lg:w-[70%]'>
   Continuously expanding my skills with StudyNotion, mastering development, problem-solving, and industry-relevant technologies.

   </div>

   <div className='flex flex-col sm:flex-row items-center justify-center mt-3 sm:mt-4 lg:mt-5 gap-4 sm:gap-0 w-full overflow-x-auto'>
   <img src="https://raw.githubusercontent.com/The-StudyNotion/StudyNotion-V1/388c11b1a011ccba6124bccb72ea68bd5bfd2199/Client/src/Asset/Image/Know_your_progress.svg" alt='Know Progress' className='object-contain sm:-mr-16 lg:-mr-32 h-32 sm:h-40 lg:h-auto flex-shrink-0'/>
   <img src="https://raw.githubusercontent.com/The-StudyNotion/StudyNotion-V1/388c11b1a011ccba6124bccb72ea68bd5bfd2199/Client/src/Asset/Image/Compare_with_others.svg" alt='Compare' className='object-contain h-32 sm:h-40 lg:h-auto flex-shrink-0'/>
   <img src="https://raw.githubusercontent.com/The-StudyNotion/StudyNotion-V1/388c11b1a011ccba6124bccb72ea68bd5bfd2199/Client/src/Asset/Image/Plan_your_lessons.svg" alt='Plan Lessons' className='object-contain sm:-ml-16 lg:-ml-36 h-32 sm:h-40 lg:h-auto flex-shrink-0'/>


   </div>
<div className='w-fit'>
   <CTAButton active={true} linkto={"/signup"}>
<div className='text-xs sm:text-sm lg:text-base'>
    Learn More
</div>
   </CTAButton>
   </div>

    </div>





    </div>
  )
}
