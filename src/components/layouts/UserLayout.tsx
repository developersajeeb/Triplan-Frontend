import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { UserSidebar } from '../shared/sidebars/UserSidebar';
import Footer from '../utilities/Footer';
import GuestNavBar from '../utilities/GuestNavBar';

const UserLayout = () => {
    return (
        <>
            <GuestNavBar />
            <div className='tp-container pt-2 pb-8 md:py-8 lg:py-16'>
                <SidebarProvider className='gap-6'>
                    <div className='hidden lg:block sticky top-24 h-fit'><UserSidebar /></div>
                    <SidebarInset className='flex-1'>
                        <Outlet />
                    </SidebarInset>
                </SidebarProvider>
            </div>
            <Footer />
        </>
    );
};

export default UserLayout;