import { Book } from "@/types/book";
import { Link } from "@/i18n/navigation";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

const BookCard = ({ id, title, genre, color, cover, isLoanedBook }: Book) => {
  return (
    <li
      className={cn(
        "xs:max-w-40 w-full",
        isLoanedBook ? "max-w-full" : "max-w-28"
      )}
    >
      <Link
        href={`/books/${id}`}
        className={cn(
          isLoanedBook && "w-full flex flex-col xs:items-start items-center"
        )}
      >
        <BookCover coverColor={color} coverImage={cover} />

        <div className="mt-4">
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left</p>
            </div>

            <Button className="book-btn">Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
};
export default BookCard;
