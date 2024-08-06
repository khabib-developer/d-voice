import { DocsHeader } from "@/layout/header/docsHeader";
import { DocumentationPage } from "@/view/documentation";
import { Fragment } from "react";

export default function Docs() {
  return (
    <Fragment>
      <DocsHeader />
      <DocumentationPage />
    </Fragment>
  );
}
