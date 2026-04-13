"use client";

type MemoTextareaProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  rows?: number;
};

export function MemoTextarea({
  name,
  value,
  onChange,
  maxLength = 200,
  placeholder = "この場所の思い出を書いてみよう",
  rows = 3,
}: MemoTextareaProps) {
  const isOver = value.length > maxLength;
  const isNear = value.length >= maxLength - 20;

  return (
    <div>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 ${
          isOver
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-input focus:border-ring focus:ring-ring"
        }`}
      />
      <div className="mt-0.5 flex items-center justify-end gap-2">
        {isOver && (
          <p className="text-xs text-red-500">{maxLength}文字以内で入力してください</p>
        )}
        <p className={`text-xs ${
          isOver ? "text-red-500 font-medium" : isNear ? "text-orange-500" : "text-muted-foreground"
        }`}>
          {value.length}/{maxLength}
        </p>
      </div>
    </div>
  );
}
