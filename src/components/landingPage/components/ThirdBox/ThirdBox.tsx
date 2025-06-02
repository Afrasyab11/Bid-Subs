import MainHeading from '@/common/MainHeading';
import { Button } from '@/common/Button';

const ThirdBoxContent = {
  heading: "Why Manual Estimating Holds You Back",
  subheading: "Slow estimates cost you bids and profits",
  button: "Enough guessing – get AI precision",
  cards: [
    {
      title: "Too Much Manual Work",
      description: "Endless hours spent on takeoffs, spreadsheets, and calculations kill productivity.",
    },
    {
      title: "Error-Prone Estimates",
      description: "Manual input leads to costly mistakes—5–10% overruns are common.",
    },
    {
      title: "Thin Margins, Big Risks",
      description: "With average profits around 5%, even small miscalculations can wipe out earnings.",
    },
    {
      title: "Missed Opportunities",
      description: "Slow bids mean fewer chances to win projects and grow revenue.",
    },
  ],
};

const ThirdBox = () => {
  return (
    <div className="py-4 px-4 text-center">
      <MainHeading heading={ThirdBoxContent.heading} />
      <MainHeading subheading={ThirdBoxContent.subheading} classname="text-[#9A9EA6]" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-6 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="text-white bg-transparent bg rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-2">{ThirdBoxContent.cards[0].title}</h3>
          <p className="text-sm text-[#9A9EA6]">{ThirdBoxContent.cards[0].description}</p>
        </div>

        {/* Card 2 */}
        <div className="text-white bg-transparent rounded-xl p-6  text-center shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-2">{ThirdBoxContent.cards[1].title}</h3>
          <p className="text-sm text-[#9A9EA6]">{ThirdBoxContent.cards[1].description}</p>
        </div>

        {/* Card 3 */}
        <div className="text-white bg-transparent rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-2">{ThirdBoxContent.cards[2].title}</h3>
          <p className="text-sm text-[#9A9EA6]">{ThirdBoxContent.cards[2].description}</p>
        </div>

        {/* Card 4 */}
        <div className="text-white bg-transparent rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-2">{ThirdBoxContent.cards[3].title}</h3>
          <p className="text-sm text-[#9A9EA6]">{ThirdBoxContent.cards[3].description}</p>
        </div>
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

export default ThirdBox;
