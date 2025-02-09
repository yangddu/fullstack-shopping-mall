import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const GlobalLayout: React.FC = () => {
    return (
        <div>
            <Suspense fallback={'loading...'}>
                <Outlet/>
            </Suspense>
        </div>
    )
}
export default GlobalLayout
