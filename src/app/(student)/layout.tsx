import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: AuthLayoutProps) {
  return (
    <div className="container">
      <Header />

      <div className="container pt-2 w-full min-h-[600px] h-auto flex sm:flex-row flex-col">
        {children}
      </div>
    </div>
  );
}
