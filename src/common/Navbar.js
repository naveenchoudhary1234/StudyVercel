import logo from "../assets/logo/Logo-Full-Light.png";
import { NavbarLinks } from "../data/NavbarLink";
import { logout } from "../services/operation/authApi";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { ACCOUNT_TYPE } from "../utils/constants";
import ProfileDropdown from "../components/core/auth/profileDropDown";
import HamburgerMenu from "./HamburgerMenu";
import { FaCode } from 'react-icons/fa'
import { useEffect, useState } from "react";

import {
  AiOutlineContacts,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCategory, BiDetail } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { VscDashboard, VscSignIn, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";


function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading2, setLoading2] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        console.log(res);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

 
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 md:h-16 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200 px-2 md:px-0`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between gap-2 md:gap-4">
        
        <Link to="/">
          <img src={logo} alt="Logo" width={140} height={28} loading="lazy" className="sm:w-[160px] sm:h-[32px]" />
        </Link>
        
        <nav className="hidden md:block flex-1">
          <ul className="flex gap-x-4 lg:gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p className="uppercase tracking-wider text-sm lg:text-base">{link.title}</p>
                      <BsChevronDown className="text-xs lg:text-sm" />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[150px] sm:w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-3 sm:p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading || !subLinks ? (
                          <p className="text-center text-xs sm:text-sm">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-2 sm:py-4 pl-2 sm:pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p className="uppercase tracking-wider text-xs sm:text-sm">
                                    {subLink.name}
                                  </p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center text-xs sm:text-sm">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      } uppercase tracking-wider text-sm lg:text-base`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
    
        <div className="hidden items-center gap-2 sm:gap-3 md:gap-x-4 md:flex">
  {token !== null && (
    <Link to="/voice">
     <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-richblack-700 bg-richblack-800 text-richblack-100 text-xs sm:text-sm hover:text-yellow-100 hover:rotate-90 transition-transform duration-300 touch-padding">
  AI
</button>

    </Link>
  )}
{token !== null && (
  <Link to="/compiler">
    <button className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-richblack-700 bg-richblack-800 text-richblack-100 hover:text-yellow-100 hover:rotate-90 hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl touch-padding">
      <FaCode className="text-lg sm:text-xl" />  
    </button>
  </Link>
)}

  {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
    <Link to="/dashboard/cart" className="relative">
      <AiOutlineShoppingCart className="text-xl sm:text-2xl text-richblack-100" />
      {totalItems > 0 && (
        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
          {totalItems}
        </span>
      )}
    </Link>
  )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-[6px] sm:rounded-[8px] border border-richblack-700 bg-richblack-800 px-2 sm:px-[12px] py-1.5 sm:py-[8px] text-richblack-100 text-xs sm:text-sm uppercase touch-padding">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[6px] sm:rounded-[8px] border border-richblack-700 bg-richblack-800 px-2 sm:px-[12px] py-1.5 sm:py-[8px] text-richblack-100 text-xs sm:text-sm uppercase touch-padding">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
       
        </div>
        <div className="mr-2 md:hidden">
          <GiHamburgerMenu
            onClick={() => setIsMenuModalOpen((prev) => !prev)}
            className={` fill-richblack-100 `}
            fontSize={24}
          />

          <HamburgerMenu
            isMenuModalOpen={isMenuModalOpen}
            setIsMenuModalOpen={setIsMenuModalOpen}
          >
            <div className="flex flex-col gap-y-1 sm:gap-y-2 py-3 sm:py-5 px-3 sm:px-5 max-h-[80vh] overflow-y-auto">
              {(loading || loading2) && (
                <div className="text-white font-bold text-sm">Loading ...</div>
              )}

              {token === null && (
                <Link to={"/login"} onClick={() => setIsMenuModalOpen(false)}>
                  <div className="flex gap-x-2 items-center w-full py-2 px-2 sm:px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider text-xs sm:text-sm rounded touch-padding">
                    <VscSignIn className="text-base sm:text-lg flex-shrink-0" />
                    Log In
                  </div>
                </Link>
              )}

              

              {token === null && (
                <Link to={"/signup"} onClick={() => setIsMenuModalOpen(false)}>
                  <div className="flex gap-x-2 items-center w-full py-2 px-2 sm:px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider text-xs sm:text-sm rounded touch-padding">
                    <AiOutlineLogin className="text-base sm:text-lg flex-shrink-0" />
                    Sign Up
                  </div>
                </Link>
              )}

              {token !== null && (
                <Link to={"/compiler"} onClick={() => setIsMenuModalOpen(false)}>
                  <div className="flex gap-x-2 items-center w-full py-2 px-2 sm:px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider text-xs sm:text-sm rounded touch-padding">
                    <FaCode className="text-base sm:text-lg flex-shrink-0" />
                    Compiler
                  </div>
                </Link>
              )}

              {token !== null && (
                <Link to={"/voice"} onClick={() => setIsMenuModalOpen(false)}>
                  <div className="flex gap-x-2 items-center w-full py-2 px-2 sm:px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider text-xs sm:text-sm rounded touch-padding">
                    <AiOutlineContacts className="text-base sm:text-lg flex-shrink-0" />
                    AI Voice
                  </div>
                </Link>
              )}

              {token !== null && (
                <div
                  className="flex gap-x-2 items-center w-full py-2 px-2 sm:px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 cursor-pointer uppercase tracking-wider text-xs sm:text-sm rounded touch-padding"
                  onClick={() => dispatch(logout(navigate))}
                >
                  <VscSignOut className="text-base sm:text-lg flex-shrink-0" />
                  Log Out
                </div>
              )}

          
              <div className="h-[1px] my-2 bg-richblack-100 w-3/4 mx-auto"></div>

              <Link to={"/"} onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex gap-x-2 items-center w-full py-2 px-2 sm:px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider text-xs sm:text-sm rounded touch-padding">
                  <AiOutlineHome className="text-base sm:text-lg flex-shrink-0" />
                  Home
                </div>
              </Link>

              <Link to={"/about"} onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex gap-x-2 items-center w-full py-2 px-2 sm:px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider text-xs sm:text-sm rounded touch-padding">
                  <BiDetail className="text-base sm:text-lg flex-shrink-0" />
                  About
                </div>
              </Link>

              <Link to={"/contact"} onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex gap-x-2 items-center w-full py-2 px-2 sm:px-3 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700 uppercase tracking-wider text-xs sm:text-sm rounded touch-padding">
                  <AiOutlineContacts className="text-base sm:text-lg flex-shrink-0" />
                  Contact
                </div>
              </Link>
         

              {/* Category */}
              <div
                className=""
                onClick={() => setCategoryOpen((prev) => !prev)}
              >
                <details>
                  <summary className="flex gap-x-2 items-center w-full py-2 px-2 sm:px-3 text-richblack-100 uppercase tracking-wider text-xs sm:text-sm rounded touch-padding">
                    <BiCategory className="text-base sm:text-lg flex-shrink-0" />
                    Category
                    {categoryOpen ? (
                      <SlArrowUp className="translate-y-[1px] ml-auto mr-1 flex-shrink-0" />
                    ) : (
                      <SlArrowDown className="translate-y-[1px] ml-auto mr-1 flex-shrink-0" />
                    )}
                  </summary>

                  <div className="px-2 sm:px-4 text-richblack-700">
                    {subLinks.length ? (
                      <div className="flex flex-col capitalize ">
                        {subLinks.map((subLink, index) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={index}
                            onClick={() => setIsMenuModalOpen(false)}
                          >
                            <p className=" rounded-lg py-2 pl-2 sm:pl-4 uppercase tracking-wider text-xs">
                              {subLink.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg py-2 pl-2 sm:pl-4 select-none cursor-not-allowed text-xs">
                        No Catalog Available
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>

           
          </HamburgerMenu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;