import { auth, signIn } from "@/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/server/actions/userActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const page = async () => {
  const session = await auth();

  console.log(session);
  const user = session?.user;
  if (user) redirect("/home/tasks");

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="lg:w-[28rem] min-w-[24rem] h-[30rem] rounded-3xl gap-4 flex flex-col items-center justify-center bg-white shadow-lg p-6">
        <form action={loginUser as unknown as (formData: FormData) => void} className="w-full">
          <h2 className="lg:text-3xl text-2xl font-bold tracking-wider text-black text-center">
            Let&apos;s get in to&nbsp;
            <span className="text-indigo-500">workplace</span>
            <span className="text-black text-[3rem]">.</span>
          </h2>
          <h3 className="py-3 text-sm text-center">
            New User?{" "}
            <Link href="/register" className="text-indigo-600">
              SignUp
            </Link>
          </h3>
          <div className="w-full flex flex-col gap-4 text-black pt-3">
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
              className="tracking-wider text-white rounded-3xl py-[1.5rem] mt-2"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default page;
