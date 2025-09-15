import { BrickWall, ChevronsRight, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";


function TaskFilter() {
    return (
        <section className="flex flex-col gap-2 border-b pb-6">
            <h3 className="text-lg font-semibold ">Tasks</h3>
            <ul className="flex flex-col gap-1 text-sm">
                <li className="flex justify-between items-center hover:bg-bgHover hover:text-[#1a1a1a] py-1 px-3 transition-colors duration-300 rounded">
                    <Link to='/dashboard/today' className="flex gap-2">
                        <span><ListChecks width={16} /></span>
                        <p>Today</p>
                    </Link>
                    <p className="bg-bgHover px-4 py-[0.4px] rounded text-[#1a1a1a]">5</p>
                </li>
                <li className="flex justify-between items-center hover:bg-bgHover hover:text-[#1a1a1a] py-1 px-3 transition-colors duration-300 rounded">
                    <Link to='/dashboard/upcoming' className="flex gap-2">
                        <span><ChevronsRight width={16}  /></span>
                        <p>Upcoming</p>
                    </Link>
                    <p className="bg-bgHover px-4 py-[0.4px] rounded text-[#1a1a1a]">2</p>
                </li>
                <li className="flex justify-between items-center hover:bg-bgHover hover:text-[#1a1a1a] py-1 px-3 transition-colors duration-300 rounded">
                    <Link to='/dashboard/stickywall' className="flex gap-2">
                        <span><BrickWall width={16}  /></span>
                        <p>Sticky Wall</p>
                    </Link>
                    <p className="bg-bgHover px-4 py-[0.4px] rounded text-[#1a1a1a]">4</p>
                </li>
                {/* <li>
                    <div>
                        <span><ChevronsRight /></span>
                        <p>Upcoming</p>
                    </div>
                    <p>5</p>
                </li> */}
            </ul>
        </section>
    )
}

export default TaskFilter;
