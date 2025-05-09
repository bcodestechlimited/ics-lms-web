import AboutUsCard from "@/components/about-us-card";
import AnimatedTestimonialsComp from "@/components/animated-testimonials";
import {CatalogCard} from "@/components/catalog-card";
import {CourseCard} from "@/components/course-card";
import {CourseCardSkeleton} from "@/components/course-card-skeleton";
import Footer from "@/components/footer";
import {SparklesTextComp} from "@/components/sparkle-paragraph";
import {Faq3} from "@/components/support";
import {Button} from "@/components/ui/button";
import WhyChooseUs from "@/components/why-choose-card";
import {catalogue, faqItems} from "@/data/static-card";
import {useGetHomePageCourses} from "@/hooks/use-course";
import {CourseInterface} from "@/interfaces/course.interface";
import {useNavigate} from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const {data, isLoading} = useGetHomePageCourses();

  const courses = (!isLoading && data?.responseObject?.docs) || [];

  return (
    <div>
      <div className="bg-[#134587]">
        <div className="grid grid-cols-12 text-white container mx-auto">
          <div className="col-start-1 col-end-7 leading-normal h-full flex flex-col items-center justify-center">
            <div className="space-y-4">
              <SparklesTextComp
                text="Empower Your Future with Flexible Learning"
                className="text-[54px] font-bold"
              />
              <p className="">
                Our programs cater to both professional and company needs,
                aiming to enhance careers and drive organizational success.
              </p>
            </div>
          </div>
          <div className="col-start-8 col-end-13">
            <img
              src="/assets/image/hero-img.webp"
              alt="A student smiling with books"
              className="h-[370px] w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="py-[102px] container mx-auto space-y-16">
        <div className="space-y-12">
          <h2 className="text-[32px] font-bold text-[#0B2239] mb-[30px]">
            View Our Course Catalogue
          </h2>
          <div className="grid xl:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {catalogue.map((category) => {
              return (
                <CatalogCard
                  title={category.title}
                  category={category.category}
                  key={category.title}
                />
              );
            })}
          </div>
        </div>

        {/* courses */}
        <div className="">
          <div className="relative grid grid-cols-4 gap-8 mb-12">
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <CourseCardSkeleton key={index} />
                ))
              : courses?.map((course: CourseInterface) => {
                  return (
                    <CourseCard
                      key={course._id + course.updatedAt}
                      description={course.description}
                      updatedAt={course.updatedAt}
                      image={course.image}
                      title={course.title}
                      instructor="L&D Team"
                      _id={course._id}
                      summary={course.summary}
                    />
                  );
                })}
          </div>
          <div className="flex items-center justify-start gap-x-4">
            <Button
              onClick={() => {
                navigate("/courses");
              }}
            >
              Show more
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {/* <div className="">
          <HowItWorks />
        </div> */}

        {/* About us */}
        <div className="container mx-auto">
          <h2 className="text-center text-[32px] font-bold mb-[52px]">
            About Us
          </h2>

          <div className="grid grid-cols-12 items-center">
            <div className="col-start-1 col-end-5">
              <div className="">
                <img
                  src={"assets/image/about-us.webp"}
                  alt="About us"
                  className="w-full object-cover h-[400px] rounded-xl"
                />
              </div>
            </div>
            <div className="col-start-6 col-end-13 space-y-6">
              <div>
                <p>
                  Welcome to ICS Sourcing Academy where learning meets limitless
                  possibilities. Our platform is designed to empower individuals
                  from diverse backgrounds to pursue their educational goals
                  with ease. It is our goal to make learning accessible,
                  engaging, and impactful for all. We believe that education is
                  the key to personal growth, professional success, and societal
                  advancement.
                </p>
              </div>

              <div className="mb-[54px]">
                <h3 className="text-[24px] font-bold leading-normal">
                  What We Offer
                </h3>
                <p>
                  Wide Range of Subjects: Explore a rich variety of courses in
                  Business, Management, Personal Development and more. Whether
                  you are passionate about self development eager to learn a
                  skill, or interested in mastering business dynamics, we have
                  something for everyone.
                </p>
              </div>

              <Button
                className="rounded-full text-white bg-[#134587]"
                onClick={() => {
                  window.location.href = "/about";
                }}
              >
                Read More
              </Button>
            </div>
          </div>
        </div>

        {/* About us stat */}
        <div className="">
          <AboutUsCard />
        </div>

        {/* why choose us */}
        <div className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 items-center">
              <div className="col-start-1 col-end-6">
                <div className="mb-[48px]">
                  <h3 className="text-[32px] font-bold leading-normal">
                    Why Choose Us For Your Learning Journey
                  </h3>
                  <p className="">
                    Start building your career by registering for any of our
                    courses
                  </p>
                </div>
                <div className="space-y-4">
                  <WhyChooseUs />
                </div>
              </div>

              <div className="col-start-7 col-end-13">
                <img
                  src="/assets/image/why-choose-us.webp"
                  alt="Man with a pen writing and smiling"
                  className="object-cover rounded-lg max-h-[530px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* testimonials */}
        <div className="container mx-auto">
          <h3 className="text-[32px] font-bold">
            What our students are saying
          </h3>
          <AnimatedTestimonialsComp />
        </div>

        {/* get in touch  */}
        <div className="">
          <div className="container mx-auto">
            <div>
              <Faq3
                description="Find answers to common questions about our products. Can't find what you're looking for? Contact our support team."
                heading="Frequently asked questions"
                supportButtonText="Contact Support"
                supportButtonUrl="mailto:learning@icsoutsourcing.com"
                supportDescription="Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance."
                supportHeading="Need more support?"
                items={faqItems}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
