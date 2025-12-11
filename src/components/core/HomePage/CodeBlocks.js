import React from 'react';
import CTAButton from '../../CTAButton';
import HighlighText from '../HighlighText';
import {FaArrowRight} from "react-icons/fa";
import {TypeAnimation} from "react-type-animation";


export default function CodeBlocks({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, codeColor }) {
    return (
      <div className={`flex flex-col sm:flex-col lg:flex-row ${position} my-8 sm:my-12 lg:my-20 justify-center gap-4 sm:gap-6 lg:gap-10 w-full`}>
        {/* Section 1 */}
        <div className='w-full lg:w-[50%] flex flex-col gap-3 sm:gap-4 lg:gap-8'>
          <div className='text-base sm:text-lg lg:text-2xl font-semibold'>{heading}</div>
          <div className='text-richblack-300 font-bold text-xs sm:text-sm lg:text-base'>
            {subheading}
          </div>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-7 mt-3 sm:mt-4 lg:mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
              <div className='flex gap-2 items-center text-xs sm:text-sm lg:text-base'>
                {ctabtn1.btnText}
              </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              <div className='text-xs sm:text-sm lg:text-base'>{ctabtn2.btnText}</div>
            </CTAButton>
          </div>
        </div>
        
        {/* Section 2: Code Block */}
        <div className='h-fit flex flex-row text-10px w-full lg:w-[50%] py-2 sm:py-3 lg:py-4 overflow-x-auto'>
            <div className='text-center flex flex-col w-[12%] sm:w-[10%] text-richblack-400 font-inter font-bold text-xs flex-shrink-0'>

                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
                <p>15</p>
                
            </div>
            <div className={`flex flex-col w-[88%] sm:w-[90%] font-bold font-mono ${codeColor} bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 p-2 sm:p-3 lg:p-6 rounded-lg shadow-lg text-[10px] sm:text-xs lg:text-sm overflow-x-auto`}>
            <TypeAnimation 
  sequence={[codeblock, 5000, ""]} 
  repeat={Infinity} 
  style={{ display: "block", whiteSpace: "pre-wrap", wordBreak: "break-word" }}

/>

            </div>

        </div>
        
      </div>
    );
  }
  
