import { Bell, Search, X } from "lucide-react";

import { useGlobalSearch } from "@/store/useGlobalSearch";

export default function Header() {
    const search = useGlobalSearch(
        (state) => state.search
    );

    const setSearch = useGlobalSearch(
        (state) => state.setSearch
    );

    const clearSearch = useGlobalSearch(
        (state) => state.clearSearch
    );

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 shadow-sm sm:px-6">

            <div className="ml-14 flex min-w-0 flex-1 items-center md:ml-0">

                <div className="relative w-full max-w-xl">

                    <Search
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        placeholder="Search patients, appointments..."
                        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-10 text-sm outline-none focus:border-blue-500 focus:bg-white"
                    />

                    {search.length > 0 && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
                        >
                            <X size={17} />
                        </button>
                    )}

                </div>

            </div>

            <div className="flex items-center gap-3">

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                >
                    <Bell size={20} />
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    A
                </div>

            </div>

        </header>
    );
}