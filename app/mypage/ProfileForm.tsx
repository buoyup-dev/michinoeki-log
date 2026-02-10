"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/profile";
import type { ActionState } from "@/types/actions";

type ProfileFormProps = {
  displayName: string;
};

export function ProfileForm({ displayName }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, null as ActionState);
  const fieldErrors = state && !state.success ? state.error.fieldErrors : undefined;

  return (
    <form action={formAction} className="space-y-4">
      {state?.success && (
        <div role="status" className="rounded-md bg-green-50 p-3 text-sm text-green-700">
          プロフィールを更新しました。
        </div>
      )}
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
          defaultValue={displayName}
          required
          aria-invalid={!!fieldErrors?.displayName}
          aria-describedby={fieldErrors?.displayName ? "displayName-error" : undefined}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {fieldErrors?.displayName && (
          <p id="displayName-error" className="mt-1 text-xs text-red-600">{fieldErrors.displayName[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "更新中..." : "更新する"}
      </button>
    </form>
  );
}
