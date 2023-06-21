import ClientOnly from "./components/ClientOnly";
import NavBar from "./components/Navbar/NavBar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToastProvider from "./providers/ToastProvider";
import getCurrentUser from "./actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "TravelShield",
  description: "Travel Smart, Travel Safe",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className} suppressHydrationWarning={true}>
        <ClientOnly>
          <ToastProvider />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
