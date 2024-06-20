import { auth } from "@/auth";
import Image from "next/image";

const User = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <div className="relative px-1 py-1 flex gap-4 rounded-3xl">
        <span className=" w-24 h-24 overflow-hidden rounded-full border-white border-4 ">
          <Image
            width={100}
            height={100}
            className="rounded-full"
            src={user?.image || "/images/default_avatar.png"}
            alt="User"
          />
        </span>
      </div>
    </>
  );
};

export default User;
