import { GetServerSideProps } from "next";
import { auth } from "@/server";

interface HeaderProps {
  user: {
    name: string;
  } | null;
}

const Header = ({ user }: HeaderProps) => {
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
    <div>
      <div className="relative w-full flex items-center gap-4">
        {user && user.name ? (
          <p className="font-bold text-xl">
            {getGreeting()}, {user.name}
          </p>
        ) : (
          <p className="font-bold text-xl">{getGreeting()}, Guest</p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth(context);

  return {
    props: {
      user: session?.user || null,
    },
  };
};

export default Header;
