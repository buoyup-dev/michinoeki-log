import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/features/auth/LoginForm";

export const metadata: Metadata = {
  title: "ログイン",
};

export default async function LoginPage(props: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await props.searchParams;

  return (
    <>
      <h1 className="mb-6 text-center text-xl font-bold text-gray-900">
        ログイン
      </h1>

      {error === "callback_error" && (
        <div role="alert" className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          認証に失敗しました。もう一度お試しください。
        </div>
      )}

      <LoginForm next={next} />

      <p className="mt-6 text-center text-sm text-gray-600">
        アカウントをお持ちでない方は{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          新規登録
        </Link>
      </p>
    </>
  );
}
