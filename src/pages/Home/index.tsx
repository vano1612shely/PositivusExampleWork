import Header from "../../views/header";
import Services from "@/views/services";

import "./style.scss";
import Cta from "@/views/cta";
import CaseStudies from "@/views/caseStudies";
import WorkingProcess from "@/views/workingProcess";
import Team from "@/views/team";
import Testimonials from "@/views/testimonials";
import ContactUs from "@/views/contactUs";
import Footer from "@/views/footer";
const Home = () => {
  return (
    <>
      <div className="container">
        <Header className="mb-[3.75rem] lg:mb-[8.75rem]" />
      </div>
      <main>
        <div className="container">
          <Services className="mb-[4.375rem] lg:mb-[6.25rem]" />
        </div>
        <div className="container">
          <Cta className="mb-[3.75rem] lg:mb-[8.75rem]" />
        </div>
        <div className="container">
          <CaseStudies className="mb-[3.75rem] lg:mb-[8.75rem]" />
        </div>
        <div className="container">
          <WorkingProcess className="mb-[3.75rem] lg:mb-[8.75rem]" />
        </div>
        <div className="container">
          <Team className="mb-[3.75rem] lg:mb-[8.75rem]" />
        </div>
        <div className="container">
          <Testimonials className="mb-[3.75rem] lg:mb-[8.75rem]" />
        </div>
        <div className="container">
          <ContactUs className="mb-[3.75rem] lg:mb-[8.75rem]" />
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Home;
