import { SparklesText } from "./magicui/sparkles-text";

export function SparklesTextComp({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return <SparklesText text={text} className={className} />;
}
