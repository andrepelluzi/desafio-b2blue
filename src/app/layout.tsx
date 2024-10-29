import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import CustomThemeProvider from "@/components/ThemeProvider";

const font = Roboto({
  subsets: ["latin"],
  weight: [ "300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desafio B2Blue",
  description: "Sistema de Controle de Volume de Armazenamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <CustomThemeProvider>
          <Header title="Desafio B2Blue" />
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
