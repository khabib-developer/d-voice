import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { Privacy } from "@/view/privacy";
import { Fragment } from "react";

const PrivacyPage = () => {
  return (
    <Fragment>
      <Header />
      <Privacy />
      <Footer />
    </Fragment>
  );
};

export default PrivacyPage;
