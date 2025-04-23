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
    <Card className="w-full shadow-none p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/10">
      <div className="flex items-center gap-4">
        <span className="w-12 h-12 flex items-center justify-center rounded-xl backdrop-blur-md bg-white/20">
          {icon}
        </span>
        <p className="text-lg font-medium text-[#222]">{text}</p>
      </div>
    </Card>
  );
}
