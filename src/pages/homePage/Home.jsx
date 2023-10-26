import MessageStream from "./MessageStream";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="Home w-screen h-screen grid grid-cols-12">
      <div className="col-span-3 md:col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-9 md:col-span-10">
        <MessageStream />
      </div>
    </div>
  );
}

export default Home;
