import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from "../../../services/operation/authApi";
import { useSelector, useDispatch } from 'react-redux';
import SidebarLink from './SidebarLink';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalData = {
    text1: 'Are you sure?',
    text2: 'You will be logged out of your account',
    btn1Text: 'Logout',
    btn2Text: 'Cancel',
    btn1Handler: () => {
      dispatch(logout(navigate));
      setIsModalOpen(false);
    },
    btn2Handler: () => setIsModalOpen(false),
    closeModalHandler: () => setIsModalOpen(false),
  };

  return (
    <div className='bg-richblack-800 fixed md:static bottom-0 md:bottom-auto left-0 right-0 md:left-auto md:right-auto z-10'>
      <div className='flex flex-row md:flex-col w-full md:w-fit md:min-w-[220px] h-fit md:min-h-[calc(100vh-3.5rem)] border-t md:border-t-0 md:border-r border-richblack-700 py-2 md:py-10 overflow-x-auto md:overflow-x-visible'>
        <div className='flex flex-row md:flex-col gap-2 md:gap-0 w-full'>
          {
            sidebarLinks.map((link) => {
              if (link.type && link.type !== user?.accountType) return null;
              return <SidebarLink key={link.id} data={link} />;
            })
          }
        </div>

        <div className='hidden md:block mx-auto my-6 h-[1px] w-10/12 bg-richblack-700'></div>

        <div>
          <SidebarLink
            data={{
              name: 'Setting',
              path: '/dashboard/settings',
              icon: 'VscSettingsGear'
            }}
          />
        </div>

        <div>
          <button
            onClick={() => dispatch(logout(navigate))}
            className='flex gap-x-2 items-center text-xs md:text-sm font-medium px-2 md:px-8 py-2 text-richblack-300 hover:bg-richblack-700 rounded touch-padding whitespace-nowrap'
          >
            <VscSignOut className='text-base md:text-lg flex-shrink-0' />
            <span className='hidden md:block tracking-wider uppercase'>Logout</span>
          </button>
        </div>
      </div>

      {isModalOpen && <ConfirmationModal modalData={modalData} />}
    </div>
  );
};

export default Sidebar;
