import MainHeading from "@/common/MainHeading";
import { Button } from "@/common/Button/index";
import { Icons } from "@/assets/Index";

import { useSession } from "@/sessionManager/SessionContext";

const WhyManualEstimating = () => {
  const { theme } = useSession();
  const ThirdBoxContent = {
    heading: "Why Manual Estimating Holds You Back",

    button: "Enough guessing – get AI precision",
    cards: [
      {
        image: Icons?.landingCard1,
        bg: "bg-semi_blue dark:bg-semi-dark",
        class: "justify-end",
        title: "Too Much Manual Work",
        bgPositionClass: "-top-28 ",
        description:
          "Endless hours spent on takeoffs, spreadsheets, and calculations kill productivity.",
      },
      {
        image:
          theme === "light" ? Icons?.landingCard2Light : Icons?.landingCard2,
        bg: "bg-semi_blue dark:bg-semi-dark",
        title: "Error-Prone Estimates",
        class: "justify-start",
        bgPositionClass: "",
        description:
          "Manual input leads to costly mistakes—5–10% overruns are common.",
      },
      {
        image: Icons?.landingCard3,
        bg: "bg-semi_blue dark:bg-semi-dark",
        title: "Thin Margins, Big Risks",
        class: "justify-center",
        bgPositionClass: "w-full ",

        description:
          "With average profits around 5%, even small miscalculations can wipe out earnings.",
      },
      {
        image:theme ==="light" ? Icons?.landingCard4Light :Icons?.landingCard4,
        bg: "bg-semi_blue dark:bg-semi-dark",
        title: "Missed Opportunities",
        class: "justify-start",
        description:
          "Slow bids mean fewer chances to win projects and grow revenue.",
        className: "absolute bottom-0 -z-0",
        bgPositionClass: "-bottom-28",
      },
    ],
  };
  return (
    <div className="py-4 -center">
      <MainHeading
        heading={ThirdBoxContent.heading}
        classname="sm:text-center md:text-start"
      />
      <p className="text-mid-gray dark:text-white text-lg font-medium text-center">
        Slow estimates cost you bids and profits
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-7 gap-6 px-5">
        {/* Card 1 */}
        {ThirdBoxContent?.cards?.map((item, index) => (
          <div
            key={index}
            className={`text-white relative shadow-md hover:shadow-lg rounded-3xl min-h-[300px] overflow-hidden group transition-all duration-300 ${item?.bg}`}
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
                <h3 className="text-lg text-center font-semibold mb-4 leading-tight text-black dark:text-white">
                  {item?.title}
                </h3>

                <p className="text-sm text-center  leading-relaxed text-gray dark:text-white">
                  {item?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          text={ThirdBoxContent.button}
          path=""
          classname="rounded-full bg-transparent hover:bg-transparent dark:hover:bg-transparent !text-blue border-blue dark:bg-transparent border"
        />
      </div>
    </div>
  );
};

export default WhyManualEstimating;
