import DialogComponent from "@/components/dialog-component";
import { EmptyDemo } from "@/components/empty";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { useUpcomingTaskByCurrentUser } from "@/features/tasks/useCurrentUserTask";
import { getTomorrowsDate, getTotalWeek } from "@/utils/helper";
import { endOfDay, formatISO, isToday } from "date-fns";
import {
  Calendar,
  ChevronRight,
  CircleCheckBig,
  CloudAlert,
} from "lucide-react";
import { useState } from "react";

function Upcoming() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { upcomingTasks, isPending } = useUpcomingTaskByCurrentUser();

  // today's task
  const todayUpcoming = upcomingTasks?.tasks.filter((task) =>
    isToday(formatISO(endOfDay(task.expiry_at)))
  );

  //tomorrow's task
  const dateTomorrow = getTomorrowsDate();
  const tomorrowUpcoming = upcomingTasks?.tasks.filter(
    (task) => formatISO(endOfDay(task.expiry_at)) === dateTomorrow
  );

  // all week upcoming weeks
  const { startWeek, endWeek } = getTotalWeek();

  const weekUpcoming = upcomingTasks?.tasks.filter((task) => {
    const taskDate = formatISO(endOfDay(task.expiry_at));
    return taskDate >= startWeek && taskDate <= endWeek;
  });

  if(isPending) {
    return (
        <div className="flex justify-center items-center">
            <Spinner/>
        </div>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-0 flex-1 flex flex-col justify-start items-start gap-4 md:w-full text-[#1a1a1a]">
      <div className="flex gap-4 items-center border-b-1 w-full pb-2 border-stone-200">
        <h1 className="text-3xl font-bold text-nunito">Upcoming</h1>
        <span className="py-1 p-3 border rounded font-semibold">
          {upcomingTasks?.tasks.length}
        </span>
      </div>
      {/* today tasks */}
      <section className="w-full border-1 border-stone-200 px-4 py-2 rounded-sm flex flex-col gap-2">
        <h1 className="font-bold text-xl">Today</h1>
        { <div className="w-full">
          <DialogComponent
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>}
        <div>
          {todayUpcoming?.length === 0 ? (
            <div className="mx-auto w-full">
              <EmptyDemo setModalOpen={setIsDialogOpen} />
            </div>
          ) : (
            <ul className="w-full flex flex-col gap-2">
              {todayUpcoming?.map((task) => (
                <li key={task.id}>
                  <button
                    // onClick={() => handleTaskClick(task.id.toString())}
                    className="border-b w-full text-start cursor-pointer p-2 rounded flex flex-col gap-2 text-sm text-[#1a1a1a] hover:bg-[#eceeef] transition-colors duration-300"
                  >
                    <div className="flex justify-between">
                      <span className="self-end flex items-center gap-2">
                        <Checkbox asChild />
                        {task.tasks}
                      </span>
                      <ChevronRight width={16} />
                    </div>
                    <div className="flex gap-2 items-center ml-8 text-[12px]">
                      <span className="flex items-center gap-2 border-r pr-3">
                        <Calendar width={16} />
                        <span className="">
                          {formatISO(endOfDay(task?.expiry_at))}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 border-r pr-3">
                        {task?.completed ? (
                          <CircleCheckBig width={16} />
                        ) : (
                          <CloudAlert width={16} />
                        )}
                        <span className="text-secBackground font-bold">
                          {task?.completed ? "Completed" : "Pending"}
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <div
                          className={`w-[12px] h-[12px] rounded ${
                            task?.lists === "personal"
                              ? "bg-[#e53e3e]"
                              : "bg-[#38b2ac]"
                          }`}
                        />
                        {task?.lists}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section className="w-full flex justify-between gap-2">
        <div className="border-1 border-stone-200 px-4 py-2 rounded-sm flex-1">
          <h1 className="font-bold text-xl">Tomorrow</h1>
          <div>
            {tomorrowUpcoming?.length === 0 ? (
              <div className="mx-auto w-full">
                <EmptyDemo setModalOpen={setIsDialogOpen} />
              </div>
            ) : (
              <ul className="w-full flex flex-col gap-2">
                {tomorrowUpcoming?.map((task) => (
                  <li key={task.id}>
                    <button
                      // onClick={() => handleTaskClick(task.id.toString())}
                      className="border-b w-full text-start cursor-pointer p-2 rounded flex flex-col gap-2 text-sm text-[#1a1a1a] hover:bg-[#eceeef] transition-colors duration-300"
                    >
                      <div className="flex justify-between">
                        <span className="self-end flex items-center gap-2">
                          <Checkbox asChild />
                          {task.tasks}
                        </span>
                        <ChevronRight width={16} />
                      </div>
                      <div className="flex gap-2 items-center ml-8 text-[12px]">
                        <span className="flex items-center gap-2 border-r pr-3">
                          <Calendar width={16} />
                          <span className="">
                            {formatISO(endOfDay(task?.expiry_at))}
                          </span>
                        </span>
                        <span className="flex items-center gap-2 border-r pr-3">
                          {task?.completed ? (
                            <CircleCheckBig width={16} />
                          ) : (
                            <CloudAlert width={16} />
                          )}
                          <span className="text-secBackground font-bold">
                            {task?.completed ? "Completed" : "Pending"}
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <div
                            className={`w-[12px] h-[12px] rounded ${
                              task?.lists === "personal"
                                ? "bg-[#e53e3e]"
                                : "bg-[#38b2ac]"
                            }`}
                          />
                          {task?.lists}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="border-1 border-stone-200 px-4 py-2 rounded-sm flex-1">
          <h1 className="font-bold text-xl">This Week</h1>
          <div>
            {weekUpcoming?.length === 0 ? (
              <div className="mx-auto w-full">
                <EmptyDemo setModalOpen={setIsDialogOpen} />
              </div>
            ) : (
              <ul className="w-full flex flex-col gap-2">
                {weekUpcoming?.map((task) => (
                  <li key={task.id}>
                    <button
                      // onClick={() => handleTaskClick(task.id.toString())}
                      className="border-b w-full text-start cursor-pointer p-2 rounded flex flex-col gap-2 text-sm text-[#1a1a1a] hover:bg-[#eceeef] transition-colors duration-300"
                    >
                      <div className="flex justify-between">
                        <span className="self-end flex items-center gap-2">
                          <Checkbox asChild />
                          {task.tasks}
                        </span>
                        <ChevronRight width={16} />
                      </div>
                      <div className="flex gap-2 items-center ml-8 text-[12px]">
                        <span className="flex items-center gap-2 border-r pr-3">
                          <Calendar width={16} />
                          <span className="">
                            {formatISO(endOfDay(task?.expiry_at))}
                          </span>
                        </span>
                        <span className="flex items-center gap-2 border-r pr-3">
                          {task?.completed ? (
                            <CircleCheckBig width={16} />
                          ) : (
                            <CloudAlert width={16} />
                          )}
                          <span className="text-secBackground font-bold">
                            {task?.completed ? "Completed" : "Pending"}
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <div
                            className={`w-[12px] h-[12px] rounded ${
                              task?.lists === "personal"
                                ? "bg-[#e53e3e]"
                                : "bg-[#38b2ac]"
                            }`}
                          />
                          {task?.lists}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Upcoming;
