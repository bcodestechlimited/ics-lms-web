import Footer from "@/components/footer";
import { aboutUsPage, whyChooseUsData } from "@/data/static-card";

const styles = {
  header: `leading-normal font-bold`,
};
export default function AboutUsPage() {
  return (
    <div className="">
      <div className="container mx-auto pt-[43px] text-[#0B2239]">
        <img
          src="/assets/image/about-us-hero.webp"
          alt="About us hero banner"
          className="hero-banner"
        />

        <div className="space-y-[48px]">
          <div className="space-y-4">
            <h2 className={`${styles.header} text-[32px]`}>About Us</h2>
            <p>
              Welcome to ICS Sourcing Academy where learning meets limitless
              possibilities. Our platform is designed to empower individuals
              from diverse backgrounds to pursue their educational goals with
              ease. It is our goal to make learning accessible, engaging, and
              impactful for all. We believe that education is the key to
              personal growth, professional success, and societal advancement.
            </p>
          </div>

          <div className="space-y-5">
            <h2 className={`${styles.header} text-[24px]`}>What We Offer</h2>
            <div className="space-y-5">
              {aboutUsPage.map((about) => {
                return (
                  <div>
                    <span className="text-[16px] font-medium mr-0.5">
                      {about.title}:
                    </span>
                    <span className="font-normal">{about.description}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-[24px] font-bold">Why Choose Us</h2>
            <div className="space-y-5">
              {whyChooseUsData.map((why) => {
                return (
                  <div>
                    <span className="text-[16px] font-medium mr-0.5">
                      {why.title}:
                    </span>
                    <span className="font-normal">{why.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
