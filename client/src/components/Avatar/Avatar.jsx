import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

import { userLogout } from '../../redux/user/userSlice';

function UserAvatar() {
  const userInfo = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform bg-white text-blue-900/90 ring-blue-900/90"
            color="primary"
            fallback={
              <Avatar
                color="primary"
                src="/user-icon.png"
                className="transition-transform bg-white text-blue-900/90 ring-blue-900/90"
                size="sm"
              />
            }
            showFallback={true}
            size="sm"
            src={userInfo && userInfo.profile.avatar}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">@{userInfo.username}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default UserAvatar;
