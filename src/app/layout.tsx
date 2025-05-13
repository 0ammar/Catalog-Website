import { Navbar, Searchbar, Footer, Container } from "@/Components/Layout";
import "./layout.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Al Mutasaweq Catalog",
  description: "مرحبًا بك في كتالوج المتسوق",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Container>
          <Navbar />
          <Searchbar />
          {children}
          <Footer />
        </Container>
      </body>
    </html >
  );
}
