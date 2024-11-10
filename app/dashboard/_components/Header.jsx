"use client";
import { UserButton } from "@clerk/nextjs";
import { Brain } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <div className="flex flex-row gap-3 items-center">
        <Brain className="text-primary" />
        <p className="hidden md:flex text-primary font-bold text-2xl font-mono">AI Title App</p>
      </div>
      <ul className="flex gap-6">
        <Link href={"/dashboard"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/dashboard" && "text-primary font-bold"}
            `}
          >
            Dashboard
          </li>
        </Link>
        <Link href={"/dashboard-resume"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/dashboard-resume" && "text-primary font-bold"}
            `}
          >
            Resume Builder
          </li>
        </Link>

        <Link href={"/dashboard/upgrade"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/dashboard/upgrade" && "text-primary font-bold"}
            `}
          >
            Upgrade
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
