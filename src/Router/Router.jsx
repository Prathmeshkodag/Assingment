import React, { lazy,Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';


//  useing lazy load  function for load Component on demand
const UserTable = lazy(() => import('../Components/UserTable/UserTable'));
const UserTab = lazy(() => import('../Components/UserTab/UserTab'))
function UserRouter() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><UserTable /></Suspense>} />
                <Route path="/UserTab" element={<Suspense fallback={<div>Loading...</div>}><UserTab /></Suspense>} />
            </Routes>
        </>
    )
};

export default UserRouter;
