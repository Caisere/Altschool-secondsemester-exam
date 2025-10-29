import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

function Search() {
    return(
        <div className="relative">
            <Input
                role="search"
                aria-label="Search todos"
                type="text"
                placeholder="Search"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8"
            />
            <div className="absolute top-[6px] left-2">
                <SearchIcon width={16} />
            </div>
        </div>
    )
}

export default Search;
