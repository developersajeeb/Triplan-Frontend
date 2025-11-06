import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { UserSidebar } from '../shared/sidebars/UserSidebar';
import Footer from '../utilities/Footer';
import GuestNavBar from '../utilities/GuestNavBar';

const UserLayout = () => {
    return (
        <>
            <GuestNavBar />
            <div className='max-w-[1320px] mx-auto py-16'>
                <SidebarProvider>
                    <UserSidebar />
                    <SidebarInset>
                        <Outlet />
                    </SidebarInset>
                </SidebarProvider>
            </div>
            <Footer />
        </>
    );
};

export default UserLayout;