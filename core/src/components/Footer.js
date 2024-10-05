import React from "react";
import Link from "next/link";
import Image from "next/image";

import logos from "@/content/settings/logos.json";
import mainMenu from "@/content/settings/mainMenu.json";
import general from "@/content/settings/general.json";
import business from "@/content/settings/business.json";
import theme from "@/content/settings/theme.json";

const Footer = () => {
  return (
    <footer>
      <div className="main-footer">
        <div className="left footer-bottom">
          <Link href="/">
            <Image
              src={logos.markLogo || "/brandimages/logomark.png"}
              alt={"logo mark"}
              width={52}
              height={52}
            />
          </Link>
        </div>
        {theme?.header?.bottomMainMenu ? (
          <div className="right footer-bottom">
            {mainMenu?.mainMenu?.map((item, itemIndx) => (
              <Link key={itemIndx} href={"/" + item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <hr />
        <p>
          <small>{general.footerText}</small>
        </p>
        <br />
        <p>
          © {new Date().getFullYear()} {business.brandName}. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
