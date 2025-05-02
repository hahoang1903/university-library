import { signOut } from "@/auth";
import BookList from "@/components/book/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { redirect } from "@/i18n/navigation";

const MyProfilePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut({ redirect: false });
          redirect({ href: "/sign-in", locale });
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default MyProfilePage;
