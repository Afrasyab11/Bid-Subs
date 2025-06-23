import React, { useState } from 'react';
import { DraftingCompass, FileText, FileCheck, Bookmark, ArrowLeft, Image as ImageIcon, File, FileSpreadsheet, Folder } from 'lucide-react';
import { useSession } from '@/sessionManager/SessionContext';
import { sampleProjectTrades } from '@/data/tradesData';
import type { ProjectFile, TradeFolder } from '@/data/tradesData';

interface FolderCardProps {
  icon: React.ReactNode;
  category: string;
  lastUpdated: string;
  title: string;
  tags: string[];
  fileCount: number;
  projectName: string;
  onClick: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ icon, category, lastUpdated, title, tags, fileCount, projectName, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="from-neutral-100 to-primary/10 dark:from-gray-900 dark:to-primary/10 bg-gradient-to-br p-6 rounded-2xl shadow-md flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700 cursor-pointer">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 border dark:border-gray-600 rounded-full flex items-center justify-center bg-white/50 dark:bg-gray-800/50">
            {icon}
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Bookmark size={14} />
            <span>{tags[0]}</span>
          </button>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
          {category} <span className="text-gray-400 dark:text-gray-500">· {lastUpdated}</span>
        </p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>

        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{fileCount} files</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{projectName}</p>
        </div>
        <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">
          Open
        </button>
      </div>
    </div>
  );
};

const TradeFolderCard: React.FC<{ tradeFolder: TradeFolder, onClick: () => void }> = ({ tradeFolder, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border dark:border-gray-700 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <Folder className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tradeFolder.tradeName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{tradeFolder.files.length} bid files</p>
        </div>
        <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">
          View
        </button>
      </div>
    </div>
  );
};

const getFileIcon = (type: 'image' | 'pdf' | 'xlsx') => {
  switch(type) {
    case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
    case 'pdf': return <File className="w-8 h-8 text-red-500" />;
    case 'xlsx': return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
  }
};

const FileViewer: React.FC<{ folderTitle: string, files: ProjectFile[], onBack: () => void }> = ({ folderTitle, files, onBack }) => (
  <div>
    <div className="mb-6 flex items-center gap-4">
      <button
        onClick={onBack}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-secondary-600 dark:text-secondary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft size={20} />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{folderTitle}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{files.length} files</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {files.map(file => (
        <a key={file.id} href={file.url} target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border dark:border-gray-700">
          <div className="flex items-center gap-4">
            {getFileIcon(file.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{file.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(file.uploadedDate).toLocaleDateString()} · {file.size}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
);

const TradeFolderViewer: React.FC<{ tradeFolders: TradeFolder[], onBack: () => void, onTradeClick: (tradeFolder: TradeFolder) => void }> = ({ tradeFolders, onBack, onTradeClick }) => (
  <div>
    <div className="mb-6 flex items-center gap-4">
      <button
        onClick={onBack}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-secondary-600 dark:text-secondary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft size={20} />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bids Uploaded</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Browse bids by trade</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tradeFolders.map(tradeFolder => (
        <TradeFolderCard key={tradeFolder.tradeId} tradeFolder={tradeFolder} onClick={() => onTradeClick(tradeFolder)} />
      ))}
    </div>
  </div>
);

const Files: React.FC = () => {
  const { currentProject } = useSession();
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedTradeFolder, setSelectedTradeFolder] = useState<TradeFolder | null>(null);

  const projectData = sampleProjectTrades.find(pt => pt.projectId === currentProject?.id);

  const getFilesForFolder = () => {
    if (!projectData) return [];
    switch (selectedFolder) {
      case 'Architectural Drawings': return projectData.files.architectural;
      case 'Work Scope & Estimate': return projectData.files.scope;
      default: return [];
    }
  };

  const handleBackToMain = () => {
    setSelectedFolder(null);
    setSelectedTradeFolder(null);
  };

  const handleBackToBids = () => {
    setSelectedTradeFolder(null);
  };

  const totalBidFiles = projectData?.files.bids.reduce((total, tradeFolder) => total + tradeFolder.files.length, 0) || 0;

  const folders = [
    {
      icon: <DraftingCompass size={24} className="text-gray-600 dark:text-gray-300" />,
      category: 'Design',
      lastUpdated: '2 days ago',
      title: 'Architectural Drawings',
      tags: ['Images', 'CAD', 'Sketches'],
      fileCount: projectData?.files.architectural.length || 0,
      onClick: () => setSelectedFolder('Architectural Drawings')
    },
    {
      icon: <FileText size={24} className="text-gray-600 dark:text-gray-300" />,
      category: 'Documentation',
      lastUpdated: '5 days ago',
      title: 'Work Scope & Estimate',
      tags: ['PDFs', 'XLSX'],
      fileCount: projectData?.files.scope.length || 0,
      onClick: () => setSelectedFolder('Work Scope & Estimate')
    },
    {
      icon: <FileCheck size={24} className="text-gray-600 dark:text-gray-300" />,
      category: 'Submissions',
      lastUpdated: '1 day ago',
      title: 'Bids Uploaded',
      tags: ['PDFs', 'Documents'],
      fileCount: totalBidFiles,
      onClick: () => setSelectedFolder('Bids Uploaded')
    }
  ];

  return (
    <div className="flex-1 overflow-auto p-6 bg-white dark:bg-dark rounded-3xl">
      {selectedTradeFolder ? (
        <FileViewer 
          folderTitle={`${selectedTradeFolder.tradeName} Bids`} 
          files={selectedTradeFolder.files} 
          onBack={handleBackToBids} 
        />
      ) : selectedFolder === 'Bids Uploaded' ? (
        <TradeFolderViewer 
          tradeFolders={projectData?.files.bids || []} 
          onBack={handleBackToMain}
          onTradeClick={setSelectedTradeFolder}
        />
      ) : selectedFolder ? (
        <FileViewer 
          folderTitle={selectedFolder} 
          files={getFilesForFolder()} 
          onBack={handleBackToMain} 
        />
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Files</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage all your project documents and files for {currentProject?.name}.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {folders.map(folder => (
              <FolderCard key={folder.title} {...folder} projectName={currentProject?.name || "Current Project"} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Files; 