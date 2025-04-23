import { howItWorksData } from "@/data/static-card";
import { Particles } from "./magicui/particles";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

interface HowItWorksCardInterface {
  title: string;
  description: string;
}

export function HowItWorksCard({
  title,
  description,
}: HowItWorksCardInterface) {
  return (
    <Card className="rounded-[12px] h-[166px]">
      <CardHeader className="text-left">
        <h3 className="text-[20px] leading-normal font-bold">{title}</h3>
      </CardHeader>
      <CardDescription>
        <CardContent className="text-left">
          <p className="text-[14px] leading-normal font-normal">
            {description}
          </p>
        </CardContent>
      </CardDescription>
    </Card>
  );
}

export default function HowItWorks() {
  return (
    <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden bg-background px-[66px] bg-gradient-to-r from-[#fff] to-[#FFF] py-20">
      <h3 className="text-center text-[32px] font-bold leading-normal mb-[40px] text-black">
        How it Works
      </h3>
      <span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-8xl font-semibold leading-none grid grid-cols-3 gap-8">
        {howItWorksData.map((how, i) => {
          return (
            <HowItWorksCard
              key={how.title + i}
              title={how.title}
              description={how.description}
            />
          );
        })}
      </span>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"000"}
        refresh
      />
    </div>
  );
}
