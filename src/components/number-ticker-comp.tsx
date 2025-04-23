import { NumberTicker } from "./magicui/number-ticker";

export function NumberTickerComp({ value }: { value: number }) {
  return (
    <NumberTicker
      value={value || 100}
      className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-white dark:text-white"
    />
  );
}
