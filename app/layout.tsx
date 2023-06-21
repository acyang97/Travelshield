import ClientOnly from "./components/ClientOnly";
import NavBar from "./components/Navbar/NavBar";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "TravelShield",
  description: "Travel Smart, Travel Safe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className} suppressHydrationWarning={true}>
        <ClientOnly>
          <NavBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
