"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { hasInAppHistory } from "@/components/NavigationTracker";

type BackButtonProps = {
  fallbackHref: string;
  label: string;
};

export function BackButton({ fallbackHref, label }: BackButtonProps) {
  const router = useRouter();

  function handleClick() {
    if (hasInAppHistory()) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
    >
      <ChevronLeft className="h-4 w-4" />
      {label}
    </button>
  );
}
