import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as NextUILink,
  Button,
} from '@nextui-org/react';
import { Github } from 'lucide-react';
import UserAvatar from '../Avatar';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { loading } = useSelector((state) => state.auth);
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  const menuItems = ['About', 'Vision', 'Product'];

  return (
    <>
      <NextUINavbar
        isBordered
        isBlurred={false}
        position="static"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
      >
        {/* Mobile Menu */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          {/* Logo */}
          <NavbarBrand>
            <Link className="flex items-center" to="/">
              <img className="h-40" alt="" src="/default.svg" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Mobile Logo */}
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link className="flex items-center" to="/">
              <img className="h-40" alt="" src="/default.svg" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-5" justify="center">
          <NavbarItem>
            <NextUILink color="foreground" href="/#1">
              About
            </NextUILink>
          </NavbarItem>
          <NavbarItem>
            <NextUILink color="foreground" href="/#2">
              Vision
            </NextUILink>
          </NavbarItem>
          <NavbarItem>
            <NextUILink color="foreground" href="/#3">
              Product
            </NextUILink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {user && !loading ? (
            <>
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
              <UserAvatar />
            </>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link to="/login">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  to="/register"
                  variant="shadow"
                  className="bg-blue-900/90 hover:bg-blue-900/80 shadow-blue-900/40 shadow-md"
                  radius="full"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        {/* Mobile Menu dropdown links */}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextUILink
                className="w-full"
                color="foreground"
                href="#"
                size="lg"
              >
                {item}
              </NextUILink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextUINavbar>
      <Outlet />
    </>
  );
}
