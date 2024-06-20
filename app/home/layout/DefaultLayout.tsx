import { FaPlus, FaTasks } from "react-icons/fa";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import User from "./User";
import { BiLogOutCircle } from "react-icons/bi";
import { auth, signOut } from "@/auth";

const DefaultLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  const user = session?.user;

  const getGreeting = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good morning";
    } else if (currentTime < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <div className="flex flex-row   lg:flex-row h-screen overflow-hidden relative">
      <section
        className={`absolute left-0   top-0 z-[999]  lg:static  lg:translate-y-0 
      flex flex-col items-center w-[10rem]   h-screen lg:w-[18rem] overflow-y-hidden overflow-x-hidden  duration-300  ease-linear  bg-[#080C12] text-white 
          `}
      >
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear w-full items-center mt-5 ">
          <nav className=" py-4 space-y-8 w-full h-screen">
            {/* <!-- Menu Group --> */}

            <div className="h-[83%]">
              <div className="w-full flex items-center justify-center my-5">
                <User />
              </div>
              <hr className="border-white border-opacity-20" />

              <Link
                href="/home/createtask"
                className="w-full  flex flex-row gap-1 py-3 border-0 outline-none duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 lg:pb-5  lg:pl-6"
              >
                <FaPlus className=" text-slate-50 ms-10 mt-1" size={15} />
                <span className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2">
                  New Task
                </span>
              </Link>
              <hr className="border-white border-opacity-20" />
              <div className="flex flex-col gap-2  text-[#EBDFD7]">
                <Link
                  href="/task"
                  className="w-full  flex flex-row gap-1 py-4 text-center  border-0 outline-none hover:bg-bodydark  duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 lg:pb-5  lg:pl-11"
                >
                  <FaTasks className=" text-slate-50 ms-5 mt-1 " size={17} />

                  <span className="group relative flex items-center rounded-md px-4 font-medium text-bodydark2 ">
                    Tasks
                  </span>
                </Link>
              </div>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="h-[10%]"
            >
              <button
                type="submit"
                className="w-full flex flex-row gap-1 text-red-600 py-3 border-0 outline-none duration-300 ease-in-out hover:bg-red-400 hover:bg-opacity-20 lg:pb-5  lg:pl-6"
              >
                <BiLogOutCircle
                  className=" text-slate-50 ms-10 mt-1"
                  size={17}
                />
                <span className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2">
                  Logout
                </span>
              </button>
            </form>
          </nav>
        </div>
      </section>

      <div className=" w-full flex  flex-col  bg-[#EBDFD7] overflow-y-auto sticky top-0 z-999 ">
        <section className="w-full bg-[#EBDFD7] flex flex-row gap-5 h-[4.5rem]  justify-end lg:justify-between items-center shadow-2  ">
          <Image
            className=" absolute left-10 top-6 lg:hidden   "
            src={"/images/menu.png"}
            alt="menu"
            width="40"
            height="40"
          />
          {/* <FaTimes /> */}
          <div className="lg:block hidden w-[30rem] ">
            <form className="w-full ps-10  ">
              {/* <form> */}
              <div className="relative w-full flex items-center gap-4">
                {user && user.name ? (
                  <p className="font-bold text-xl">
                    {getGreeting()}, {user.name}
                  </p>
                ) : (
                  <p className="font-bold text-xl">{getGreeting()}, Guest</p>
                )}
              </div>
            </form>
          </div>
        </section>

        <main>
          <hr className="border-[1px] border-stone-300" />

          <div className="mx-auto max-w-screen-2xl max-h-screen p-4 md:p-6 2xl:p-4 z-[10]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
export default DefaultLayout;
