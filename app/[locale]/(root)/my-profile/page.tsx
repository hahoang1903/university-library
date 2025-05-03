"use client";

import BookList from "@/components/book/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { useLogoutClicked } from "@/contexts/LogoutClickedContext";
import { signOut } from "next-auth/react";

const MyProfilePage = () => {
  const { setIsLogoutClicked } = useLogoutClicked();

  const onLogout = async () => {
    // use signOut client-side to broadcast to all tabs
    // and let the useSession hook in Header handle the redirect
    await signOut({ redirect: false });
    setIsLogoutClicked(true);
  };

  return (
    <>
      <Button className="mb-10" onClick={onLogout}>
        Logout
      </Button>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default MyProfilePage;
