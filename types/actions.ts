/** エラーコード */
export type ActionErrorCode =
  | "UNAUTHORIZED"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR";

/** Server Actions のエラー型 */
export type ActionError = {
  code: ActionErrorCode;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

/** Server Actions の統一戻り値型 */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: ActionError };

/** useActionState 用の初期値を含む状態型 */
export type ActionState<T = void> = ActionResult<T> | null;
