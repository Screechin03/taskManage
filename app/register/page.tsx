import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/server/actions/userActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = async () => {
  // const session = await auth();
  // const user = session?.user;
  // if (user) redirect("/home/tasks");
  return (
    <>
      <div className="relative w-full h-screen flex justify-end items-center ">
        <div className="lg:w-[50%] w-full h-screen flex items-center justify-center">
          <div className="lg:w-[28rem] min-w-[24rem] h-[30rem] z-20 rounded-3xl flex flex-col ">
            <form action={registerUser}>
              <h2 className="text-3xl font-bold tracking-wider text-black">
                Create new account
                <span className="text-indigo-500 text-[3rem]">.</span>
              </h2>
              <h3 className="py-3 text-sm">
                Have an account?{" "}
                <Link href="/login" className="text-indigo-600">
                  Log in
                </Link>
              </h3>
              <div className="w-[90%] flex flex-col gap-3 text-black pt-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className="  py-[1.5rem]"
                    id="name"
                    type="name"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>

                  <Input
                    className="  py-[1.5rem]"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Password</Label>

                  <Input
                    className="  py-[1.5rem]"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                {/* <Input
                    type="file"
                    size="md"
                    variant="outlined"
                    accept="image/*"
                    label="Avatar"
                  /> */}
                <Button
                  className=" tracking-wider text-white rounded-3xl mt-2  py-[1.5rem]"
                  size="lg"
                  type="submit"
                >
                  SignUp
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-2 w-[90%] text-black py-3">
              <span className="w-[40%] h-[0.5px] bg-black" />
              or
              <span className="w-[40%] h-[0.5px] bg-black" />
            </div>
            <div className="w-[90%] flex gap-5 items-center justify-center">
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
                className="w-[90%]"
              >
                <Button className="w-full text-black flex items-center justify-center tracking-wide gap-3 text-sm bg-white rounded-3xl hover:bg-neutral-100 py-[1.5rem]">
                  <FcGoogle className="text-2xl" />
                  Google
                </Button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
                className="w-[90%]"
              >
                <Button
                  type="submit"
                  className="w-full text-black flex items-center justify-center tracking-wide gap-3 text-sm  bg-white rounded-3xl hover:bg-neutral-100 py-[1.5rem]"
                >
                  <FaGithub className="text-2xl" />
                  GitHub
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
