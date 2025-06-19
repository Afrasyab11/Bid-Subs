// import { Icons } from "@/assets/Index";
import { Icons } from "@/assets/Index";
import MainHeading from "@/common/MainHeading";

const features = [
  {
    image: Icons.Speed,
    title: "Speed",
    description: "Save up to 50% of estimate time so you can bid on more jobs.",
  },
  {
    image: Icons.Accuracy,
    title: "Accuracy",
    description:
      "AI analysis slashes manual errors. Helping avoid the 5–10% extra costs from overages.",
  },
  {
    image: Icons.WinRate,
    title: "Win Rates",
    description:
      "Fast turnaround, submit more bids, industry tools have cut takeoff time by 90%.",
  },
  {
    image: Icons.Insights,
    title: "Insights",
    description:
      "Built-in analytics and comparisons highlight the most profitable jobs.",
  },
];

export const SpeedAccuracyProfit = () => {
  return (
    <section className=" px-4 text-center">
      <MainHeading
        heading="Speed, Accuracy, Profit"
        subheading="  Everything you need to win more jobs"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12  mt-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center relative"
          >
            <img src={feature.image} alt={feature.title} />
            <div className="absolute -bottom-3">
              <h3 className="text-lg font-medium text-gray dark:text-white">
                {feature.title}
              </h3>
              <p className="text-md text-gray dark:text-[#FDFFF7E5]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
