import { Bell, Moon, Search } from "lucide-react";

export default function Header() {
    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
                <Search className="text-gray-500" />
                <input
                    placeholder="Search..."
                    className="outline-none"
                />
            </div>

            <div className="flex items-center gap-6">
                <Bell className="cursor-pointer" />
                <Moon className="cursor-pointer" />

                <img
                    src="https://i.pravatar.cc/40"
                    className="rounded-full"
                    alt="profile"
                />
            </div>
        </header>
    );
}