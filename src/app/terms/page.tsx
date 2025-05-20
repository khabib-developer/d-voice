import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { Terms } from "@/view/terms";
import { Fragment } from "react";

const TermsPage = () => {
  return (
    <Fragment>
      <Header />

      <Terms />
      <Footer />
    </Fragment>
  );
};

export default TermsPage;
