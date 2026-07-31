import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { navigation } from "@/lib/navigation";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile hamburger */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`fixed left-4 top-3 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg transition-opacity md:hidden ${isOpen
                    ? "pointer-events-none opacity-0"
                    : "opacity-100"
                    }`}
                aria-label="Open sidebar"
            >
                <Menu size={22} />
            </button>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${isOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-[60] flex h-dvh w-72 flex-col border-r border-slate-700 bg-slate-900 text-white shadow-2xl transition-transform duration-300 ease-in-out md:sticky md:top-0 md:z-30 md:h-screen md:translate-x-0 md:shadow-none ${isOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-700 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold">
                            H
                        </div>

                        <div>
                            <h1 className="text-lg font-bold">
                                Hospital HMS
                            </h1>

                            <p className="text-xs text-slate-400">
                                Management System
                            </p>
                        </div>
                    </div>

                    {/* Mobile close button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white md:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={21} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Main Menu
                    </p>

                    <div className="space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        }`
                                    }
                                >
                                    <Icon
                                        size={20}
                                        className="shrink-0"
                                    />

                                    <span className="truncate">
                                        {item.title}
                                    </span>
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>

                {/* Administrator */}
                <div className="shrink-0 border-t border-slate-700 p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold">
                            A
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                                Administrator
                            </p>

                            <p className="truncate text-xs text-slate-400">
                                admin@hospital.com
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

