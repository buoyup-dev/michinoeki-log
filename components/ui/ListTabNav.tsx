import Link from "next/link";

const TABS = [
  { label: "道の駅", href: "/stations" },
  { label: "スポット", href: "/spots" },
] as const;

type Tab = (typeof TABS)[number];

type ListTabNavProps = {
  activeHref: Tab["href"];
};

export function ListTabNav({ activeHref }: ListTabNavProps) {
  return (
    <div className="mb-6 flex gap-0 border-b border-border">
      {TABS.map((tab) => {
        const isActive = activeHref === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
