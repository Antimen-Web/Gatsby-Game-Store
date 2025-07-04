import * as React from "react";

import Header from "./Header";
import "../css/layout.css";
import Footer from "./Footer";
import AuthModal from "./AuthModal";
import CookieConsent from "./CookieConsent";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <AuthModal />
      <CookieConsent
        onAccept={() => console.log("Accepted cookies")}
        onDecline={() => console.log("Declined cookies")}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
