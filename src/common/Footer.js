import React from "react";

import { Link } from "react-router-dom";

import { FooterLink2 } from "../data/Footer-Link";

import Logo from "../assets/logo/Logo-Full-Dark.png";


import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start lg:items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-8 sm:py-10 lg:py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-4 sm:pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 lg:border-r lg:border-richblack-700 pl-0 sm:pl-2 lg:pl-3 lg:pr-5 lg:gap-3">
            <div className="w-[100%] sm:w-[48%] lg:w-[30%] flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-7 lg:mb-7 lg:pl-0">
              <img src={Logo} alt="Logo" className="object-contain h-8 sm:h-10 w-auto" />
              <h1 className="text-richblack-50 font-semibold text-[14px] sm:text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-1 sm:gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[12px] sm:text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 sm:gap-3 text-base sm:text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
              <div></div>
            </div>

            <div className="w-[100%] sm:w-[48%] lg:w-[30%] mb-4 sm:mb-7 lg:mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[14px] sm:text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-1 sm:gap-2 mt-1 sm:mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[12px] sm:text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[14px] sm:text-[16px] mt-4 sm:mt-7">
                Support
              </h1>
              <div className="text-[12px] sm:text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-1 sm:mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[100%] sm:w-[48%] lg:w-[30%] mb-4 sm:mb-7 lg:mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[14px] sm:text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-1 sm:gap-2 mt-1 sm:mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[12px] sm:text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-between pl-0 sm:pl-2 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[100%] sm:w-[48%] lg:w-[30%] mb-4 sm:mb-7 lg:mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[14px] sm:text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-1 sm:gap-2 mt-1 sm:mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[12px] sm:text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-8 sm:pb-10 lg:pb-14 text-xs sm:text-sm gap-4 sm:gap-0">
        {/* Section 1 */}
        <div className="flex justify-start sm:justify-between lg:items-start items-start flex-col lg:flex-row gap-2 sm:gap-3 w-full">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-b sm:border-b-0 sm:border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-0 sm:px-2 lg:px-3 py-1 sm:py-0`}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center sm:text-right w-full sm:w-auto">Made By Hindol Roy © 2023 StudyNotion</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
