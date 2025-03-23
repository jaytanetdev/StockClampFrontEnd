import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
