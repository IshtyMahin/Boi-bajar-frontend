import AboutSection from "../components/AboutSection";
import Banner from "../components/Banner";
import ContactSection from "../components/ContactSection";

import FeaturedProducts from "../components/FeaturedProducts ";
import FeaturesSection from "../components/FeaturesSection";

const MainPage = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />

      <AboutSection />
      <FeaturesSection />
      <ContactSection />
    </div>
  );
};

export default MainPage;
