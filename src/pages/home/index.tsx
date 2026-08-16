import AboutUsCard from "@/components/about-us-card";
import AnimatedTestimonialsComp from "@/components/animated-testimonials";
import { CatalogCard } from "@/components/catalog-card";
import { CourseCard } from "@/components/course-card";
import { CourseCardSkeleton } from "@/components/course-card-skeleton";
import Footer from "@/components/footer";
import { SparklesTextComp } from "@/components/sparkle-paragraph";
import { Faq3 } from "@/components/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WhyChooseUs from "@/components/why-choose-card";
import { catalogue, faqItems } from "@/data/static-card";
import { useGetHomePageCourses } from "@/hooks/use-course";
import { CourseInterface } from "@/interfaces/course.interface";
import { BookOpen, Search, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetHomePageCourses();
  const [searchQuery, setSearchQuery] = useState("");

  const courses = (!isLoading && data?.data?.courses) || [];

  const filteredCatalogue = catalogue.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Header & Subtitle */}
          <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Learning Tracks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2239] tracking-tight">
              View Our Course Catalogue
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Discover industry-vetted career tracks designed to build practical, job-ready skills in technology, business, design, and beyond.
            </p>
          </div>

          {/* Search & Quick Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto bg-muted/40 p-2 sm:p-3 rounded-2xl border border-border/60">
            <div className="relative w-full sm:max-w-xs group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Filter categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-9 h-10 text-xs sm:text-sm rounded-xl border-border/80 bg-background focus-visible:ring-2 focus-visible:ring-primary/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium self-end sm:self-center">
              <span>Showing <strong>{filteredCatalogue.length}</strong> of <strong>{catalogue.length}</strong> categories</span>
            </div>
          </div>

          {/* Catalogue Grid / Empty State */}
          {filteredCatalogue.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredCatalogue.map((category) => (
                <CatalogCard
                  title={category.title}
                  category={category.category}
                  key={category.title}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl bg-muted/30 border border-dashed border-border space-y-3 max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto" />
              <h3 className="font-bold text-base text-foreground">No categories found</h3>
              <p className="text-xs text-muted-foreground">
                We couldn't find any category matching "{searchQuery}".
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="rounded-full text-xs"
              >
                Clear Search
              </Button>
            </div>
          )}
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
