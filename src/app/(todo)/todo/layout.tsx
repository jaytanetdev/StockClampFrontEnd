import { TodoListProvider } from "@/contexts/TodoContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TodoListProvider>{children}</TodoListProvider>;
}
