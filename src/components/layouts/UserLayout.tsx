import GuestNavBar from '../shared/GuestNavBar';
import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { UserSidebar } from '../shared/sidebars/UserSidebar';

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
        </>
    );
};

export default UserLayout;