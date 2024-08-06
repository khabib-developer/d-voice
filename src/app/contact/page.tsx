import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { ContactPage } from "@/view/contact";
import { Fragment } from "react";

export default function Contact() {
  return (
    <Fragment>
      <Header />
      <ContactPage />
      <Footer />
    </Fragment>
  );
}
