import { LandingImages } from "../../../../assets/images/Index";
import MainHeading from "../../../../common/MainHeading";

const features = [
  {
    image: LandingImages.Speed,
    title: "Speed",
    description: "Save up to 50% of estimate time so you can bid on more jobs.",
  },
  {
    image: LandingImages.Accuracy,
    title: "Accuracy",
    description:
      "AI analysis slashes manual errors. Helping avoid the 5–10% extra costs from overages.",
  },
  {
    image: LandingImages.WinRate,
    title: "Win Rates",
    description:
      "Fast turnaround, submit more bids, industry tools have cut takeoff time by 90%.",
  },
  {
    image: LandingImages.Insights,
    title: "Insights",
    description:
      "Built-in analytics and comparisons highlight the most profitable jobs.",
  },
];

const Features = () => {
  return (
    <section className="text-white py-16 px-4 text-center">
      <MainHeading
        heading="Speed, Accuracy, Profit"
        subheading="  Everything you need to win more jobs"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img src={feature.image} alt={feature.title} className=" mb-4" />
            <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
            <p className="text-lightgray text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
