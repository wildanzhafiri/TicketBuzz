import HeroSection from '../components/homepage/HeroSection';
import CategorySection from '../components/homepage/CategorySection';
import FeaturedEvents from '../components/homepage/FeaturedEvents';
import UpcomingTable from '../components/homepage/UpcomingTable';

const Homepage = () => {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <FeaturedEvents />
      <UpcomingTable />
    </main>
  );
};

export default Homepage;
