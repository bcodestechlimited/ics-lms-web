import {useCourseFilterStore} from "@/store/course-filter.store";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router";

const styles = {
  header: `text-[14px] font-bold leading-[22px]`,
};

export default function Footer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localCategory, setLocalCategory] = useState(
    searchParams.get("category") || ""
  );
  const setCategory = useCourseFilterStore((s) => s.setCategory);
  const scrollToTop = () => window.scrollTo(0, 0);

  useEffect(() => {
    const params: Record<string, string> = {};
    setCategory(localCategory);

    params.category = localCategory;
    params.page = "1";
    setSearchParams(params, {replace: true});
    scrollToTop();
  }, [setSearchParams, localCategory, setLocalCategory, setCategory]);

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setLocalCategory("");
    } else {
      setLocalCategory(value);
    }
  };

  return (
    <div className="border-t mt-[150px]">
      <footer className="container mx-auto py-10 text-sm">
        <div className="grid grid-cols-5 gap-12">
          {/* logo */}
          <div>
            <img src="/assets/image/logo.svg" alt="Footer logo of Ics L&D" />
          </div>

          {/* company */}
          <div className="space-y-4">
            <h4 className={styles.header}>Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about">About Us</Link>
              </li>

              <li>
                <Link to={"#"}>Terms</Link>
              </li>
            </ul>
          </div>

          {/* product */}
          <div className="space-y-4">
            <h4 className={styles.header}>Product</h4>
            <ul className="space-y-2">
              <li>
                <button
                  className="px-0 cursor-pointer"
                  onClick={() => {
                    handleCategoryChange("technology");
                  }}
                >
                  Technology
                </button>
              </li>
              <li>
                <button
                  className="px-0 cursor-pointer"
                  onClick={() => {
                    handleCategoryChange("web");
                  }}
                >
                  Web
                </button>
              </li>
              <li>
                <button
                  className="px-0 cursor-pointer"
                  onClick={() => {
                    handleCategoryChange("data science");
                  }}
                >
                  Data Science
                </button>
              </li>
            </ul>
          </div>

          {/* legal */}
          <div className="space-y-4">
            <h4 className={styles.header}>Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to={"#"}>Terms</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              {/* <li>Terms</li> */}
            </ul>
          </div>

          {/* social */}
          <div className="space-y-4">
            <div className="flex items-center gap-x-4">
              <img src="/assets/image/web-icon.svg" alt="web icon" />
              <img src="/assets/image/x-icon.svg" alt="twitter icon" />
              <img src="/assets/image/linkedin-icon.svg" alt="linkedin icon" />
              <img src="/assets/image/facebook-icon.svg" alt="facebook icon" />
              <img
                src="/assets/image/instagram-icon.svg"
                alt="instagram icon"
              />
            </div>
            <div>
              <p className="text-sm">
                6, Olusoji Idowu Street, Ilupeju, Obanikoro Bus-Stop, Lagos
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
