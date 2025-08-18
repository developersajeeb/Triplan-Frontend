import Logo from '../../assets/triPlan-logo.svg';
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
import headerBg from '../../assets/images/line-pattern.png'
import { Link } from "react-router";
import WhiteSvgIcon from "./WhiteSvgIcon";
import { TiLocationOutline } from 'react-icons/ti';
import { IoTimeOutline } from 'react-icons/io5';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { authApi, useLogoutMutation, useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { TbLayoutDashboard } from "react-icons/tb";
import { useAppDispatch } from '@/redux/hook';
import { role } from '@/constants/role';

const navigationLinks = [
  { href: "/", label: "Home", submenu: false, type: "", items: [] },
  { href: "/about-us", label: "About Us", submenu: false, type: "", items: [] },
  { href: "/our-services", label: "Our Services", submenu: false, type: "", items: [] },
  { href: "/tours", label: "Tours", submenu: false, type: "", items: [] },
  { href: "/destinations", label: "Destinations", submenu: false, type: "", items: [] },
  { href: "/tour-guider", label: "Tour Guider", submenu: false, type: "", items: [] },
  { href: "/blog", label: "Blog", submenu: false, type: "", items: [] },
]

export default function GuestNavBar() {
  const { data } = useUserInfoQuery(undefined);
  const [isShowStickyHeader, setShowStickyHeader] = useState<boolean>(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

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
        <div className='tp-container py-2 flex justify-between gap-2 items-center'>
          <div className='flex items-center gap-4'>
            <p className='flex items-center gap-1 text-sm font-semibold text-gray-600'><TiLocationOutline size={20} /> 123, Street, New York</p>
            <span className='w-[2px] h-3 bg-gray-400 block'></span>
            <p className='flex items-center gap-1 text-sm font-semibold text-gray-600'><IoTimeOutline size={20} /> Sun to Friday: 8.00 am - 7.00 pm, Austria</p>
          </div>

          <div className='flex items-center gap-4'>
            {data?.data?.email && (
              <>
                <Link to={`${data?.data?.role === role.user && '/user' || data?.data?.role === role.superAdmin && '/admin'}`} className='flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-500 duration-300'><TbLayoutDashboard size={16} /> My Dashboard</Link>
                <span className='w-[2px] h-3 bg-gray-400 block'></span>
                <button className='flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-white hover:bg-primary-500 hover:border-primary-500 border border-primary-600 px-3 py-1 rounded-full duration-300' onClick={handleLogout}>Log Out <IoMdLogOut size={16} /></button>
              </>

            )}
            {!data?.data?.email && (
              <>
                <Link to='/login' className='flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-500 duration-300'><IoMdLogIn size={20} /> Login</Link>
                <span className='w-[2px] h-3 bg-gray-400 block'></span>
                <Link to='/registration' className='flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-500 duration-300'><AiOutlineUserAdd size={20} /> Registration</Link>
              </>
            )}
          </div>
        </div>
      </section>
      <header
        className={`z-50 w-full bg-white bg-cover bg-no-repeat bg-center transition-all duration-500 ease-in-out ${isShowStickyHeader ? "fixed top-0 shadow-md animate-slideDown" : "relative"}`}
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className={`flex items-center justify-between gap-4 tp-container ${isShowStickyHeader ? "py-3" : "py-4"}`}>
          {/* Left side */}
          <div className="flex items-center gap-2 w-full">
            {/* Mobile menu trigger */}
            <Popover>
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
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        {/* {link.submenu ? (
                        <>
                          <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                            {link.label}
                          </div>
                          <ul>
                            {link.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink
                                  href={item.href}
                                  className="py-1.5"
                                >
                                  {item.label}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                      )} */}
                        {/* <NavigationMenuLink href={link.href} className="">
                        {link.label}
                      </NavigationMenuLink> */}
                        <Link to={link.href} className='py-1.5 text-base font-semibold text-gray-700 hover:text-primary-600'>
                          {link.label}
                        </Link>
                        {/* {index < navigationLinks.length - 1 &&
                        // Show separator if:
                        // 1. One is submenu and one is simple link OR
                        // 2. Both are submenus but with different types
                        ((!link.submenu &&
                          navigationLinks[index + 1].submenu) ||
                          (link.submenu &&
                            !navigationLinks[index + 1].submenu) ||
                          (link.submenu &&
                            navigationLinks[index + 1].submenu &&
                            link.type !== navigationLinks[index + 1].type)) && (
                          <div 
                            role="separator"
                            aria-orientation="horizontal"
                            className="bg-border -mx-1 my-1 h-px w-full"
                          />
                        )} */}
                      </NavigationMenuItem>
                    ))}
                    <Link to='/login' className='flex items-center gap-1 text-base font-semibold text-primary-700 hover:text-primary-500 duration-300'><IoMdLogIn size={20} /> Login</Link>
                    <Link to='/registration' className='flex items-center gap-1 text-base font-semibold text-primary-700 hover:text-primary-500 duration-300'><AiOutlineUserAdd size={20} /> Registration</Link>
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
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      {link.submenu ? (
                        // <>
                        //   <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
                        //     {link.label}
                        //   </NavigationMenuTrigger>
                        //   <NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
                        //     <ul
                        //       className={cn(
                        //         link.type === "description"
                        //           ? "min-w-64"
                        //           : "min-w-48"
                        //       )}
                        //     >
                        //       {link.items.map((item, itemIndex) => (
                        //         <li key={itemIndex}>
                        //           <NavigationMenuLink
                        //             href={item.href}
                        //             className="py-1.5"
                        //           >
                        //             Display icon if present
                        //             {link.type === "icon" && "icon" in item && (
                        //               <div className="flex items-center gap-2">
                        //                 {item.icon === "BookOpenIcon" && (
                        //                   <BookOpenIcon
                        //                     size={16}
                        //                     className="text-foreground opacity-60"
                        //                     aria-hidden="true"
                        //                   />
                        //                 )}
                        //                 {item.icon === "LifeBuoyIcon" && (
                        //                   <LifeBuoyIcon
                        //                     size={16}
                        //                     className="text-foreground opacity-60"
                        //                     aria-hidden="true"
                        //                   />
                        //                 )}
                        //                 {item.icon === "InfoIcon" && (
                        //                   <InfoIcon
                        //                     size={16}
                        //                     className="text-foreground opacity-60"
                        //                     aria-hidden="true"
                        //                   />
                        //                 )}
                        //                 <span>{item.label}</span>
                        //               </div>
                        //             )}

                        //             Display label with description if present
                        //             {link.type === "description" &&
                        //               "description" in item ? (
                        //               <div className="space-y-1">
                        //                 <div className="font-medium">
                        //                   {item.label}
                        //                 </div>
                        //                 <p className="text-muted-foreground line-clamp-2 text-xs">
                        //                   {item.description}
                        //                 </p>
                        //               </div>
                        //             ) : (
                        //               // Display simple label if not icon or description type
                        //               !link.type ||
                        //               (link.type !== "icon" &&
                        //                 link.type !== "description" && (
                        //                   <span>{item.label}</span>
                        //                 ))
                        //             )}
                        //           </NavigationMenuLink>
                        //         </li>
                        //       ))}
                        //     </ul>
                        //   </NavigationMenuContent>
                        // </>
                        <></>
                      ) : (
                        <Link to={link.href} className='text-muted-foreground py-1.5 px-2 text-base font-semibold text-gray-700 hover:text-primary-600'>
                          {link.label}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center">
            <Link to={`${data?.data?.email ? `/tours` : `/login`}`} className="tp-primary-btn flex items-center gap-3 !px-5 !py-3 md:!py-4 md:!px-9">
              <span className="whitespace-nowrap">Book Now</span>
              <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}