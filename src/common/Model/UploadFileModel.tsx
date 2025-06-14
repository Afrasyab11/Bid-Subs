import React, { useState, useRef } from "react";
import { Upload, ArrowLeft, FileText } from "lucide-react";
import Button from "../Button";
import { IoFolder } from "react-icons/io5";

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

export const ProjectUploadModal: React.FC<ProjectUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [projectTitle, setProjectTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedTrade, setSelectedTrade] = useState<string>("");
  const [selectedBids, setSelectedBids] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const trades = [
    { id: "electricity", name: "Electricity", icon: "folder" },
    { id: "plumbing", name: "Plumbing", icon: "folder" },
    { id: "benches1", name: "Benches", icon: "folder" },
    { id: "benches2", name: "Benches", icon: "folder" },
    { id: "benches3", name: "Benches", icon: "folder" },
    { id: "benches4", name: "Benches", icon: "folder" },
    { id: "electricity2", name: "Electricity", icon: "folder" },
    { id: "plumbing2", name: "Plumbing", icon: "folder" },
    { id: "benches5", name: "Benches", icon: "folder" },
    { id: "benches6", name: "Benches", icon: "folder" },
    { id: "benches7", name: "Benches", icon: "folder" },
    { id: "benches8", name: "Benches", icon: "folder" },
  ];

  const bids = Array.from({ length: 12 }, (_, i) => ({
    id: `bid-${i + 1}`,
    name: `Bid ${i + 1}`,
  }));

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleTradeSelect = (tradeId: string) => {
    setSelectedTrade(tradeId);
  };

  const handleBidToggle = (bidId: string) => {
    setSelectedBids((prev) =>
      prev.includes(bidId)
        ? prev.filter((id) => id !== bidId)
        : [...prev, bidId]
    );
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#252525]/60 bg-opacity-25 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-white dark:bg-dark rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-x-6 p-6 w-full border-b border-slate-700">
          <div className="flex items-center space-x-8 w-full">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="text-gray dark:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="flex items-center space-x-8 w-full">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className="flex flex-col gap-y-3 justify-center w-full items-center space-x-3"
                >
                  <div
                    onClick={handleNext}
                    className={`w-8 h-8 rounded-full flex items-center cursor-pointer flex-col justify-center text-sm font-medium ${
                      step === currentStep
                        ? "bg-blue text-white dark:text-white"
                        : step < currentStep
                        ? "bg-gray dark:bg-navy_light text-white"
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
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Project Title*
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Project title"
                  className="w-full bg-semi_blue dark:bg-navy_light  rounded-lg px-4 py-3 text-white placeholder-gray focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Upload File here
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className=" rounded-lg p-12 text-center bg-semi_blue dark:bg-navy_light   cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={48} className="mx-auto text-gray mb-4" />
                  <p className="text-gray mb-2">Drag and drop files</p>
                  <p className="text-gray text-sm mb-4">.pdf, .dwg, .zip</p>
                  <button className="bg-blue dark:bg-white text-white dark:text-dark px-6 py-2 rounded-lg font-medium  ">
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
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="text-sm text-slate-300 bg-slate-700 px-3 py-2 rounded"
                      >
                        {file.name} ({Math.round(file.size / 1024)}KB)
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-6 gap-4">
              {trades.map((trade) => (
                <button
                  key={trade.id}
                  onClick={() => handleTradeSelect(trade.id)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                    selectedTrade === trade.id ? " text-blue " : " text-blue "
                  }`}
                >
                  <IoFolder size={50} className="mb-2" />
                  <span className="text-sm font-medium text-blue dark:text-white">
                    {trade.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-6 gap-4">
              {bids.map((bid) => (
                <div className="flex flex-col items-center justify-center">
                  <button
                    key={bid.id}
                    onClick={() => handleBidToggle(bid.id)}
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                      selectedBids.includes(bid.id)
                        ? "bg-blue text-white "
                        : "bg-blue/10  dark:bg-navy_blue text-blue dark:text-blue "
                    }`}
                  >
                    <FileText size={50} className="mb-2" />
                  </button>
                  <span className="text-sm  mt-3 font-medium text-blue dark:text-white">
                    {bid.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {currentStep == 1 && (
          <div className="flex justify-end space-x-4 p-6 ">
            <Button
              onClick={onClose}
              label="Cancel"
              className="py-2  dark:text-white transition-colors px-4 rounded-md max-w-[80px] bg-blue/10 text-blue dark:bg-[#1350E51A]/10"
            />
            {currentStep < 3 && (
              <Button
                onClick={handleNext}
                label="Upload Project"
                className="bg-blue max-w-[160px] text-white px-6 py-2 rounded-lg  transition-colors"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
