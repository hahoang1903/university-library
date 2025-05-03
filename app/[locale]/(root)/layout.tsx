import type { ReactNode } from "react";
import { auth } from "@/auth";
import Header from "@/components/layout/Header";
import { LogoutClickedProvider } from "@/contexts/LogoutClickedContext";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <LogoutClickedProvider>
          <Header initialSession={session!} />

          <div className="mt-20 pb-20">{children}</div>
        </LogoutClickedProvider>
      </div>
    </main>
  );
};

export default Layout;
