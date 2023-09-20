import Image from 'next/image'
import MainBtn from './components/btns/MainBtn'
import { useInitSocket } from "socket/initSocket";

export default function Home() {
  // const [data, setData] = useState();

  const socket = useInitSocket({
    namespace: "nspApp",
  });

   // MAIN SOCKET CONNECTION
   useEffect(() => {
    if (!socket) return;
    if (socket.disconnected) socket.connect();

    // handling server socket data
    // populate init data
    const roomData = {
        userId: "FebroTest",
        origin: "dashboard",
    };

    socket.emit("joinRoom", roomData);
    socket.on("dashboardStartEmergency", (options = {}) => {
        alert(options.msg)
    });

    // return () => {
    //     socket.disconnect();
    //     socket.off("joinRoom");
    //     socket.off("dashboardData");
    // };
    }, []);

  


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
 

      <div className="relative flex place-items-center before:absolute before:h-[30px] before:w-[480px] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/sempre_alerta_logo.png"
          alt="Sempre Alerta Logo"
          width={200}
          height={50}
          priority={false}
        />
      </div>

      <MainBtn />
    </main>
  )
}
