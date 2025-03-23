import "../styles/globals.css";
import { geistSans, geistMono } from "../styles/fonts";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "@/Providers";
import "@ant-design/v5-patch-for-react-19";
import LoadingCustom from "@/components/LoadingCustom";
// import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ThemeProvider attribute="class"> */}
        <Providers>
          {children}
          <LoadingCustom />
        </Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
