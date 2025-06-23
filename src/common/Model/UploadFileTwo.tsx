import React, { useEffect, useRef, useState } from "react";
import { Upload, ArrowLeft, FileText } from "lucide-react";
import { IoFolder } from "react-icons/io5";
import Button from "../Button";

interface ProjectUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

type Step = 1 | 2 | 3;

export const ProjectUploadModalTwo: React.FC<ProjectUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [projectTitle, setProjectTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedTrade, setSelectedTrade] = useState("");
  const [selectedBids, setSelectedBids] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const trades = [
    { id: "electricity", name: "Electricity" },
    { id: "plumbing", name: "Plumbing" },
    { id: "benches1", name: "Benches" },
    { id: "benches2", name: "Benches" },
    { id: "benches3", name: "Benches" },
    { id: "benches4", name: "Benches" },
    { id: "electricity2", name: "Electricity" },
    { id: "plumbing2", name: "Plumbing" },
    { id: "benches5", name: "Benches" },
    { id: "benches6", name: "Benches" },
    { id: "benches7", name: "Benches" },
    { id: "benches8", name: "Benches" },
  ];

  const bids = Array.from({ length: 12 }, (_, i) => ({
    id: `bid-${i + 1}`,
    name: `Bid ${i + 1}`,
  }));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleBidToggle = (bidId: string) => {
    setSelectedBids((prev) =>
      prev.includes(bidId)
        ? prev.filter((id) => id !== bidId)
        : [...prev, bidId]
    );
  };

  const handleTradeSelect = (tradeId: string) => {
    setSelectedTrade(tradeId);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setIsVisible(true);
      timer = setTimeout(() => setIsAnimating(true), 50);
      // Remove the body overflow hidden to allow scrolling
      document.body.style.overflow = "auto";
    } else {
      setIsAnimating(false);
      timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "auto";
    }
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-start bg-[#252525]/60 transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      } px-4`}
      style={{ overflow: "auto" }} // Changed from "hidden" to "auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg sm:max-w-xl lg:max-w-4xl transform rounded-lg bg-white dark:bg-dark p-5 shadow-xl transition-all duration-300 ease-in-out ${
          isAnimating
            ? "translate-y-0 opacity-100 my-8" // Added my-8 for vertical margin
            : "-translate-y-20 opacity-0"
        }`}
        // Removed overflow-y-auto and max-height constraints
      >
        {/* Header with Steps */}
        <div className="flex items-center gap-x-6 sm:px-0 md:p-6 w-full border-b border-slate-700">
          <div className="flex items-center space-x-8 w-full">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="text-secondary dark:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="flex items-center space-x-8 w-full">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className="flex flex-col gap-y-3 justify-center w-full items-center"
                >
                  <div
                    onClick={handleNext}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer ${
                      step === currentStep
                        ? "bg-primary text-white"
                        : "bg-gray dark:bg-navy_light text-white"
                    }`}
                  >
                    {step}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step === currentStep
                        ? "text-dark dark:text-white"
                        : "text-slate-400"
                    }`}
                  >
                    {step === 1
                      ? "Upload"
                      : step === 2
                      ? "Select Trade"
                      : "Upload Bid"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="sm:px-0 sm:py-6 md:p-6 space-y-6">
          {currentStep === 1 && (
            <>
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Project Title*
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Project title"
                  className="w-full bg-semi_blue dark:bg-navy_light rounded-lg px-4 py-3 text-white placeholder-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Upload File here
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="rounded-lg p-12 text-center bg-semi_blue dark:bg-navy_light cursor-pointer"
                >
                  <Upload size={48} className="mx-auto text-secondary mb-4" />
                  <p className="text-secondary mb-2">Drag and drop files</p>
                  <p className="text-secondary text-sm mb-4">.pdf, .dwg, .zip</p>
                  <button className="bg-primary dark:bg-white text-white dark:text-dark px-6 py-2 rounded-lg font-medium">
                    Select files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.dwg,.zip"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  {uploadedFiles?.map((file, index) => (
                    <div
                      key={index}
                      className="text-sm text-dark dark:text-slate-300 bg-semi_blue dark:bg-slate-700 px-3 py-2 rounded"
                    >
                      {file.name} ({Math.round(file.size / 1024)}KB)
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {trades.map((trade) => (
                <button
                  key={trade.id}
                  onClick={() => handleTradeSelect(trade.id)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                    selectedTrade === trade.id ? "text-primary" : "text-primary"
                  }`}
                >
                  <IoFolder size={50} className="mb-2" />
                  <span className="text-sm font-medium dark:text-white">
                    {trade.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {bids?.map((bid) => (
                <div
                  key={bid.id}
                  className="flex flex-col items-center justify-center"
                >
                  <button
                    onClick={() => handleBidToggle(bid.id)}
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                      selectedBids.includes(bid.id)
                        ? "bg-primary text-white"
                        : "bg-primary/10 dark:bg-navy_blue text-primary dark:text-primary"
                    }`}
                  >
                    <FileText size={50} className="mb-2" />
                  </button>
                  <span className="text-sm mt-3 font-medium dark:text-white">
                    {bid.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {currentStep === 1 && (
          <div className="w-full flex items-center sm:justify-center sm:flex-col gap-y-3 md:flex-row md:justify-end space-x-4 p-6">
            <Button
              onClick={onClose}
              label="Cancel"
              className="py-2 px-4 sm:order-2 md:order-1 max-w-[80px] bg-primary/10 text-primary dark:text-white rounded-md"
            />
            <Button
              onClick={handleNext}
              label="Upload Project"
              className="bg-primary sm:w-full md:w-fit sm:order-1 md:order-2 max-w-[160px] text-white px-6 py-2 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};