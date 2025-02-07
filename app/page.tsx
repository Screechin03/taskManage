import Image from "next/image";
import Tasks from "./home/tasks/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  return (
    <main>
      <Tasks /><ToastContainer />
    </main>
  );
}
