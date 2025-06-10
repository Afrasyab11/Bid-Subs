import MainHeading from "@/common/MainHeading";
import { Button } from "@/common/Button/index";
import { Icons } from "@/assets/Index";
const ThirdBoxContent = {
  heading: "Why Manual Estimating Holds You Back",
  subheading: "Slow estimates cost you bids and profits",
  button: "Enough guessing – get AI precision",
  cards: [
    {
      image: Icons?.landingCard1,
      bg: "#0F1C32",
      class: "justify-end",
      title: "Too Much Manual Work",
      bgPositionClass: "-top-28 ",
      description:
        "Endless hours spent on takeoffs, spreadsheets, and calculations kill productivity.",
    },
    {
      image: Icons?.landingCard2,
      bg: "#0F1C32",
      title: "Error-Prone Estimates",
      class: "justify-start",
      bgPositionClass: "",
      description:
        "Manual input leads to costly mistakes—5–10% overruns are common.",
    },
    {
      image: Icons?.landingCard3,
      bg: "#0F1C32",
      title: "Thin Margins, Big Risks",
      class: "justify-center",bgPositionClass: "w-full ",

      description:
        "With average profits around 5%, even small miscalculations can wipe out earnings.",
    },
    {
      image: Icons?.landingCard4,
      bg: "#0F1C32",
      title: "Missed Opportunities",
      class: "justify-start",
      description:
        "Slow bids mean fewer chances to win projects and grow revenue.",
      className: "absolute bottom-0 -z-0",
      bgPositionClass: "-bottom-28",
    },
  ],
};

const WhyManualEstimating = () => {
  return (
    <div className="py-4 -center">
      <MainHeading heading={ThirdBoxContent.heading} classname="sm:text-center md:text-start" />
      <MainHeading
        subheading={ThirdBoxContent.subheading}
        classname="text-[#9A9EA6]"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-6 px-5">
        {/* Card 1 */}
        {ThirdBoxContent?.cards?.map((item, index) => (
          <div
            key={index}
            className="text-white relative shadow-md hover:shadow-lg rounded-3xl min-h-[300px] overflow-hidden group transition-all duration-300"
            style={{ backgroundColor: item?.bg }}
          >
            <div className={`absolute inset-0 -z-0 ${item?.bgPositionClass}`}>
              <div
                className={`h-full w-full rounded-3xl bg-center  bg-no-repeat  duration-300  `}
                style={{
                  backgroundImage: `url(${item?.image})`,
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 py-10 h-full flex flex-col justify-between">
              <div className={`flex-1 flex flex-col  ${item?.class}`}>
                <h3 className="text-lg text-center font-semibold mb-4 leading-tight">
                  {item?.title}
                </h3>

                <p className="text-sm text-center text-white leading-relaxed">
                  {item?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Button
          text={ThirdBoxContent.button}
          path=""
          classname="rounded-full bg-transparent border"
        />
      </div>
    </div>
  );
};

export default WhyManualEstimating;
