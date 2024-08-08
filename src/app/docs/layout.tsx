import { DocsHeader } from "@/layout/header/docsHeader";
import { SideBar } from "@/layout/sidebar/documentationSideBar";

interface IProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: IProps) {
  return (
    <section>
      <DocsHeader />
      <main className="pt-[50px] flex">
        <SideBar />
        <div className="h-[calc(100vh-50px)] flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </section>
  );
}
