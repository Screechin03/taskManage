import { IoIosCloseCircleOutline } from "react-icons/io";
import DefaultLayout from "../layout/DefaultLayout";
import Link from "next/link";
import { addTask } from "@/server/actions/taskActions";

const CreateTask = async () => {
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <DefaultLayout>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex  justify-center items-center ">
        <div className="lg:w-[30%] w-[90%]">
          <form
            action={addTask}
            className="flex flex-col  justify-center items-center border-slate-100 border-2 rounded-3xl shadow-lg py-6  bg-white bg-opacity-50 text-black relative"
          >
            <h1 className="text-2xl font-semibold">Create New Task</h1>
            <Link href="/home/tasks" className="absolute top-6 right-7">
              <IoIosCloseCircleOutline className="text-2xl cursor-pointer" />
            </Link>
            <div className="w-[100%]  flex lg:flex-col flex-col  justify-center items-center pt-5 px-5 gap-2">
              <span className="flex flex-col w-full">
                <label htmlFor="name" className="text-sm">
                  Task Title
                </label>
                <input
                  id="name"
                  name="title"
                  className="w-full py-2.5 outline-none text-sm bg-transparent bg-white text-black border-2 rounded-sm px-2 mt-2  focus:border-black"
                  placeholder="Task"
                />
              </span>
              <span className="flex flex-col w-full">
                <label htmlFor="name" className="text-sm">
                  Task Description
                </label>
                <textarea
                  id="name"
                  name="description"
                  className="w-full h-20 outline-none resize-none text-sm bg-transparent bg-white py-1 text-black border-2 rounded-sm px-2 mt-2  focus:border-black"
                  placeholder="Task Description"
                />
              </span>
              <span className="flex flex-col w-full">
                <label className="text-sm">Status</label>
                <select
                  title="status"
                  name="taskStatus"
                  className=" py-2.5 outline-none text-sm  bg-white  text-black px-2 mt-2  border-2 cursor-pointer rounded-sm focus:border-black"
                >
                  <option>Not Started</option>
                  <option>In Process</option>
                  <option>Completed</option>
                </select>
              </span>
              <div className="flex gap-3 w-full">
                <div className="flex flex-col w-full">
                  <label className="text-sm">Priority Level </label>
                  <select
                    title="Priority"
                    name="priorityLevel"
                    className=" py-2.5 outline-none text-sm  bg-white  text-black px-2 mt-2  border-2 cursor-pointer rounded-sm focus:border-black"
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
                    min={currentDate}
                    name="dueDate"
                    className="w-full py-2 outline-none text-sm bg-white uppercase  text-black px-2 mt-2  border-2 rounded-sm focus:border-black"
                  />
                </div>
              </div>
            </div>

            <button
              className="lg:w-[8rem] mt-10 lg:mt-6 lg:mb-2 h-10 text-md font-bold px-4 rounded-3xl border-2 border-black hover:bg-stone-200"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CreateTask;
