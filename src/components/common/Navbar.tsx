import { FC } from 'react';
import photoprofile from '../../assets/photoprofile.svg';
import lens from '../../assets/lens.svg';

const Navbar: FC = () => {
  return (
    <section className="w-full py-3">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-4xl font-pacifico bg-gradient-to-r from-[#8F2EE0] to-[#FA66B6] text-transparent bg-clip-text">TicketBuzz</h1>
        <div className="flex-1 mx-6">
          <div className="relative">
            <img src={lens} alt="lens" className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" width={20} height={20} />

            <input type="text" placeholder="Search for concerts, artists, or venues" className="w-[60%] pl-16 pr-4 py-2 rounded-full bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#8F2EE0] font-plus-jakarta-sans" />
          </div>
        </div>

        <div className="text-2xl text-black">
          <img src={photoprofile} alt="photo-profile" width={40} height={40} />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
