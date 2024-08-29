// app/layout.js
import { ApolloWrapper } from "./ApolloWrapper";
import { Inter } from "next/font/google";
import "./globals.css";
import NavServer from "@/components/NavServer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, isMenuOpen }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={`app ${isMenuOpen ? "blur-content" : ""}`}>
          <NavServer />
          <ApolloWrapper>{children}</ApolloWrapper>
        </div>
      </body>
    </html>
  );
}
