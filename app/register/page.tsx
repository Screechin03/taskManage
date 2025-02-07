import { auth, signIn } from "@/server";
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
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="lg:w-[28rem] min-w-[24rem] h-[30rem] rounded-3xl gap-4 flex flex-col items-center justify-center bg-white shadow-lg p-6">
        <form action={registerUser} className="w-full">
          <h2 className="text-3xl font-bold tracking-wider text-black text-center">
            Create new account
            <span className="text-indigo-500 text-[3rem]">.</span>
          </h2>
          <h3 className="py-3 text-sm text-center">
            Have an account?{" "}
            <Link href="/login" className="text-indigo-600">
              Log in
            </Link>
          </h3>
          <div className="w-full flex flex-col gap-4 text-black pt-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                className="py-[1.5rem]"
                id="name"
                type="name"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="py-[1.5rem]"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="py-[1.5rem]"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <Button
              className="tracking-wider text-white rounded-3xl mt-2 py-[1.5rem]"
              size="lg"
              type="submit"
            >
              SignUp
            </Button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default Register;
