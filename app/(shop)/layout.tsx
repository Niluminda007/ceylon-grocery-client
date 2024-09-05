import { QueryProvider } from "@/components/providers/query-provider";
import NavBar from "./_components/nav-bar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ModalProvider from "@/components/providers/modal-provider";
import { Footer } from "./_components/footer";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = async ({ children }: HomeLayoutProps) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <ModalProvider />
        <div className="flex flex-col ">
          <NavBar />
          <main className="relative  min-h-screen z-[10] w-full mt-24 mx-auto ">
            {children}
          </main>
          <Footer />
        </div>
      </QueryProvider>
    </SessionProvider>
  );
};

export default HomeLayout;
