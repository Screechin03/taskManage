import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DefaultLayout from "../layout/DefaultLayout";
import { getUserTasks } from "@/server/actions/taskActions";

const Tasks = async () => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const tasks = await getUserTasks();

  const session = await auth();
  const user = session?.user;
  console.log(user);
  if (!user) return redirect("/login");

  // const userInfo = {};

  const userData = {
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
  };
  return (
    <>
      <DefaultLayout user={userData}>
        <div className="w-full flex items-center justify-center relative">
          <div className="lg:w-full w-full flex flex-wrap gap-6  mb-6">
            {tasks && tasks.length === 0 ? (
              <div className="flex items-center justify-center my-1 bg-white bg-opacity-30 backdrop-blur-lg w-[90%] lg:w-[15rem] 3xl-[w-29rem] h-[17.5rem] rounded-3xl mx-5 text-black shadow-xl border-2 border-slate-50">
                <Link
                  href="/home/createtask"
                  className="bg-white w-[3rem] h-[3rem] cursor-pointer rounded-full flex items-center justify-center"
                >
                  <FaPlus className="text-black" size={14} />
                </Link>
              </div>
            ) : (
              <>
                {tasks &&
                  tasks.map((task) => {
                    const dueDate = task.dueDate;
                    const formattedDate = formatDate(dueDate);
                    return (
                      <div
                        key={task._id}
                        className={`${
                          task.taskLevel === 100
                            ? "bg-black bg-opacity-25"
                            : "bg-white"
                        } flex flex-col px-5 py-1 my-1 bg-opacity-50 backdrop-blur-lg w-[90%] md:w-[16rem] lg:w-[16rem] 3xl-[w-29rem] h-[17.5rem] rounded-3xl mx-5 text-black shadow-xl border-2 border-slate-50 cursor-pointer`}
                      >
                        <Link href={`/home/${task._id}`}>
                          <div>
                            <div className="flex justify-between mt-4 items-center">
                              <div className="flex flex-col gap-2">
                                <p
                                  className={`text-xs w-[4.5rem] 
                                  ${
                                    task.priorityLevel === "Normal"
                                      ? "bg-blue-300"
                                      : "bg-black"
                                  }
                                  ${
                                    task.priorityLevel === "Important"
                                      ? "bg-orange-300"
                                      : "bg-black"
                                  }
                                  ${
                                    task.priorityLevel === "High"
                                      ? "bg-red-300"
                                      : "bg-black"
                                  }
                                  py-0.5 rounded-xl text-center`}
                                >
                                  {task.priorityLevel}
                                </p>
                                <h2 className="font-bold text-md capitalize">
                                  {task.title}
                                </h2>
                              </div>
                              <div className="relative h-[3.5rem] w-[3.5rem] flex items-center justify-center">
                                <p className="absolute font-semibold text-[11px]">
                                  {task.taskLevel}%
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col text-sm tracking-wide py-2">
                              <div className="h-[6.5rem] mb-1">
                                <p className="text-justify text-[13px] leading-[18px]">
                                  {task.description}
                                </p>
                              </div>
                              <hr className="border-white pb-2" />
                              <div className="flex justify-between items-center py-1">
                                <p className="font-semibold text-[13px]">
                                  Status
                                </p>
                                <p
                                  className={`bg-black bg-opacity-70 text-xs rounded-xl text-white py-1 px-3 text-center`}
                                >
                                  {task.taskStatus || "Not Started"}
                                </p>
                              </div>
                              <div className="flex justify-between py-2 text-[13px]">
                                <p>Due on</p>
                                <p className="text-semibold text-red-500">
                                  {formattedDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Tasks;
