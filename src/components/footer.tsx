import {Link} from "react-router";

const styles = {
  header: `text-[14px] font-bold leading-[22px]`,
};

export default function Footer() {
  return (
    <div className="border-t mt-16 sm:mt-24 lg:mt-32 pb-20 sm:pb-8 bg-background">
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* logo */}
          <div className="space-y-4">
            <img
              src="/assets/image/logo-black.png"
              alt="Footer logo of Logira LMS"
              className="h-10 sm:h-12 w-auto"
            />
          </div>

          {/* company */}
          <div className="space-y-3">
            <h4 className={styles.header}>Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
              </li>

              <li>
                <Link to={"/terms-and-condition"} className="hover:text-foreground transition-colors">Terms</Link>
              </li>
            </ul>
          </div>

          {/* legal */}
          <div className="space-y-3">
            <h4 className={styles.header}>Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to={"/terms-and-condition"} className="hover:text-foreground transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* social */}
          <div className="space-y-4">
            <h4 className={styles.header}>Connect With Us</h4>
            <div className="flex items-center gap-x-4">
              <a
                href="https://www.linkedin.com/company/ics-outsourcing-nigeria-limited/"
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/assets/image/linkedin-icon.svg"
                  alt="linkedin icon"
                  className="w-6 h-6"
                />
              </a>

              <a
                href="https://www.facebook.com/share/16JJYfeoF4/"
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/assets/image/facebook-icon.svg"
                  alt="facebook icon"
                  className="w-6 h-6"
                />
              </a>

              <a
                href="https://www.instagram.com/icsoutsourcinglimited?igsh=bHlzdzRlMmo3anJ6"
                target="_blank"
                referrerPolicy="no-referrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/assets/image/instagram-icon.svg"
                  alt="instagram icon"
                  className="w-6 h-6"
                />
              </a>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                6, Olusoji Idowu Street, Ilupeju, Obanikoro Bus-Stop, Lagos
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <article className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-[12px] font-medium text-muted-foreground">
            <p>
              Copyright &copy; {new Date().getUTCFullYear()}{" "}
              {import.meta.env.VITE_APP_NAME}. All rights reserved.
            </p>
            <span className="hidden sm:inline">|</span>
            <p>Developed and Managed by BCT Limited</p>
          </article>
        </div>
      </footer>
    </div>
  );
}
