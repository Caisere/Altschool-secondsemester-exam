import { EmptyDemo } from "@/components/empty";
import { useCurrentUserStickyWall } from "@/features/tasks/useStickWall";
import { useState } from "react";

function StickyWall() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { stickyWalls } = useCurrentUserStickyWall();
  console.log(stickyWalls);

  return (
        <main className="min-h-screen p-4 md:p-0 flex-1 flex flex-col justify-start items-start gap-4 md:w-full text-[#1a1a1a]">
            <div className="flex gap-4 items-center">
                <h1 className="text-3xl font-bold">StickyWall</h1>
                <span className="py-1 p-3 border rounded font-semibold">{stickyWalls?.data.length}</span>
            </div>

            <button>+ Add New</button>

            <section className="flex justify-center items-center w-full">
                {stickyWalls?.data.length === 0 ? (
                <EmptyDemo setModalOpen={setIsDialogOpen} mainContent="StickyWall" />
                ) : (
                    <div className="flex justify-start items-center w-full">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full ">
                            {stickyWalls?.data.map((sticky) => (
                                <li
                                key={sticky.id}
                                className="border border-stone-200 p-4 aspect-square rounded-sm bg-pink-500/20 odd:bg-yellow-500/30 "
                                >
                                <h1 className="font-bold text-lg mb-2">{sticky.title.toLocaleUpperCase()}</h1>
                                <ol className="list-disc list-inside">
                                    {sticky.content
                                    .split(".")
                                    .filter((el: string) => el.trim() !== "")
                                    .map((el: string, index: number) => (
                                        <li key={index}>{el.trim()}</li>
                                    ))}
                                </ol>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </main>
    );
}

export default StickyWall;

{
  /* <div>
                <DialogComponent setIsDialogOpen={setIsDialogOpen} isDialogOpen={isDialogOpen}/>
            </div> */
}
