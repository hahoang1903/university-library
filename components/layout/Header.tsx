"use client";

import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIdleTimer } from "react-idle-timer";
import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const t = useTranslations("Header");
  const router = useRouter();
  const locale = useLocale();
  const { toast } = useToast();

  const onAction = async () => {
    const sessionRes = await fetch("/api/auth/session");
    const _session = await sessionRes.json();
    if (!_session) {
      router.push("/", { locale });
      toast({
        title: "Session expired",
        description: "Your session has expired. Please log in again",
      });
    }
  };

  useIdleTimer({ onAction, throttle: config.env.minTimeToRefreshSession });

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
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || "AN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
