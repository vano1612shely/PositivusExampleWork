import "./style.scss";
import { ComponentPropsWithRef, FC } from "react";
import Logo from "@/components/ui/logo";
import { menuItems } from "@/components/menu";
import LinkedIn from "@assets/linkedin2.svg?react";
import Twitter from "@assets/twitter.svg?react";
import Facebook from "@assets/facebook.svg?react";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
const Footer: FC<ComponentPropsWithRef<"footer">> = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Logo variant="light" className="footer__logo" />
        <ul className="footer__menu-list">
          {menuItems.map((item, index) => {
            return (
              <li className="footer__menu-item" key={index}>
                <a href={item.link} className="footer__menu-link">
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <ul className="footer__social-list">
          <li className="footer__social-item">
            <a href="#" className="footer__social-link">
              <LinkedIn className="footer__social-img" />
            </a>
          </li>
          <li className="footer__social-item">
            <a href="#" className="footer__social-link">
              <Twitter className="footer__social-img" />
            </a>
          </li>
          <li className="footer__social-item">
            <a href="#" className="footer__social-link">
              <Facebook className="footer__social-img" />
            </a>
          </li>
        </ul>
        <div className="footer__contact">
          <Label variant="primary">Contact us:</Label>
          <p>Email: info@positivus.com</p>
          <p>Phone: 555-567-8901</p>
          <p>Address: 1234 Main St Moonstone City, Stardust State 12345</p>
        </div>
        <div className="footer__subscribe">
          <Input type="email" name="subscribe_email" placeholder="Email" />
          <Button variant="primary">Subscribe to news</Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
