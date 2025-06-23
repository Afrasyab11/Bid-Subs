import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
    UploadCloud, 
    File as FileIcon, 
    X, 
    ArrowLeft, 
    Folder, 
    Plus,
    DraftingCompass,
    FileText as ScopeIcon,
    Calculator,
    Briefcase
} from 'lucide-react';

type FileWithPreview = File & { preview: string };

interface BidFolder {
    name: string;
    files: FileWithPreview[];
}

interface FileDropzoneProps {
    onDrop: (acceptedFiles: File[]) => void;
    files: FileWithPreview[];
    onRemove: (file: FileWithPreview) => void;
    title: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onDrop, files, onRemove, title }) => {
    const onDropCallback = useCallback((acceptedFiles: File[]) => {
        onDrop(acceptedFiles);
    }, [onDrop]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

    return (
        <div className="border-2 border-dashed border-gray-900/10 dark:border-white/10 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-800/50 h-full flex flex-col justify-center">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <UploadCloud size={48} className="mb-4 text-gray-400 dark:text-gray-500" />
                    {isDragActive ? (
                        <p className="text-lg font-semibold">Drop the files here ...</p>
                    ) : (
                        <p className="text-lg font-semibold">Drag & drop files here, or click to select</p>
                    )}
                    <p className="text-sm">Upload your {title} files.</p>
                </div>
            </div>
            {files.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
                    {files.map((file) => (
                        <div key={file.name} className="relative bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm flex items-center gap-3">
                            <FileIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-300">{(file.size / 1024).toFixed(2)} KB</p>
                            </div>
                            <button
                                onClick={() => onRemove(file)}
                                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const NewProjectWizard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [architecturalFiles, setArchitecturalFiles] = useState<FileWithPreview[]>([]);
    const [scopeFiles, setScopeFiles] = useState<FileWithPreview[]>([]);
    const [estimateFiles, setEstimateFiles] = useState<FileWithPreview[]>([]);
    const [bidFolders, setBidFolders] = useState<BidFolder[]>([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [selectedBidFolder, setSelectedBidFolder] = useState<BidFolder | null>(null);

    const wizardSteps = [
        { id: 1, title: 'Architectural Designs', icon: <DraftingCompass size={24} /> },
        { id: 2, title: 'Work Scope', icon: <ScopeIcon size={24} /> },
        { id: 3, title: 'Cost Estimate', icon: <Calculator size={24} /> },
        { id: 4, title: 'Bids Upload', icon: <Briefcase size={24} /> }
    ];

    const addFiles = (setter: React.Dispatch<React.SetStateAction<FileWithPreview[]>>) => (newFiles: File[]) => {
        const filesWithPreview = newFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setter(prev => [...prev, ...filesWithPreview]);
    };

    const removeFile = (setter: React.Dispatch<React.SetStateAction<FileWithPreview[]>>) => (fileToRemove: FileWithPreview) => {
        setter(prev => prev.filter(file => file !== fileToRemove));
        URL.revokeObjectURL(fileToRemove.preview);
    };

    const handleNavClick = (targetStep: number) => {
        if (targetStep < step) {
            setStep(targetStep);
        }
    };

    const handleCreateFolder = () => {
        if (newFolderName.trim() && !bidFolders.some(f => f.name === newFolderName.trim())) {
            setBidFolders([...bidFolders, { name: newFolderName.trim(), files: [] }]);
            setNewFolderName('');
        }
    };
    
    const addBidsToFolder = (newFiles: File[]) => {
        if (!selectedBidFolder) return;
        const filesWithPreview = newFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        const updatedFolders = bidFolders.map(folder =>
            folder.name === selectedBidFolder.name
                ? { ...folder, files: [...folder.files, ...filesWithPreview] }
                : folder
        );
        setBidFolders(updatedFolders);
        setSelectedBidFolder(prev => ({...prev!, files: [...prev!.files, ...filesWithPreview]}));
    };

    const removeBidFromFolder = (fileToRemove: FileWithPreview) => {
        if (!selectedBidFolder) return;
        const updatedFolders = bidFolders.map(folder =>
            folder.name === selectedBidFolder.name
                ? { ...folder, files: folder.files.filter(f => f !== fileToRemove) }
                : folder
        );
        setBidFolders(updatedFolders);
        setSelectedBidFolder(prev => ({...prev!, files: prev!.files.filter(f => f !== fileToRemove)}));
        URL.revokeObjectURL(fileToRemove.preview);
    };

    const renderBidsStep = () => {
        if (selectedBidFolder) {
            return (
                <div>
                    <button onClick={() => setSelectedBidFolder(null)} className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                        <ArrowLeft size={16} />
                        Back to Folders
                    </button>
                    <FileDropzone
                        onDrop={addBidsToFolder}
                        files={selectedBidFolder.files}
                        onRemove={removeBidFromFolder}
                        title={`${selectedBidFolder.name} Bids`}
                    />
                </div>
            );
        }

        return (
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create Folders & Upload Bids</h3>
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="New folder name (e.g., Plumbing)"
                        className="flex-grow px-3 py-2 border border-gray-900/10 dark:border-white/10 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button onClick={handleCreateFolder} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors">
                        <Plus size={18} /> Create
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {bidFolders.map(folder => (
                        <div key={folder.name} onClick={() => setSelectedBidFolder(folder)} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg cursor-pointer flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700">
                            <div className="flex items-center gap-3">
                                <Folder className="h-6 w-6 text-blue-500" />
                                <span className="font-medium text-gray-800 dark:text-gray-200">{folder.name}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{folder.files.length} files</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const steps = [
        { title: 'Architectural Designs', files: architecturalFiles, onDrop: addFiles(setArchitecturalFiles), onRemove: removeFile(setArchitecturalFiles) },
        { title: 'Work Scope', files: scopeFiles, onDrop: addFiles(setScopeFiles), onRemove: removeFile(setScopeFiles) },
        { title: 'Cost Estimate', files: estimateFiles, onDrop: addFiles(setEstimateFiles), onRemove: removeFile(setEstimateFiles) }
    ];

    const currentStepContent = steps[step - 1];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-dark rounded-2xl shadow-xl w-full max-w-6xl h-[95vh] flex">
                {/* Navigation Sidebar */}
                <div className="w-1/4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-l-2xl border-r border-black/5 dark:border-white/5 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Project Setup</h2>
                    <nav>
                        <ul>
                            {wizardSteps.map((s) => (
                                <li key={s.id} className="mb-3">
                                    <button
                                        onClick={() => handleNavClick(s.id)}
                                        disabled={s.id >= step}
                                        className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-colors ${
                                            s.id === step
                                                ? 'bg-primary text-white shadow-lg'
                                                : s.id < step
                                                ? 'hover:bg-gray-200 dark:hover:bg-gray-700'
                                                : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg ${s.id === step ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                            {s.icon}
                                        </div>
                                        <span className="font-semibold text-md">{s.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                
                {/* Main Content */}
                <div className="w-3/4 flex flex-col">
                    <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                {wizardSteps[step - 1].icon}
                                {wizardSteps[step - 1].title}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Step {step} of {wizardSteps.length}: Upload your project files.</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-8 flex-grow overflow-y-auto">
                        {step <= 3 && (
                            <FileDropzone
                                onDrop={currentStepContent.onDrop}
                                files={currentStepContent.files}
                                onRemove={currentStepContent.onRemove}
                                title={currentStepContent.title}
                            />
                        )}
                        {step === 4 && renderBidsStep()}
                    </div>

                    <div className="p-6 border-t border-black/5 dark:border-white/5 flex justify-end items-center">
                        <div className="flex gap-3">
                            {step > 1 && (
                                <button onClick={() => setStep(s => s - 1)} className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
                                    Back
                                </button>
                            )}
                            {step < wizardSteps.length ? (
                                <button onClick={() => setStep(s => s + 1)} className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-600">
                                    Next
                                </button>
                            ) : (
                                <button onClick={onClose} className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-700">
                                    Create Project
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProjectWizard; 