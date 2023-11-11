import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

import { userLogout } from '../../redux/user/userSlice';

function UserAvatar() {
  const userInfo = JSON.parse(localStorage.getItem('user'));

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
          <DropdownItem key="dashboard" as={Link} to="/dashboard">
            Dashboard
          </DropdownItem>
          <DropdownItem key="datasets" as={Link} to="/dashboard/datasets">
            Datasets
          </DropdownItem>
          <DropdownItem
            key="visualizations"
            as={Link}
            to="/dashboard/visualizations"
          >
            Visualizations
          </DropdownItem>
          <DropdownItem key="analytics" as={Link} to="/dashboard/analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="settings" as={Link} to="/dashboard/#">
            Settings
          </DropdownItem>
          <DropdownItem key="help_and_feedback" as={Link} to="#">
            Help & Feedback
          </DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default UserAvatar;
