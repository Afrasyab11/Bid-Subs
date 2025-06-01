import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import MainHeading from "../../../../common/MainHeading";
import Button from "../../../../common/Button";
import { faqData } from "../../../../constants";
import { motion, AnimatePresence } from "framer-motion";

const FAQs: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-[95%] md:w-[80%] mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <MainHeading heading="Everything You Need to Know" subheading="" />
          <p className="text-white font-medium text-[20px]">
            Got questions? We've got answers
          </p>
        </div>
        <Button text="Try Now" path="/" />
      </div>

      {/* FAQ Items */}
      <div className="space-y-0">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-slate-700">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex justify-between items-center py-6 text-left hover:cursor-pointer transition-colors px-0"
            >
              <span className="text-white text-lg font-medium pr-4">
                {item.question}
              </span>
              <div className="flex-shrink-0">
                {openItem === item.id ? (
                  <FiMinus className="w-5 h-5 text-slate-400" />
                ) : (
                  <FiPlus className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {openItem === item.id && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 px-0">
                    <p className="text-slate-300 text-base leading-relaxed w-[80%]">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
