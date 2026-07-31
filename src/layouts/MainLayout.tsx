import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-100 md:flex">
            <Sidebar />

            <main className="min-w-0 flex-1">
                <Header />

                <div className="min-w-0 p-4 pt-20 sm:p-6 md:pt-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}