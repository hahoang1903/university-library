"use client";

import Image from "next/image";
import { useRef } from "react";
import { cn, getInitials } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIdleTimer } from "react-idle-timer";
import { useSession, signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { useLogoutClicked } from "@/contexts/LogoutClickedContext";

const Header = ({ initialSession }: { initialSession: Session }) => {
  const pathname = usePathname();
  const t = useTranslations("Header");
  const router = useRouter();
  const locale = useLocale();
  const { toast } = useToast();
  const unauthenticated = useRef(false);
  const { isLogoutClicked } = useLogoutClicked();

  const onUnauthenticated = () => {
    // for some reason, Authjs called this multiple times
    // so we need to make sure we only redirect once
    if (unauthenticated.current) return;
    unauthenticated.current = true;

    router.push("/", { locale });

    // don't show notification if the user intentionally logged out
    if (!isLogoutClicked) {
      toast({
        title: "Session expired",
        description: "Your session has expired. Please log in again",
      });
    }
  };

  const { data: session } = useSession({ required: true, onUnauthenticated });

  const onAction = async () => {
    if (!navigator.onLine) return;

    const sessionRes = await fetch("/api/auth/session");
    const _session = await sessionRes.json();
    if (!_session) {
      // broadcast to all tabs and let the useSession hook handle the redirect
      await signOut({ redirect: false });
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
                {getInitials((session ?? initialSession)?.user?.name || "AN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
