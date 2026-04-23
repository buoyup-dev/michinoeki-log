"use client";

import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export type DevToggleItem = {
  id: string;
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

type DevModeSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toggles: DevToggleItem[];
  onReset: () => void;
};

export function DevModeSheet({ open, onOpenChange, toggles, onReset }: DevModeSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="flex max-h-[85vh] flex-col gap-0 rounded-t-2xl"
      >
        <SheetHeader className="flex-row items-center justify-between">
          <div>
            <SheetTitle>開発モード</SheetTitle>
            <SheetDescription className="sr-only">
              開発用の機能を切り替えます
            </SheetDescription>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="閉じる"
          >
            <X className="size-5" />
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <ul className="flex flex-col divide-y divide-border">
            {toggles.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.description && (
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={item.value}
                  onClick={() => item.onChange(!item.value)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                    item.value ? "bg-blue-500" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block size-4 rounded-full bg-white transition-transform ${
                      item.value ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* フッター */}
        <div className="border-t border-border px-4 py-3">
          <div className="mx-auto flex max-w-md gap-3">
            <button
              type="button"
              onClick={onReset}
              className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              リセット
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              閉じる
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
