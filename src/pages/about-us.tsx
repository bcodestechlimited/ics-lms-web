import Footer from "@/components/footer";

const styles = {
  header: `leading-normal font-bold`,
};

export default function AboutUsPage() {
  return (
    <div className="">
      <div className="container mx-auto pt-[43px] text-[#0B2239] space-y-8">
        {/* Hero Image */}
        <img
          src="/assets/image/about-us-hero.webp"
          alt="About us hero banner"
          className="w-full h-auto object-cover rounded-lg max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
        />

        {/* Main Heading */}
        <h2 className={`${styles.header} text-[32px]`}>About Us</h2>

        {/* About Us Intro */}
        <div className="space-y-4">
          <p className="text-justify">
            Imagine a world where every individual, no matter where they are or
            what their circumstances might be, has the power to unlock their
            potential through education. At {import.meta.env.VITE_APP_NAME}{" "}
            Sourcing LMS, we’re not just imagining that world—we are building
            it, one learner at a time. We believe that learning is more than a
            pathway to knowledge; it is a catalyst for transformation, a bridge
            to opportunity, and a key to creating a brighter future.
          </p>
        </div>

        {/* Our Story */}
        <div className="space-y-4">
          <h3 className="text-[24px] font-semibold">Our Story</h3>
          <p className="text-justify">
            Our journey begins with {import.meta.env.VITE_APP_NAME} Outsourcing,
            Nigeria’s foremost HR and workforce solutions provider. For years,
            we’ve been at the heart of connecting people with meaningful
            employment, witnessing firsthand the profound impact that skills and
            knowledge can have on lives and communities. But we also saw a
            challenge: not everyone had equal access to the education needed to
            thrive in today’s fast-evolving world. That realization sparked a
            bold idea—to extend our expertise into the realm of learning and
            make high-quality education accessible to all.
          </p>
          <p className="text-justify">
            And so, {import.meta.env.VITE_APP_NAME} Sourcing LMS was born. As an
            innovative online platform, we set out to democratize education,
            breaking down barriers of distance, time, and resources. What
            started as a vision has grown into a movement, one that empowers
            individuals and organizations alike to adapt, grow, and succeed in a
            dynamic global landscape.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="space-y-4">
          <h3 className="text-[24px] font-semibold">
            Our Mission &amp; Vision
          </h3>
          <p className="text-justify">
            Our vision is clear: to create a world where every person has the
            opportunity to reach their full potential through learning. Our
            mission is to make that vision a reality by delivering cutting-edge,
            practical, and engaging online learning experiences tailored to the
            needs of learners at every stage of their journey—whether they are
            starting out, leveling up, or chasing a dream.
          </p>
        </div>

        {/* What We Offer */}
        <div className="space-y-4">
          <h3 className="text-[24px] font-semibold">What We Offer</h3>
          <p className="text-justify">
            At {import.meta.env.VITE_APP_NAME} Sourcing LMS, we provide a
            diverse and ever-growing catalog of courses designed to meet the
            demands of today’s world. From technology and business to
            leadership, entrepreneurship, and personal development, our
            offerings are as varied as the aspirations of our learners. Each
            course is:
          </p>
          <ul className="list-disc list-inside text-justify space-y-2">
            <li>
              <strong>Expertly Crafted:</strong> Designed by industry leaders
              and taught by passionate, experienced instructors.
            </li>
            <li>
              <strong>Practical:</strong> Focused on real-world skills you can
              apply immediately, not just theory on a page.
            </li>
            <li>
              <strong>Flexible:</strong> Self-paced and accessible from
              anywhere, on any device, so you can learn on your terms.
            </li>
          </ul>
          <p className="text-justify">
            Whether you are an aspiring entrepreneur looking to launch a
            business, a professional aiming to pivot into a new career, or
            someone simply eager to explore a new passion, we have got you
            covered. Our platform is built to be intuitive and user-friendly,
            ensuring that your focus remains on learning, not logist
            {import.meta.env.VITE_APP_NAME}.
          </p>
        </div>

        {/* What Sets Us Apart */}
        <div className="space-y-4">
          <h3 className="text-[24px] font-semibold">What Sets Us Apart</h3>
          <p className="text-justify">
            We are more than just an online learning platform—we are a partner
            in your transformation. Here is what makes us unique:
          </p>
          <ul className="list-disc list-inside text-justify space-y-2">
            <li>
              <strong>Rooted in Expertise:</strong> As part of{" "}
              {import.meta.env.VITE_APP_NAME} Outsourcing, we bring decades of
              insight into workforce trends and skills gaps, ensuring our
              courses are always relevant and forward-thinking.
            </li>
          </ul>
          <p className="text-justify">
            <strong>Core Principles:</strong>
          </p>
          <ul className="list-disc list-inside text-justify space-y-2">
            <li>
              <strong>Accessibility:</strong> Education should know no
              boundaries. We are here for everyone, everywhere.
            </li>
            <li>
              <strong>Quality:</strong> We settle for nothing less than
              excellence in our curriculum and instructors.
            </li>
            <li>
              <strong>Practicality:</strong> We prioritize skills that matter—
              tools you can use today to shape your tomorrow.
            </li>
            <li>
              <strong>Community:</strong> We foster a global network of learners
              and leaders who inspire and support one another.
            </li>
          </ul>
          <p className="text-justify">
            <strong>A Focus on Transformation:</strong> We don’t just teach; we
            empower. Every course is a step toward a bigger goal, a better you,
            and a stronger future.
          </p>
        </div>

        {/* Why Learn With Us */}
        <div className="space-y-4">
          <h3 className="text-[24px] font-semibold">Why Learn With Us?</h3>
          <p className="text-justify">
            Learning with {import.meta.env.VITE_APP_NAME} Sourcing LMS is not
            just about gaining knowledge—it is about changing your life. Our
            courses offer:
          </p>
          <ul className="list-disc list-inside text-justify space-y-2">
            <li>
              <strong>Flexibility:</strong> Study when and where it suits you,
              fitting education into your busy life.
            </li>
            <li>
              <strong>Immediate Impact:</strong> Gain skills that translate
              directly to your career, projects, or personal growth.
            </li>
            <li>
              <strong>Support:</strong> Join a community that cheers you on,
              with resources and guidance at every turn.
            </li>
          </ul>
          <p className="text-justify">
            We have seen learners go from uncertainty to confidence, from ideas
            to action, from jobs to careers. That’s the power of education, and
            it’s what drives us every day.
          </p>
        </div>

        {/* Join Us on the Journey */}
        <div className="space-y-4 pb-8">
          <h3 className="text-[24px] font-semibold">Join Us on the Journey</h3>
          <p className="text-justify">
            At {import.meta.env.VITE_APP_NAME} Sourcing LMS, we’re not just
            offering courses—we are inviting you to be part of something bigger.
            A community of dreamers, doers, and changemakers. A place where your
            growth becomes our legacy.
          </p>
          <p className="text-justify">
            Take the first step today. Explore our courses, connect with our
            community, and discover how learning can transform your life. With
            {import.meta.env.VITE_APP_NAME} Sourcing LMS, the possibilities are
            endless, and your future is waiting.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
