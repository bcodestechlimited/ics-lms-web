import {Link} from "react-router";

const styles = {
  header: `text-[14px] font-bold leading-[22px]`,
};

export default function Footer() {
  return (
    <div className="border-t mt-[150px]">
      <footer className="container mx-auto pt-10 text-sm">
        <div className="grid grid-cols-4 gap-12">
          {/* logo */}
          <div>
            <img
              src="/assets/image/logo-black.png"
              alt="Footer logo of Logira LMS"
              className="h-14"
            />
          </div>

          {/* company */}
          <div className="space-y-4">
            <h4 className={styles.header}>Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about">About Us</Link>
              </li>

              <li>
                <Link to={"/terms-and-condition"}>Terms</Link>
              </li>
            </ul>
          </div>

          {/* legal */}
          <div className="space-y-4">
            <h4 className={styles.header}>Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to={"/terms-and-condition"}>Terms</Link>
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
              <a
                href="https://www.linkedin.com/company/ics-outsourcing-nigeria-limited/"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                <img
                  src="/assets/image/linkedin-icon.svg"
                  alt="linkedin icon"
                />
              </a>

              <a
                href="https://www.facebook.com/share/16JJYfeoF4/"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                <img
                  src="/assets/image/facebook-icon.svg"
                  alt="facebook icon"
                />
              </a>

              <a
                href="https://www.instagram.com/icsoutsourcinglimited?igsh=bHlzdzRlMmo3anJ6"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                <img
                  src="/assets/image/instagram-icon.svg"
                  alt="instagram icon"
                />
              </a>
            </div>
            <div>
              <p className="text-sm">
                6, Olusoji Idowu Street, Ilupeju, Obanikoro Bus-Stop, Lagos
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <article className="flex items-center justify-center gap-x-1 text-[12px] font-medium">
            <p>
              Copyright &copy; {new Date().getUTCFullYear()}{" "}
              {import.meta.env.VITE_APP_NAME}. All rights reserved.
            </p>
            <p>|</p>
            <p>Developed and Managed by BCT Limited</p>
          </article>
        </div>
      </footer>
    </div>
  );
}
