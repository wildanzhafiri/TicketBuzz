import bgMyTicket from '../assets/background-myt-ticket.svg';
import TicketList from '../components/myTicket/TicketList';

const MyTicket = () => {
  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col">
      <div className="relative w-full h-[400px]">
        <img src={bgMyTicket} alt="bg-my-ticket" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 ">
          <div className="flex flex-col justify-center max-w-7xl mx-auto absolute inset-0 px-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">My Ticket</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 mb-10 px-6">
        <div className="bg-white rounded-2xl">
          <TicketList />
        </div>
      </div>
    </div>
  );
};

export default MyTicket;
