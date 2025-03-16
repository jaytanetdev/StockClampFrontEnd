import "../styles/globals.css";
import { geistSans, geistMono } from "../styles/fonts";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "@/Providers";
import "@ant-design/v5-patch-for-react-19";
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
            <div className="flex flex-col ">
              <Navbar />
              <div className="flex-1 container mx-auto">{children}</div>
            </div>
          </Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
