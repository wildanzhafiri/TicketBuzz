import React, { useState } from 'react';
import { eventData } from '../../data/eventData';
import EventCard from './EventCard';
import arrow_left from '../../assets/arrow-left.svg';
import arrow_right from '../../assets/arrow-right.svg';

const ITEMS_PER_PAGE = 3;

const FeaturedEvents: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(eventData.length / ITEMS_PER_PAGE);

  const paginatedEvents = eventData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section className="py-12 bg-[#F3F4F6] text-center">
      <h2 className="text-5xl font-bold mb-8 text-start mx-32 font-plus-jakarta-sans ">Featured Events</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {paginatedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="text-gray-500 disabled:opacity-30">
          <img src={arrow_left} alt="arrow-left" />
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={`rounded-lg px-3 py-2 font-medium ${currentPage === idx + 1 ? 'bg-gradient-to-b from-[#902EDF] to-[#FB67B6] text-white' : '  text-black'}`}>
            {idx + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="text-gray-500 disabled:opacity-30">
          <img src={arrow_right} alt="arrow-right" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedEvents;
