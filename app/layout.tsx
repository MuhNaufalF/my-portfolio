// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; // Import Font Keren
import "./globals.css";

// Setup Font
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Naufal Fathin | Portfolio",
  description: "Mahasiswa Informatika UAD, UI/UX Designer, & Videographer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Terapkan font ke body */}
      <body className={`${spaceGrotesk.className} bg-black text-white antialiased selection:bg-blue-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}