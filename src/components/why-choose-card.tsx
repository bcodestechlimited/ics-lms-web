import { GroupIcon, Lightbulb, UserIcon } from "lucide-react";
import { Card } from "./ui/card";

const whyChooseUsCard = [
  {
    icon: <UserIcon className="w-5 h-5" />,
    text: "Book one-on-one session with tutors",
  },
  { icon: <GroupIcon className="w-5 h-5" />, text: "Personalized learning" },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    text: "Support learning community",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="space-y-6">
      {whyChooseUsCard.map((why) => (
        <WhyChooseCard icon={why.icon} text={why.text} key={why.text} />
      ))}
    </div>
  );
}

export function WhyChooseCard({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Card className="w-full shadow-sm p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-md border border-border/60 bg-card">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <p className="text-sm sm:text-base md:text-lg font-medium text-foreground">{text}</p>
      </div>
    </Card>
  );
}
