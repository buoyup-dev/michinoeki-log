import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/features/auth/SignupForm";

export const metadata: Metadata = {
  title: "新規登録",
};

export default function SignupPage() {
  return (
    <>
      <h1 className="mb-6 text-center text-xl font-bold text-foreground">
        新規登録
      </h1>

      <SignupForm />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        既にアカウントをお持ちの方は{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:text-primary/80"
        >
          ログイン
        </Link>
      </p>
    </>
  );
}
