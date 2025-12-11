import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-Explore';
import HighlighText from '../HighlighText';
import CourseCard from './CourseCard';

const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];


export default function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0]?.courses || []);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0]?.courses[0]?.heading || "");

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.find((course) => course.tag === value);

        if (result) {
            setCourses(result.courses);
            setCurrentCard(result.courses[0]?.heading || "");
        }
        else{
            setCourses([]);
            setCurrentCard([]);
        }
    };

    return (
        <div className="w-full flex flex-col items-center px-2 sm:px-4 py-8 sm:py-10 lg:py-14">
            <div className='text-2xl sm:text-3xl lg:text-4xl text-center font-semibold'>
                Unlock the <HighlighText text={"Power of Code"} />
            </div>
            <p className='text-center text-richblack-300 text-sm sm:text-base lg:text-lg font-bold mt-2 sm:mt-3'>
                Learn to build anything you can imagine
            </p>

      
            <div className='flex flex-wrap justify-center items-center gap-2 sm:gap-3 rounded-full bg-richblack-800 mb-4 sm:mb-5 mt-4 sm:mt-5 px-2 sm:px-3 py-2'>
                {tabsName.map((element, index) => (
                    <div
                        key={index}
                        className={`text-xs sm:text-sm lg:text-[16px] font-semibold px-2 sm:px-3 lg:px-5 py-1 sm:py-2 rounded-full cursor-pointer transition-all duration-200 touch-padding
                        ${currentTab === element ? "bg-richblack-900 text-white shadow-md" : "text-richblack-300 hover:bg-richblack-700 hover:text-white"}`}
                        onClick={() => setMyCards(element)}
                    >
                        {element}
                    </div>
                ))}
            </div>

        <div className='lg:h-[150px] w-full'>
         <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-5 overflow-x-auto pb-2'>
            {
            courses.map((element,index)=>{
             return(
             <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard}/>

             )

            })

            }
         </div>





        </div>

        </div>
    );
}
