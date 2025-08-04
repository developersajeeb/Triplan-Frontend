import React from 'react';
import { Outlet } from 'react-router';

const AdminLayout = () => {
    return (
        <>
            Admin layouts
            <Outlet />
        </>
    );
};

export default AdminLayout;