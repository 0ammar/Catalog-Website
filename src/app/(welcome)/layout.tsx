import { Container } from "@/Components/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome",
  openGraph: {
    title: "Welcome",
    type: "website",
  },
  icons: {
    icon: "/app-icon.png",
  },
};

export default function WelcomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <Container>
          {children}
        </Container>
  );
}
