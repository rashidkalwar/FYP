import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import {
  Navbar,
  NavbarContent,
  Input,
  Button,
  Divider,
} from '@nextui-org/react';
import {
  Search,
  LayoutDashboard,
  FileText,
  CandlestickChart,
  TrendingUp,
  Settings,
  Bell,
  Github,
} from 'lucide-react';

import UserAvatar from '../Avatar/Avatar';

const SidebarLinks = [
  {
    key: 'dashboard',
    text: 'Dashboard',
    color: 'primary',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    key: 'datasets',
    text: 'Datasets',
    color: 'secondary',
    href: '/dashboard/datasets',
    icon: FileText,
  },
  {
    key: 'visualizations',
    text: 'Visualizations',
    color: 'success',
    href: '/dashboard/visualizations',
    icon: CandlestickChart,
  },
  {
    key: 'analytics',
    text: 'Analytics',
    color: 'warning',
    href: '/dashboard/analytics',
    icon: TrendingUp,
  },
  {
    key: 'settings',
    text: 'Settings',
    color: 'default',
    href: '#nothing',
    icon: Settings,
  },
];

function DashboardNavbar() {
  const location = useLocation();
  const [selected, setSelected] = React.useState(location.pathname);

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  if (!user) {
    // Save the current location they were trying to go to when they were redirected.
    // This allows us to send them along to that page after they login.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div className="flex w-auto">
      {/* Sidebar start */}
      <Navbar
        isBlurred={false}
        height="100%"
        maxWidth="full"
        as="div"
        className="bg-[#081A51] text-white h-screen w-full max-w-[300px]"
        classNames={{
          base: 'justify-normal items-start',
          wrapper: 'px-0 flex justify-normal item-start h-auto',
        }}
      >
        <div className="px-1 md:px-2 w-full border-default-200 flex flex-col items-start">
          <Link
            className="flex items-center md:p-4 mx-auto md:mx-0 py-3 md:mb-12"
            to="/"
          >
            <span className="bg-white text-blue-900/90 font-serif h-10 w-10 text-4xl font-bold flex justify-center items-center md:mr-2 rounded-full">
              G
            </span>
            <p className="text-xl font-bold text-inherit hidden md:flex">
              Graphit
            </p>
          </Link>

          <span className="hidden md:flex text-xs text-blue-400 font-medium md:ml-6">
            Main menu
          </span>

          <nav className="w-full space-y-1 mt-2 px-1 md:px-0 lg:px-2">
            {SidebarLinks.map((item) => (
              <Link
                className={`flex items-center justify-center md:justify-start py-2 px-4 ${
                  selected === item.href && 'bg-blue-900/70'
                } hover:bg-blue-900/70 w-full rounded-lg transition-all duration-150`}
                key={item.key}
                to={item.href}
                onClick={() => setSelected(item.href)}
              >
                <span className="w-7 h-7 rounded-lg flex justify-center items-center">
                  <item.icon className="w-6 h-6 md:w-5 md:h-5 stroke-blue-100 group-hover:stroke-rose-0" />
                </span>
                <span className="hidden md:flex md:ml-2 md:text-base">
                  {item.text}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </Navbar>
      {/* Sidebar end */}

      <div className="flex flex-col">
        {/* Navbar start */}
        <Navbar
          className="w-[80vw]"
          classNames={{
            base: 'justify-normal items-start',
            wrapper: 'px-4 justify-normal item-start max-w-full',
          }}
          as="div"
          isBlurred={false}
          // isBordered
        >
          <NavbarContent
            as="div"
            className="items-center justify-normal"
            justify="end"
          >
            <Input
              classNames={{
                base: 'max-w-full sm:max-w-[12rem] h-10',
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper:
                  'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<Search size={18} />}
              type="search"
            />
            <Divider orientation="vertical" className="h-5" />
            <div className="hidden md:flex mr-2">
              <Button
                className="rounded-full min-w-fit group px-3"
                isIcononly
                color="foreground"
                disableRipple
              >
                <Link to="https://github.com/rashidkalwar/FYP">
                  <Github className="h-5 w-5 text-slate-500 group-hover:text-slate-600 transition-all duration-150" />
                </Link>
              </Button>
              <Button
                className="rounded-full min-w-fit group px-3"
                isIcononly
                color="foreground"
                disableRipple
              >
                <Bell className="h-5 w-5 text-slate-500 group-hover:text-slate-600 transition-all duration-150" />
              </Button>
            </div>
            <UserAvatar />
          </NavbarContent>
        </Navbar>
        {/* Navbar end */}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardNavbar;
