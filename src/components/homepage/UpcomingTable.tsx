import React from 'react';
import { upcomingEventData } from '../../data/upcomingEventData';
import UpcomingRow from './UpcomingRow';

const UpcomingTable: React.FC = () => {
  return (
    <section className="bg-[#F9FAFB] py-12 px-4 md:px-16 lg:px-32 font-plus-jakarta-sans">
      <h2 className="text-5xl font-bold mb-10 text-left">Upcoming in Your Area</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white overflow-hidden min-w-[800px]">
          <thead>
            <tr className="bg-[#F3F4F6] text-left text-lg text-black">
              <th className="py-3 font-normal px-4 w-[30%]">Event</th>
              <th className="py-3 font-normal w-[15%]">Date & Time</th>
              <th className="py-3 font-normal w-[20%]">Venue</th>
              <th className="py-3 font-normal w-[25%]">Price</th>
              <th className="py-3 font-normal w-[15%]"></th>
            </tr>
          </thead>

          <tbody>
            {upcomingEventData.map((event, index) => (
              <UpcomingRow key={event.id} event={event} isFirst={index === 0} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UpcomingTable;
