"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Header = () => {
  const pathname = usePathname();
  const t = useTranslations("Header");

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/"
            className={cn(
              "cursor-pointer text-base capitalize",
              pathname === "/" ? "text-light-200" : "text-light-100"
            )}
          >
            {t("links.home")}
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
