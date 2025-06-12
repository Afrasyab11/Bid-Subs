interface SmoothTabsProps {
  tabs?: any;
  activeTab?: number;
  setActiveTab?: any;
  className?: string;
  activeButtonColor?:any,
}
export default function SmoothTabs({
  tabs,
  activeTab = 0,
  setActiveTab,
  className = "",
  activeButtonColor="dark"
}: SmoothTabsProps) {
  return (
    <>
      <div
        className={`w-full flex flex-col items-center justify-center ${className}`}
      >
        <div className="relative shadow-tab-shadow  bg-semi_blue dark:bg-semi-dark w-full  max-w-lg rounded-lg p-2 flex items-center mb-8">
          {/* Sliding Background */}
          <div
            className={`absolute h-[calc(100%-8px)] top-1  rounded-lg transition-all duration-300 ease-out bg-blue dark:bg-${activeButtonColor}`}
            style={{
              width: `calc(${100 / tabs.length}% - 8px)`,
              left: `calc(${activeTab * (100 / tabs.length)}% + 4px)`,
            }}
          />

          {/* Tab Buttons */}
          {tabs.map((tab: any, index: any) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`relative flex-1  py-1 text-nowrap rounded-full text-md  transition-colors duration-300 ${
                activeTab === index ? "text-white" : "text-gray dark:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
