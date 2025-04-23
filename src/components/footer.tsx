import { Link } from "react-router";

const styles = {
  header: `text-[14px] font-bold leading-[22px]`,
};

export default function Footer() {
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
                <Link to="/about-us">About Us</Link>
              </li>
              <li>FAQ</li>
              <li>Terms</li>
            </ul>
          </div>

          {/* product */}
          <div className="space-y-4">
            <h4 className={styles.header}>Product</h4>
            <ul className="space-y-2">
              <li>Leadership</li>
              <li>Human Resources</li>
              <li>Leadership</li>
            </ul>
          </div>

          {/* legal */}
          <div className="space-y-4">
            <h4 className={styles.header}>Legal</h4>
            <ul className="space-y-2">
              <li>Terms</li>
              <li>Privacy</li>
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
