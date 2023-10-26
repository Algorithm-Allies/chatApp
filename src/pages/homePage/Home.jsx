import MessageStream from "./MessageStream";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="Home font-inter w-screen h-screen grid grid-cols-8">
      <div className="col-span-3 md:col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-9 md:col-span-7">
        <MessageStream />
      </div>
    </div>
  );
}

export default Home;
