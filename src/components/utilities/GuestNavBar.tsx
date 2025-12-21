import Logo from '@/assets/triPlan-logo.svg';
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import headerBg from '@/assets/images/line-pattern.png'
import { Link, useLocation } from "react-router";
import { TiLocationOutline } from 'react-icons/ti';
import { IoTimeOutline } from 'react-icons/io5';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import { authApi, useLogoutMutation } from '@/redux/features/auth/auth.api';
import { TbLayoutDashboard } from "react-icons/tb";
import { useAppDispatch } from '@/redux/hook';
import { role } from '@/constants/role';
import WhiteSvgIcon from '../shared/blocks/WhiteSvgIcon';
import { getSidebarMenus } from '@/utils/getSidebarMenus';
import { Skeleton } from '../ui/skeleton';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useUserInfoQuery } from '@/redux/features/user/user.api';

const navigationLinks = [
  { url: "/", label: "Home", submenu: false, type: "", items: [] },
  { url: "/about-us", label: "About Us", submenu: false, type: "", items: [] },
  { url: "/tours", label: "Tours", submenu: false, type: "", items: [] },
  { url: "/destinations", label: "Destinations", submenu: false, type: "", items: [] },
  { url: "/tour-guide", label: "Tour Guide", submenu: false, type: "", items: [] },
  { url: "/blog", label: "Blog", submenu: false, type: "", items: [] },
  { url: "/contact-us", label: "Contact Us", submenu: false, type: "", items: [] },
]

const userMenuItems = {
  navMain: getSidebarMenus("USER"),
}

export default function GuestNavBar() {
  const location = useLocation();
  const { data: userData, isLoading: isMenuLoading } = useUserInfoQuery(undefined);
  const [isShowStickyHeader, setShowStickyHeader] = useState<boolean>(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isShowStickyHeader]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowStickyHeader(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <>
      <section className='bg-white border-b border-gray-200 hidden lg:block'>
        <div className='tp-big-container py-2 flex justify-between gap-2 items-center'>
          <div className='flex items-center gap-4'>
            <p className='flex items-center gap-1 text-sm font-semibold text-gray-600'><TiLocationOutline size={20} /> 123, Street, New York</p>
            <span className='w-[2px] h-3 bg-gray-400 block'></span>
            <p className='flex items-center gap-1 text-sm font-semibold text-gray-600'><IoTimeOutline size={20} /> Sun to Friday: 8.00 am - 7.00 pm, Austria</p>
          </div>

          <div className='flex items-center gap-4'>
            {userData?.data?.email && (
              <>
                <Link to={`${userData?.data?.role === role.user && '/user' || userData?.data?.role === role.superAdmin && '/admin'}`} className='flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-500 duration-300'><TbLayoutDashboard size={16} /> My Dashboard</Link>
                <span className='w-[2px] h-3 bg-gray-400 block'></span>
                <button className='flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-white hover:bg-primary-500 hover:border-primary-500 border border-primary-600 px-3 py-1 rounded-full duration-300' onClick={handleLogout}>Log Out <IoMdLogOut size={16} /></button>
              </>

            )}
            {!userData?.data?.email && (
              <>
                <Link to='/login' className='flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-500 duration-300'><IoMdLogIn size={20} /> Login</Link>
                <span className='w-[2px] h-3 bg-gray-400 block'></span>
                <Link to='/registration' className='flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-500 duration-300'><AiOutlineUserAdd size={20} /> Registration</Link>
              </>
            )}
          </div>
        </div>
      </section>
      {isShowStickyHeader && <div style={{ height: headerHeight }}></div>}
      <header
        ref={headerRef}
        className={`z-50 w-full bg-white bg-cover bg-no-repeat bg-center transition-all duration-500 ease-in-out ${isShowStickyHeader ? "fixed top-0 shadow-md animate-slideDown" : "relative"}`}
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className={`flex items-center justify-between gap-4 tp-big-container ${isShowStickyHeader ? "py-3" : "py-4"}`}>
          {/* Left side */}
          <div className="flex items-center gap-2 w-full">
            {/* Mobile menu trigger */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="group size-14 lg:hidden max-w-8 min-w-8 h-8 bg-gray-100"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              {/* Mobile menu start */}
              <PopoverContent align="start" className="w-64 p-4 lg:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-3">
                    {navigationLinks.map((link, index) => {
                      const isActive = location?.pathname === link?.url;
                      return (
                        <NavigationMenuItem key={index} className="w-full">
                          <Link to={link.url}
                            onClick={() => setOpen(false)}
                            className={`${isActive ? "text-primary-600" : "text-gray-700"} font-medium duration-300 transition-all hover:text-primary-600`}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuItem>
                      )
                    })}
                    {isMenuLoading ? (
                      <div className="space-y-2 w-full">
                        {[1, 2, 3, 4].map((i) => (
                          <Skeleton key={i} className="h-2 w-full" />
                        ))}
                      </div>) : (
                      <>
                        {
                          userData?.data?.email && userData?.data?.role === role.user &&
                          userMenuItems.navMain.map((group, groupIndex) => (
                            group.items.map((item, itemIndex) => {
                              const isActive = location.pathname === item.url;
                              return (
                                <NavigationMenuItem key={`${groupIndex}-${itemIndex}`} className="w-full">
                                  <Link
                                    onClick={() => setOpen(false)}
                                    to={item.url}
                                    className={`${isActive ? "text-primary-600" : "text-gray-700"} duration-300 transition-all hover:text-primary-600`}
                                  >
                                    {item.title}
                                  </Link>
                                </NavigationMenuItem>
                              )
                            })
                          ))
                        }
                      </>
                    )}
                    {userData?.data?.email ? (
                      <p className="flex items-center gap-1 text-base font-semibold text-primary-700 hover:text-primary-500 duration-300" onClick={handleLogout}><RiLogoutCircleLine size={18} /> <span>Logout</span></p>
                    ) : (
                      <>
                        <Link to='/login' className='flex items-center gap-1 text-base font-semibold text-primary-700 hover:text-primary-500 duration-300'><IoMdLogIn size={20} /> Login</Link>
                        <Link to='/registration' className='flex items-center gap-1 text-base font-semibold text-primary-700 hover:text-primary-500 duration-300'><AiOutlineUserAdd size={20} /> Registration</Link>
                      </>
                    )}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
              {/* Mobile menu end */}
            </Popover>

            {/* Main nav */}
            <div className="flex items-center gap-6 flex-1 w-full">
              <Link to="/" className={`w-full inline-block ${isShowStickyHeader ? "max-w-[150px]" : "max-w-[150px] md:max-w-[160px] xl:max-w-[200px]"}`}>
                <img src={Logo} alt="logo" />
              </Link>
              {/* Navigation menu */}
              <NavigationMenu viewport={false} className="max-lg:hidden w-full max-w-full">
                <NavigationMenuList className="gap-2 xl:gap-6">
                  {navigationLinks.map((link, index) => {
                    const isActive = location.pathname === link.url;

                    return (
                      <NavigationMenuItem key={index}>
                        <Link to={link.url} className={`${isActive ? "text-primary-500" : "text-gray-700"} text-muted-foreground py-1.5 px-2 text-base font-semibold hover:text-primary-500`}>
                          {link.label}
                        </Link>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center">
            <Link to={`${userData?.data?.email ? `/tours` : `/login`}`} className="tp-primary-btn flex items-center gap-3 !px-5 !py-3 md:!py-4 md:!px-9">
              <span className="whitespace-nowrap">Book Now</span>
              <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}