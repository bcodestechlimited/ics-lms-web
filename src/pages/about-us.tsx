import Footer from "@/components/footer";
// import { aboutUsPage, whyChooseUsData } from "@/data/static-card";

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
          <h2 className={`${styles.header} text-[32px]`}>About Us</h2>
          <div className="space-y-4">
            <p className="text-justify">
              At ICS Learning Academy, we are transforming lives through the
              power of knowledge. As an extension of ICS Outsourcing, Nigeria’s
              leading HR and workforce solutions provider, we are driven by a
              vision to create sustainable opportunities and empower individuals
              to thrive in a dynamic world. Our mission is to deliver
              world-class learning experiences that ignite potential, blending
              innovation, integrity, and accessibility.
            </p>
            <p className="text-justify">
              We offer expertly crafted courses—from leadership and technology
              to personal growth and entrepreneurship—taught by industry
              trailblazers and top educators. Whether you are upskilling for a
              career pivot, launching a business, or chasing a passion, our
              flexible, on-demand platform delivers practical skills you can
              apply today, anywhere, on any device.
            </p>
            <p className="text-justify">
              Join a global community of learners and leaders at ICS Learning
              Academy. Your growth is our legacy—start your journey now.
            </p>
          </div>

          {/* <div className="space-y-5">
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
          </div> */}

          {/* <div className="space-y-5">
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
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
