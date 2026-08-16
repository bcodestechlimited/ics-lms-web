import AboutUsCard from "@/components/about-us-card";
import AnimatedTestimonialsComp from "@/components/animated-testimonials";
import { CatalogCard } from "@/components/catalog-card";
import { CourseCard } from "@/components/course-card";
import { CourseCardSkeleton } from "@/components/course-card-skeleton";
import Footer from "@/components/footer";
import { SparklesTextComp } from "@/components/sparkle-paragraph";
import { Faq3 } from "@/components/support";
import { Button } from "@/components/ui/button";
import WhyChooseUs from "@/components/why-choose-card";
import { catalogue, faqItems } from "@/data/static-card";
import { useGetHomePageCourses } from "@/hooks/use-course";
import { CourseInterface } from "@/interfaces/course.interface";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetHomePageCourses();

  const courses = (!isLoading && data?.data?.courses) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <section className="bg-[#134587] py-10 sm:py-14 lg:py-20 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
            <SparklesTextComp
              text="Empower Your Future with Flexible Learning"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-tight tracking-tight"
            />
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
              Our programs cater to both professional and company needs,
              aiming to enhance careers and drive organizational success.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center w-full">
            <img
              src="/assets/image/hero-img.webp"
              alt="A student smiling with books"
              className="w-full max-w-md lg:max-w-none h-auto object-cover rounded-2xl shadow-xl max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]"
            />
          </div>
        </div>
      </section>

      <main className="space-y-16 sm:space-y-24 pt-10 sm:pt-14">
        {/* Course Catalogue Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B2239] text-center">
            View Our Course Catalogue
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
        </section>

        {/* Featured Courses */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {courses.map((course: CourseInterface) => (
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
                ))}
              </div>
              {courses.length > 0 && (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => navigate("/courses")}
                    className="px-8 py-2.5 rounded-full font-medium"
                  >
                    Show more
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        <section className="space-y-16 sm:space-y-24">
          {/* About us */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl sm:text-3xl md:text-[32px] font-bold mb-8 sm:mb-12">
              About Us
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 flex justify-center w-full">
                <img
                  src={"assets/image/about-us.webp"}
                  alt="About us"
                  className="w-full max-w-lg lg:max-w-none object-cover h-[250px] sm:h-[350px] lg:h-[400px] rounded-xl shadow-md"
                />
              </div>
              <div className="lg:col-span-7 space-y-6 text-left">
                <p className="text-sm sm:text-base leading-relaxed text-gray-700">
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

                <div className="flex justify-start">
                  <Button
                    className="rounded-full text-white bg-[#134587] hover:bg-[#0e3568] px-6"
                    onClick={() => {
                      navigate("/about");
                    }}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* About us stat */}
          <div>
            <AboutUsCard />
          </div>

          {/* Why choose us */}
          <div className="py-8 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="mb-6 sm:mb-8 text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight">
                      Why Choose Us For Your Learning Journey
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                      Start building your career by registering for any of our
                      courses
                    </p>
                  </div>
                  <div className="space-y-4">
                    <WhyChooseUs />
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center w-full">
                  <img
                    src="/assets/image/why-choose-us.webp"
                    alt="Man with a pen writing and smiling"
                    className="w-full max-w-lg lg:max-w-none object-cover rounded-xl shadow-md max-h-[350px] sm:max-h-[450px] lg:max-h-[530px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-center md:text-left">
              What our students are saying
            </h3>
            <AnimatedTestimonialsComp />
          </div>

          {/* FAQ */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Faq3
              description="Find answers to common questions about our products. Can't find what you're looking for? Contact our support team."
              heading="Frequently asked questions"
              supportButtonText="Contact Support"
              supportButtonUrl={`mailto:learning@${import.meta.env.VITE_APP_NAME}outsourcing.com`}
              supportDescription="Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance."
              supportHeading="Need more support?"
              items={faqItems}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
