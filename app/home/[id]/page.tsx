import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  deleteUserTask,
  updateUserTask,
  getSingleTask,
} from "@/server/actions/taskActions";
import Link from "next/link";
import DefaultLayout from "../layout/DefaultLayout";
import { auth } from "@/auth";

const UpdateTask = async ({ params }: { params: any }) => {
  const { id } = params;

  const task = await getSingleTask(id);

  const currentDate = new Date().toISOString().split("T")[0];

  const session = await auth();
  const user = session?.user;

  const userData = {
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
  };

  return (
    <>
      <DefaultLayout user={userData}>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="lg:w-[30%] w-[90%]">
            <div className="flex flex-col justify-center items-center border-slate-100 border-2 rounded-3xl shadow-lg py-6 bg-white bg-opacity-50 text-black relative">
              <form
                action={updateUserTask}
                className="w-full flex flex-col justify-center items-center "
              >
                <h1 className="text-2xl font-semibold">Update Task</h1>
                <Link href="/home/tasks" className="absolute top-6 right-7">
                  <IoIosCloseCircleOutline className="text-2xl cursor-pointer" />
                </Link>
                <div className="w-[100%] flex lg:flex-col flex-col justify-center items-center pt-5 px-5 gap-2">
                  <span className="flex flex-col w-full">
                    <label htmlFor="name" className="text-sm">
                      Task Title
                    </label>
                    <input type="hidden" name="id" value={task.id} />
                    <input
                      id="name"
                      name="title"
                      className="w-full py-2.5 outline-none text-sm bg-transparent bg-white text-black border-2 rounded-sm px-2 mt-2 focus:border-black placeholder:text-gray-600"
                      placeholder={task.title}
                    />
                  </span>
                  <span className="flex flex-col w-full">
                    <label htmlFor="name" className="text-sm">
                      Task Description
                    </label>
                    <textarea
                      id="name"
                      name="description"
                      className="w-full h-20 outline-none resize-none text-sm bg-transparent bg-white py-1 text-black border-2 rounded-sm px-2 mt-2 focus:border-black placeholder:text-gray-600"
                      placeholder={task.description}
                    />
                  </span>
                  <div className="flex gap-3 w-full">
                    <span className="flex flex-col w-full">
                      <label className="text-sm">Status</label>
                      <select
                        title="status"
                        name="taskStatus"
                        className="py-2.5 outline-none text-sm bg-white text-black px-2 mt-2 border-2 cursor-pointer rounded-sm focus:border-black"
                      >
                        <option>Not Started</option>
                        <option>In Process</option>
                        <option>Completed</option>
                      </select>
                    </span>
                    <span className="flex flex-col w-full">
                      <label className="text-sm">Progress</label>
                      <select
                        title="level"
                        name="taskLevel"
                        className="py-2.5 outline-none text-sm bg-white text-black px-2 mt-2 border-2 cursor-pointer rounded-sm focus:border-black"
                      >
                        <option value="0">0%</option>
                        <option value="25">25%</option>
                        <option value="50">50%</option>
                        <option value="75">75%</option>
                        <option value="100">100%</option>
                      </select>
                    </span>
                  </div>
                  <div className="flex gap-3 w-full">
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Priority Level </label>
                      <select
                        title="Priority"
                        name="priorityLevel"
                        className="py-2.5 outline-none text-sm bg-white text-black px-2 mt-2 border-2 cursor-pointer rounded-sm focus:border-black"
                      >
                        <option className="text-green-600">Normal</option>
                        <option className="text-orange-600">High</option>
                        <option className="text-red-600">Important</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-sm">Due date </label>
                      <input
                        type="date"
                        title="duedate"
                        name="dueDate"
                        min={currentDate}
                        className="w-full py-2 outline-none text-sm bg-white uppercase text-black px-2 mt-2 border-2 rounded-sm focus:border-black"
                        placeholder={task.dueDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <button
                    className="lg:w-[8rem] mt-10 lg:mt-6 lg:mb-2 h-9 text-md font-bold px-4 rounded-3xl border-2 border-black hover:bg-stone-200"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
              <form action={deleteUserTask}>
                <input type="hidden" value={task.id} />
                <button
                  className="lg:w-[8rem] lg:mt-1 lg:mb-2 h-10 text-md font-bold px-4 rounded-3xl border-2 bg-black text-white hover:bg-neutral-700"
                  type="button"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default UpdateTask;
