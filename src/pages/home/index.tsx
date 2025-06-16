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
      <section className="bg-[#134587]">
        <div className="grid grid-cols-12 text-white container mx-auto">
          <div className="col-start-1 col-end-7 leading-normal h-full flex flex-col items-center justify-center">
            <div className="space-y-4">
              <SparklesTextComp
                text="Empower Your Future with Flexible Learning"
                className="text-[54px] font-bold"
              />
              <p className="text-justify">
                Our programs cater to both professional and company needs,
                aiming to enhance careers and drive organizational success.
              </p>
            </div>
          </div>
          <div className="col-start-8 col-end-13">
            <img
              src="/assets/image/hero-img.webp"
              alt="A student smiling with books"
              className="w-full h-auto object-cover rounded-lg max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
            />
          </div>
        </div>
      </section>

      <main className="space-y-16 pt-[48px]">
        <section className="container mx-auto">
          <div className="space-y-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B2239] text-center">
              View Our Course Catalogue
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20">
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
        </section>

        {/* courses */}
        <section>
          <div className="container mx-auto space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 mx-auto">
                {Array.from({length: 8}).map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {courses.map((course: CourseInterface) => (
                    <div>
                      <div>
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
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-start">
                  <div className="flex justify-center">
                    <Button onClick={() => navigate("/courses")}>
                      Show more
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="space-y-16">
          {/* <div className="">
            <HowItWorks />
          </div> */}

          {/* About us */}
          <div className="container mx-auto">
            <h2 className="text-center text-[32px] font-bold mb-[52px]">
              About Us
            </h2>

            <div className="grid grid-cols-12 items-start">
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
                <p className="text-justify">
                  At {import.meta.env.VITE_APP_NAME} LMS, we are transforming
                  lives through the power of knowledge. As an extension of ICS
                  Outsourcing, Nigeria’s leading HR and workforce solutions
                  provider, we are driven by a vision to create sustainable
                  opportunities and empower individuals to thrive in a dynamic
                  world. Our mission is to deliver world-class learning
                  experiences that ignite potential, blending innovation,
                  integrity, and accessibility. We offer expertly crafted
                  courses—from leadership and technology to personal growth and
                  entrepreneurship—taught by industry trailblazers and top
                  educators. Whether you are upskilling for a career pivot,
                  launching a business, or chasing a passion, our flexible,
                  on-demand platform delivers practical skills you can apply
                  today, anywhere, on any device. Join a global community of
                  learners and leaders at {import.meta.env.VITE_APP_NAME}
                  LMS. Your growth is our legacy—start your journey now.
                </p>

                <Button
                  className="rounded-full text-white bg-[#134587]"
                  onClick={() => {
                    navigate("/about");
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
                  supportButtonUrl="mailto:learning@{import.meta.env.VITE_APP_NAME}outsourcing.com"
                  supportDescription="Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance."
                  supportHeading="Need more support?"
                  items={faqItems}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <div>
        <Footer />
      </div>
    </div>
  );
}
