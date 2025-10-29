import { useLists } from "@/hooks/useLists";
import {BriefcaseBusiness, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";


function ListFilter() {
    const {lists} = useLists()
    const numOfWork = lists?.data?.filter(list => list.lists === 'work')
    const numOfPersonal = lists?.data?.filter(list => list.lists === ('personal'))

    return (
        <section className="flex flex-col gap-2 border-b pb-6">
            <h3 className="text-lg font-semibold ">Lists</h3>
            <ul className="flex flex-col gap-1 text-sm">
                <li className="flex justify-between items-center hover:bg-bgHover hover:text-[#1a1a1a] py-1 px-3 transition-colors duration-300 rounded">
                    <Link to='/dashboard/personal'   
                        className="flex gap-2 items-center">
                        <span><ListChecks width={16} /></span>
                        <span>Personal</span>
                    </Link>
                    <p className="bg-bgHover px-4 py-[0.4px] rounded text-[#1a1a1a]">{numOfPersonal?.length || 0 }</p>
                </li>
                <li className="flex justify-between items-center hover:bg-bgHover hover:text-[#1a1a1a] py-1 px-3 transition-colors duration-300 rounded">
                    <Link to='/dashboard/work' className="flex gap-2 items-center">
                        <span><BriefcaseBusiness width={16} /></span>
                        <span>Work</span>
                    </Link>
                    <p className="bg-bgHover px-4 py-[0.4px] rounded text-[#1a1a1a]">{numOfWork?.length || 0}</p>
                </li>
            </ul>
        </section>
    )
}

export default ListFilter;
