"use client";

import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth";
import type { ActionState } from "@/types/actions";

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUp, null as ActionState);
  const fieldErrors = state && !state.success ? state.error.fieldErrors : undefined;

  return (
    <form action={formAction} className="space-y-4">
      {state && !state.success && state.error.message && (
        <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {state.error.message}
        </div>
      )}

      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
          表示名
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!fieldErrors?.displayName}
          aria-describedby={fieldErrors?.displayName ? "displayName-error" : undefined}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {fieldErrors?.displayName && (
          <p id="displayName-error" className="mt-1 text-xs text-red-600">{fieldErrors.displayName[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!fieldErrors?.email}
          aria-describedby={fieldErrors?.email ? "email-error" : undefined}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {fieldErrors?.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600">{fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={!!fieldErrors?.password}
          aria-describedby="password-hint password-error"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p id="password-hint" className="mt-1 text-xs text-gray-500">8文字以上</p>
        {fieldErrors?.password && (
          <p id="password-error" className="mt-1 text-xs text-red-600">{fieldErrors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "登録中..." : "新規登録"}
      </button>
    </form>
  );
}
