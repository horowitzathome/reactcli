import { PageProvider } from "./NavigateContext";
import "./globals.css";
import Image from "next/image";

export const metadata = {
  title: "React Client",
  description: "Created by Georg Nozicka",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Image className="absolute right-0 top-0" src="/cli/next.svg" alt="Next" width={100} height={24} priority />
        <div className="text-2xl text-blue-100 text-center mt-5">Next Test</div>
        <PageProvider>
          <section>{children}</section>
        </PageProvider>
      </body>
    </html>
  );
}
