import React, { useState } from "react";
import { 
  FolderOpen, 
  Search, 
  ArrowLeft,
  FileText,
  Building2,
  Layers
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/sessionManager/SessionContext";
import { ROUTES_ENUM } from "@/constants/routes.constant";
import { sampleProjectTrades } from "@/data/tradesData";

const Trades: React.FC = () => {
  const navigate = useNavigate();
  const { currentProject } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  // Get trades for current project
  const projectTrades = sampleProjectTrades.find(pt => pt.projectId === currentProject?.id);
  const trades = projectTrades?.trades || [];

  const filteredTrades = trades.filter(trade => {
    const matchesSearch = trade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleTradeClick = (tradeId: string) => {
    navigate(`${ROUTES_ENUM.BIDS}/${tradeId}`);
  };

  const handleBackClick = () => {
    navigate(ROUTES_ENUM.DASHBOARD);
  };

  return (
    <div className="flex-1 overflow-auto p-6 bg-white dark:bg-dark rounded-3xl">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackClick}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-secondary-600 dark:text-secondary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
              Trades
            </h1>
            <p className="text-secondary-600 dark:text-secondary-300">
              {currentProject ? (
                <>
                  <span className="font-semibold">{currentProject.name}</span> - Manage project trades and bids
                </>
              ) : (
                "Manage and track all project trades"
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
            <Building2 size={16} />
            <span>{trades.length} Trades</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500" size={20} />
          <input
            type="text"
            placeholder="Search trades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Trades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTrades.map((trade) => (
          <div
            key={trade.id}
            onClick={() => handleTradeClick(trade.id)}
            className="p-2 bg-gradient-to-br from-nuetral-100 to-primary/100 dark:from-gray-900 dark:to-primary/10 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border dark:border-gray-700/50 flex flex-col"
          >
            {/* Icon Part */}
            <div className="h-36 rounded-xl bg-gray-100 dark:bg-gray-800/30 flex items-center justify-center overflow-hidden">
              <span className="text-5xl transition-transform duration-300 ease-in-out group-hover:scale-110">{trade.icon}</span>
            </div>

            {/* Content Part */}
            <div className="p-4 flex flex-col flex-1">
              {/* Tags */}
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-full capitalize">
                  <Layers size={10} />
                  {trade.status}
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <FileText size={10} />
                  {trade.totalBids} bids
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{trade.name}</h3>
              
              {/* Subtitle / Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 font-light flex-grow">{trade.description}</p>
              
              {/* Average Budget */}
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-3 flex items-center justify-between">
                <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{trade.averageBudget}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Average Budget</p>
                </div>
                <button 
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTrades.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen size={48} className="mx-auto text-secondary-400 dark:text-secondary-500 mb-4" />
          <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
            No trades found
          </h3>
          <p className="text-secondary-500 dark:text-secondary-400">
            {searchTerm 
              ? "Try adjusting your search or filter criteria"
              : "No trades have been created for this project yet"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Trades; 