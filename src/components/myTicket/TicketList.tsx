import React, { useEffect, useState } from 'react';
import calendar from '../../assets/calendar.svg';
import arrow_left from '../../assets/arrow-left.svg';
import arrow_right from '../../assets/arrow-right.svg';
import { getMyOrders, OrderTab } from '../../api/orderApi';

interface Ticket {
  id: number;
  title: string;
  location: string;
  datetime: string;
  image: string;
  ticketInfo: string[];
}

const ITEMS_PER_PAGE = 3;

const TicketList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OrderTab>('upcoming');
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const paginatedTickets = allTickets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(allTickets.length / ITEMS_PER_PAGE);

  const fetchTickets = async (tab: OrderTab) => {
    setIsLoading(true);
    try {
      const { orders } = await getMyOrders(tab);

      const formatted: Ticket[] = orders.map((order) => {
        const firstConcert = order.ticket_orders[0]?.ticket.concert;
        const datetime = new Date(firstConcert.concert_start).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        });

        return {
          id: order.id,
          title: firstConcert.name,
          location: firstConcert.venue?.name || 'TBA',
          datetime,
          image: firstConcert.link_poster,
          ticketInfo: order.ticket_orders.map((to) => `${to.quantity}x ${to.ticket.name}`),
        };
      });

      setAllTickets(formatted);
      setCurrentPage(1);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(activeTab);
  }, [activeTab]);

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-[#7878801F] px-1 rounded-lg flex gap-1">
            {(['upcoming', 'past', 'all'] as OrderTab[]).map((tab) => {
              const labelMap = {
                upcoming: 'Upcoming',
                past: 'Past Tickets',
                all: 'All Transaction History',
              };
              const isActive = activeTab === tab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-[#A94AFD] to-[#F871BF] text-white' : 'text-gray-700'}`}>
                  {labelMap[tab]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-[1000px] bg-white rounded-xl px-4 py-10">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading tickets...</p>
          ) : paginatedTickets.length === 0 ? (
            <p className="text-center text-2xl text-gray-400">No tickets found.</p>
          ) : (
            <div className="flex flex-col gap-10">
              {paginatedTickets.map((ticket) => (
                <div key={ticket.id} className="flex rounded-lg overflow-hidden relative bg-[#CDCDCD]">
                  <div className="relative z-30 w-6 gap-1 flex flex-col items-center bg-transparent">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const isFirst = i === 0;
                      const isLast = i === 11;
                      const sizeClass = isFirst || isLast ? 'w-4 h-3' : 'w-3 h-3';
                      const shapeClass = isFirst ? 'rounded-b-full -translate-y-1' : isLast ? 'rounded-t-full translate-y-1' : 'rounded-full my-[2px]';
                      return <div key={i} className={`bg-white ${sizeClass} ${shapeClass} translate-x-10`}></div>;
                    })}
                  </div>

                  <div className="relative flex-1 flex items-center p-6 px-20 text-gray-800 w-[900px]">
                    <div className="absolute inset-0 right-1/2 bg-gray-300 z-0"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center z-0" style={{ backgroundImage: `url(${ticket.image})` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#CDCDCD] via-[#CDCDCD] to-transparent z-0"></div>

                    <div className="relative z-10 flex gap-x-36 items-center">
                      <div className="flex-col w-[300px]">
                        <h2 className="font-semibold text-xl mb-1">{ticket.title}</h2>
                        <p className="text-sm">{ticket.location}</p>
                        <p className="text-sm flex items-center gap-2 mt-1">
                          <img src={calendar} alt="calendar" /> {ticket.datetime}
                        </p>
                      </div>
                      <div className="text-left text-lg flex flex-col gap-1 pr-4">
                        {ticket.ticketInfo.map((info, idx) => (
                          <p key={idx}>{info}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {allTickets.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="text-gray-500 disabled:opacity-30 hover:opacity-75 transition-opacity">
              <img src={arrow_left} alt="Previous page" />
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`rounded-lg px-3 py-2 font-medium transition-all duration-200 ${currentPage === idx + 1 ? 'bg-gradient-to-b from-[#902EDF] to-[#FB67B6] text-white' : 'text-black hover:bg-gray-200'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="text-gray-500 disabled:opacity-30 hover:opacity-75 transition-opacity">
              <img src={arrow_right} alt="Next page" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;
