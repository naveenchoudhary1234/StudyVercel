import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import Footer from "../common/Footer";
import RatingStars from "../common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordingBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../utils/formatDate";
import { fetchCourseDetails } from "../services/operation/courseDetailsApi";
import { BuyCourse } from "../services/operation/studentFeaturesapi";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log("Could not fetch Course Details");
      }
    })();
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!response.success) {
    return <Error />;
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnroled,
    createdAt,
  } = response.data?.courseDetails;

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        {/* Hero Section */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
        <div className="mx-auto box-content px-2 sm:px-4 lg:w-[1260px] relative z-10">
          <div className="mx-auto grid min-h-[300px] sm:min-h-[450px] max-w-maxContentTab justify-items-center py-4 sm:py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[20rem] sm:max-h-[30rem] lg:hidden w-full">
 <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full rounded-lg"
              />
            </div>
            <div className="z-30 my-3 sm:my-5 flex flex-col justify-center gap-2 sm:gap-4 py-3 sm:py-5 text-sm sm:text-lg text-richblack-5 px-2 sm:px-0">
              <div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-richblack-5 lg:text-left text-center tracking-wider">
                  {courseName}
                </p>
              </div>
              <p className="text-richblack-200 text-xs sm:text-base">
                <ul className="list-none p-0">
                  {courseDescription.split("\n").map((line, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mr-1 flex-shrink-0">{index + 1}.</span>
                      <span>{line.trim().substring(line.indexOf(".") + 1).trim()}</span>
                    </li>
                  ))}
                </ul>
              </p>
              <div className="text-xs sm:text-sm flex flex-wrap items-center gap-2 lg:justify-start justify-center">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span className="hidden sm:inline">{`${studentsEnroled.length} students enrolled`}</span>
              </div>
              <div className="text-xs sm:text-sm">
                <p>Created By {`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-5 text-xs sm:text-lg">
                <p className="flex items-center gap-1 sm:gap-2">
                  <BiInfoCircle className="text-sm sm:text-base" /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-1 sm:gap-2">
                  <HiOutlineGlobeAlt className="text-sm sm:text-base" /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:gap-4 border-y border-y-richblack-500 py-3 sm:py-4 lg:hidden px-2 sm:px-0">
              <p className="space-x-3 pb-2 sm:pb-4 text-2xl sm:text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button 
  onClick={handleBuyCourse}
  className="relative bg-red-500 text-white font-bold py-2 sm:py-3 px-6 sm:px-10 font-sans overflow-hidden z-10 group text-sm sm:text-base touch-padding"
>
  <span className="relative z-10 text-white group-hover:text-red-500 transition duration-500">Buy Now</span>
  <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100 z-0"></span>
</button>

<button 
  className="relative bg-gray-800 text-white font-bold py-3 px-10 font-sans overflow-hidden z-10 group"
>
  <span className="relative z-10 text-white group-hover:text-gray-300 transition duration-500">Add to Cart</span>
  <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100 z-0"></span>
</button>


            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block bg-white shadow-lg rounded-lg p-4">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-2 sm:px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px] grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* What will you learn section */}
          <div className="my-6 sm:my-8 border border-richblack-600 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold uppercase tracking-wider">What you'll Learn?</p>
            <div className="mt-3 sm:mt-5">
              <ul className="list-none p-0 leading-relaxed">
                {whatYouWillLearn.split("\n").map((line, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm lg:text-base">
                    <span className="mr-1 flex-shrink-0">{index + 1}.</span>
                    <span>{line.trim().substring(line.indexOf(".") + 1).trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-full sm:max-w-[830px]">
            <div className="flex flex-col gap-2 sm:gap-3">
              <p className="text-xl sm:text-2xl lg:text-[28px] font-semibold uppercase tracking-wider">Course Content</p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-2">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 tracking-wide text-xs sm:text-sm">
                  <span className="whitespace-nowrap">
                    {courseContent.length} section(s)
                  </span>
                  <span className="whitespace-nowrap">
                    {totalNoOfLectures} lecture(s)
                  </span>
                  <span className="whitespace-nowrap">{response.data?.totalDuration}</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25 text-xs sm:text-sm hover:text-yellow-50 transition-all touch-padding"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-2 sm:py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-8 sm:mb-12 py-3 sm:py-4 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md">
              <p className="text-lg sm:text-xl lg:text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-3 sm:gap-4 py-2 sm:py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-10 w-10 sm:h-14 sm:w-14 rounded-full object-cover border-2 border-gray-300 flex-shrink-0"
                />
                <p className="text-lg font-semibold">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-gray-600">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;