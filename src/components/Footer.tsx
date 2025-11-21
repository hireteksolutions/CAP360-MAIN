import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle , Linkedin} from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-black" style={{ backgroundColor: '#CDC9C9' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img
                  src="/cap-uploads/caplogo.png"
                  alt="CAP 360 Logo"
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <p className="text-black-300 mb-4 max-w-md">
              Empowering professionals to achieve their career goals through expert resume design 
              and comprehensive career advancement programs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-black-300">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@cap360.in" className="hover:underline">info@cap360.in</a>
              </div>
              
              <div className="flex items-center text-black-300">
                <Phone size={16} className="mr-2" />
                <span>8700238779</span>
              </div>
              <div className="flex items-center text-black-300">
                <MapPin size={16} className="mr-2" />
                <span>H - 7, Lajpat Nagar 3 New Delhi</span>
              </div>
                </div>
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/cap___360" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://wa.me/919599901561" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white transition-colors">
                <MessageCircle size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/cap360%C2%B0/" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#3570E8' }}>Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/career-program" className="text-black-300 hover:text-white transition-colors">Program</Link></li>
              <li><Link to="/resume-services" className="text-black-300 hover:text-white transition-colors">Resume Services</Link></li>
              <li><Link to="/about" className="text-black-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/success-stories" className="text-black-300 hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="/contact" className="text-black-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#3570E8' }}>Services</h3>
            <ul className="space-y-2 text-black-300">
              <li>Career Coaching</li>
              <li>LinkedIn Optimization</li>
              <li>Interview Preparation</li>
              <li>Resume Design</li>
              <li>Skill Development</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center" style={{ borderTopColor: '#3570E8' }}>
          <p className="text-black-400">
            © 2024 CAP 360. All rights reserved @ Maven Info Solutions OPC Pvt ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}; 

export default Footer;
