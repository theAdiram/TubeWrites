
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-lg font-bold tracking-tighter">
              insight<span className="text-primary/80">.</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Extract valuable insights from YouTube videos and convert them into well-structured research papers.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Get in Touch</h4>
            <p className="text-sm text-muted-foreground">
              Have questions or feedback? <br />
              <a href="mailto:support@insight.app" className="hover:text-foreground transition-colors">
                support@insight.app
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Insight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
