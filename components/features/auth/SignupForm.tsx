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
        <label htmlFor="displayName" className="block text-sm font-medium text-foreground">
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
          className="mt-1 block w-full rounded-md border border-border px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {fieldErrors?.displayName && (
          <p id="displayName-error" className="mt-1 text-xs text-red-600">{fieldErrors.displayName[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
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
          className="mt-1 block w-full rounded-md border border-border px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {fieldErrors?.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600">{fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
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
          className="mt-1 block w-full rounded-md border border-border px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <p id="password-hint" className="mt-1 text-xs text-muted-foreground">8文字以上</p>
        {fieldErrors?.password && (
          <p id="password-error" className="mt-1 text-xs text-red-600">{fieldErrors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "登録中..." : "新規登録"}
      </button>
    </form>
  );
}
