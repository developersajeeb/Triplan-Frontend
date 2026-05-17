import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RiSearch2Line } from 'react-icons/ri';
import { GrPowerReset } from 'react-icons/gr';

type Props = {
    search: string;
    category: string;
    sort: string;
    categories: string[];
    onChange: (filters: { search: string; category: string; sort: string }) => void;
};

const BlogFilter: React.FC<Props> = ({ search, category, sort, categories, onChange }) => {
    const [query, setQuery] = useState(search);

    useEffect(() => { setQuery(search); }, [search]);

    const handleSearchSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        onChange({ search: query, category, sort });
    };

    const handleReset = () => {
        setQuery('');
        onChange({ search: '', category: 'all', sort: 'newest' });
    };

    const hasActiveFilters = query.trim() !== '' || (category && category !== 'all') || (sort && sort !== 'newest');

    return (
        <div className="flex flex-wrap justify-between gap-4 items-center">
            {/* Search + Reset */}
            <div className="flex items-center gap-3 flex-wrap">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <div className="relative w-full min-w-[260px] max-w-[340px]">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            className="tp-input w-full !pr-12"
                            placeholder="Search blogs..."
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1"
                        >
                            <RiSearch2Line className="!h-[18px] !w-[18px]" />
                        </Button>
                    </div>
                </form>

                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        type="button"
                        className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[9px] text-red-500 hover:text-white duration-300 rounded-lg"
                    >
                        Reset <span className="ml-1"><GrPowerReset /></span>
                    </button>
                )}
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
                <Select
                    value={category || 'all'}
                    onValueChange={(val) => onChange({ search: query, category: val, sort })}
                >
                    <SelectTrigger className="w-[170px] rounded-full shadow-none h-[38px] bg-white focus:ring-0 border border-primary-200">
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={sort || 'newest'}
                    onValueChange={(val) => onChange({ search: query, category, sort: val })}
                >
                    <SelectTrigger className="w-[150px] rounded-full shadow-none h-[38px] bg-white focus:ring-0 border border-primary-200">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default BlogFilter;
