import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlighText from '../components/core/HighlighText';
import CTAButton from '../components/CTAButton';
import Banner from "../assets/images/banner.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLaanguageSection from '../components/core/HomePage/LearningLaanguageSection';
import Instructor from '../components/core/HomePage/Instructor';
import Footer from '../common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../common/ReviewSlider';
export default function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
        <Link to="/signup">
          <div className='group mt-8 sm:mt-12 lg:mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit touch-padding'>
            <div className='flex flex-row items-center gap-2 rounded-full px-4 sm:px-7 lg:px-10 py-2 sm:py-[5px] group-hover:bg-richblack-900 text-sm sm:text-base'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className='text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mt-4 sm:mt-6 lg:mt-7 px-2'>
          Empower Your Future With 
          <HighlighText text={"Coding Skills"} />
        </div>

        <div className='mt-3 sm:mt-4 w-full sm:w-[95%] lg:w-[90%] text-center text-sm sm:text-base lg:text-lg font-bold text-richblack-300 px-2'>
          With our online coding courses, you can learn at your own pace, from anywhere in Your Pyaari Duniya
        </div>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-7 mt-6 sm:mt-8 w-full sm:w-auto px-2'>
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
          <CTAButton active={false} linkto={"/login"}>Book Demo</CTAButton>
        </div>

        <div className='shadow-blue-200 mx-1 sm:mx-3 my-8 sm:my-10 lg:my-12 w-full sm:w-[95%]'>
          <video muted loop autoPlay className="w-full max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-cover rounded-lg shadow-lg shadow-blue-500/50">
            <source src={Banner} />
          </video>
        </div>

        {/* Code Block Section 1 */}
        <div className='w-full flex justify-center gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-4'>
        <CodeBlocks 
  position="lg:flex-row"
  heading={
    <div className='text-xl sm:text-2xl lg:text-4xl font-semibold text-center'>
      Unlock Your 
      {" "}
      <HighlighText text={"Coding Potential"} /> 
      {" "}
      with our online courses
    </div>
  }
  subheading="Master the art of coding with our interactive and structured courses. Whether you're a beginner or a pro, our platform equips you with the skills to innovate, build, and excel in the tech world!"
  ctabtn1={{ btnText: "Try it Yourself", linkto: "/signup", active: true }}
  ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
  codeblock={`<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Welcome to our coding platform. Start your journey today!</p>
  <button onclick="alert('You clicked the button!')">Click Me</button>
</body>
</html>`}
  codeColor="text-richblack-300"
/>

        </div>


        {/* Code Block Section 2 */}
        <div className='w-full flex justify-center gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-4'>
        <CodeBlocks 
  position="lg:flex-row-reverse"
  heading={
    <div className='text-xl sm:text-2xl lg:text-4xl font-semibold text-center'>
      Unlock Your 
      {" "}
      <HighlighText text={"Coding Potential"} /> 
      {" "}
      with our online courses
    </div>
  }
  subheading="Master the art of coding with our interactive and structured courses. Whether you're a beginner or a pro, our platform equips you with the skills to innovate, build, and excel in the tech world!"
  ctabtn1={{ btnText: "Try it Yourself", linkto: "/signup", active: true }}
  ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
  codeblock={`<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Welcome to our coding platform. Start your journey today!</p>
  <button onclick="alert('You clicked the button!')">Click Me</button>
</body>
</html>`}
  codeColor="text-richblack-3008"
/>

        </div>

        <ExploreMore/>
       
      </div>




{/* Section 2 */}
       <div className='bg-pure-greys-5 text-richblack-700'>
  <div className='homepage_bg h-[310px]'>
    <div className='w-11/12 max-w-[70%] flex flex-col items-center justify-between gap-5 mx-auto'>
      <div className='h-[150px]'></div>
      <div className='flex gap-7 text-white'>
        <CTAButton active={true} linkto={"/signup"}>
          <div className='flex gap-3 items-center'>
            Explore Full Catalog
            <FaArrowRight />
          </div>
        </CTAButton>

        <CTAButton active={false} linkto={"/signup"}>
          <div>
            Learn more
          </div>
        </CTAButton>
      </div>
    </div>
  </div>

  <div className='mx-auto w-11/12 max-w-[70%] flex flex-col items-center justify-between gap-7'>
    <div className='flex flex-row items-start w-full gap-5 mb-10 mt-[95px]'>
      <div className='text-4xl font-semibold'>
        Get the Skills you need for a <HighlighText text={"Job that is in demand"} />
      </div>

      <div className='flex flex-col gap-10 w-full items-start'>
        <p className='text-[16px]'>The Modern StudyNotion is the dictated its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
        <CTAButton active={true} linkto={"/signup"}>
          <div>
            Learn More
          </div>
        </CTAButton>
      </div>
    </div>
    <TimelineSection/>
<LearningLaanguageSection/>
  </div>
       </div>

{/* Section 3*/}

       <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between bg-richblack-900 text-white'>

<Instructor/>
<h2 className='text-center text-4xl front-semibold'>Review from Other Learners</h2>
<ReviewSlider/>









        </div>


  {/* Footer Section*/}
<Footer/>



    </div>
  );
}