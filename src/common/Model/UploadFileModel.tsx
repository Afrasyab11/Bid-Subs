import React, { useState, useRef } from "react";
import { Upload, ArrowLeft, Folder, FileText } from "lucide-react";
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

  // const handleNext = () => {
  //   if (currentStep < 3) {
  //     setCurrentStep((prev) => (prev + 1) as Step);
  //   }
  // };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = () => {
    console.log("Project submitted:", {
      title: projectTitle,
      files: uploadedFiles,
      trade: selectedTrade,
      bids: selectedBids,
    });
    // Reset form and close modal
    setCurrentStep(1);
    setProjectTitle("");
    setUploadedFiles([]);
    setSelectedTrade("");
    setSelectedBids([]);
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#252525]/50 bg-opacity-25 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-semi_blue dark:bg-dark rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-x-6 p-6 w-full border-b border-slate-700">
          <div className="flex items-center space-x-8 w-full">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="text-slate-400 hover:text-white transition-colors"
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
                    className={`w-8 h-8 rounded-full flex items-center flex-col justify-center text-sm font-medium ${
                      step === currentStep
                        ? "bg-blue text-white"
                        : step < currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-navy_light text-slate-300"
                    }`}
                  >
                    {step}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step === currentStep ? "text-white" : "text-slate-400"
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
                  className="w-full bg-navy_light border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Upload File here
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center bg-navy_light hover:bg-navy_light transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={48} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-300 mb-2">Drag and drop files</p>
                  <p className="text-slate-400 text-sm mb-4">
                    .pdf, .dwg, .zip
                  </p>
                  <button className="bg-white text-slate-800 px-6 py-2 rounded-lg font-medium hover:bg-slate-100 transition-colors">
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
                    selectedTrade === trade.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  <Folder size={32} className="mb-2" />
                  <span className="text-sm font-medium">{trade.name}</span>
                </button>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-6 gap-4">
              {bids.map((bid) => (
                <button
                  key={bid.id}
                  onClick={() => handleBidToggle(bid.id)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                    selectedBids.includes(bid.id)
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  <FileText size={32} className="mb-2" />
                  <span className="text-sm font-medium">{bid.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 border-t border-slate-700">
          <Button
            onClick={onClose}
            label="Cancel"
            className="py-2 hover:text-white transition-colors px-4 rounded-md max-w-[80px] text-blue bg-[#1350E51A]/10"
          />
          {currentStep < 3 && (
            <Button
              onClick={handleSubmit}
              label="Upload Project"
              className="bg-blue max-w-[160px] text-white px-6 py-2 rounded-lg  transition-colors"
            />
           
          )}
        </div>
      </div>
    </div>
  );
};
