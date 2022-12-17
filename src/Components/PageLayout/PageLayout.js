import React from 'react'

import { Outlet, Navigate } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';

export const PageLayout = ({ email, onLogout }) => {
    if (!email) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <Navigation onLogout={onLogout} />
            Hello
            <Outlet />
        </div>
    );
};

