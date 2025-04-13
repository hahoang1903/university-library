import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

type Props = {
  coverImage?: string;
  coverColor?: string;
  variant?: BookCoverVariant;
  className?: string;
};

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div className="absolute left-[12%] z-10 h-[88%] w-[87.5%]">
        <Image
          src={coverImage}
          alt="book-cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};
export default BookCover;
