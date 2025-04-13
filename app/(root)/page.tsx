import BookList from "@/components/book/BookList";
import BookOverview from "@/components/book/BookOverview";
import { sampleBooks } from "@/constants";

export default function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />

      <BookList
        title="Popular Books"
        books={sampleBooks}
        containerClassName="mt-24"
      />
    </>
  );
}
