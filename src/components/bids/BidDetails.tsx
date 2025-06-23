import React, { useState } from "react";
import { 
  ArrowLeft,
  Mail,
  DollarSign,
  Calendar,
  Phone,
  User,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "@/sessionManager/SessionContext";
import { ROUTES_ENUM } from "@/constants/routes.constant";
import { sampleProjectTrades } from "@/data/tradesData";
import type { Bid } from "@/data/tradesData";

const BidDetails: React.FC = () => {
  const navigate = useNavigate();
  const { tradeId, bidId } = useParams<{ tradeId: string; bidId: string }>();
  const { currentProject } = useSession();
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // Get trade and bid
  const projectTrades = sampleProjectTrades.find(pt => pt.projectId === currentProject?.id);
  const trade = projectTrades?.trades.find(t => t.id === tradeId);
  const bid = trade?.bids.find(b => b.id === bidId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800";
      case "under-review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800";
      case "selected":
        return "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 border border-primary-200 dark:border-primary-800";
      default:
        return "bg-gray-100 text-secondary-800 dark:bg-gray-700 dark:text-secondary-300 border border-gray-200 dark:border-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={16} className="text-green-600" />;
      case "rejected":
        return <XCircle size={16} className="text-red-600" />;
      case "under-review":
        return <AlertCircle size={16} className="text-blue-600" />;
      case "selected":
        return <Star size={16} className="text-primary-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "under-review":
        return "Under Review";
      case "selected":
        return "Selected";
      default:
        return "Unknown";
    }
  };

  const handleBackClick = () => {
    navigate(`${ROUTES_ENUM.BIDS}/${tradeId}`);
  };

  const handleStatusChange = (newStatus: Bid['status']) => {
    if (!bid || !trade) return;

    // Update the bid status
    bid.status = newStatus;
    bid.isSelected = newStatus === 'selected';
    
    // If this bid is being selected, unselect others
    if (newStatus === 'selected') {
      trade.bids.forEach(b => {
        if (b.id !== bidId) {
          b.isSelected = false;
          if (b.status === 'selected') {
            b.status = 'under-review';
          }
        }
      });
    }
    
    setShowStatusMenu(false);
  };

  const statusOptions = [
    { value: 'under-review', label: 'Under Review', color: 'text-blue-600', icon: <AlertCircle size={16} /> },
    { value: 'selected', label: 'Selected', color: 'text-primary-600', icon: <Star size={16} /> },
    { value: 'accepted', label: 'Accepted', color: 'text-green-600', icon: <CheckCircle size={16} /> },
    { value: 'rejected', label: 'Rejected', color: 'text-red-600', icon: <XCircle size={16} /> },
  ];

  if (!bid || !trade) {
    return (
      <div className="flex-1 overflow-auto p-6 bg-white dark:bg-dark rounded-3xl">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
            Bid not found
          </h3>
          <button
            onClick={handleBackClick}
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Go back to bids
          </button>
        </div>
      </div>
    );
  }

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
              {bid.companyName}
            </h1>
            <p className="text-secondary-600 dark:text-secondary-300">
              {trade.name} - {currentProject?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {getStatusIcon(bid.status)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bid.status)}`}>
              {getStatusText(bid.status)}
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
            >
              Change Status
            </button>
            
            {showStatusMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-30 min-w-48">
                <div className="p-2">
                  <div className="text-xs font-medium text-secondary-500 mb-2 px-2">Change Status</div>
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusChange(option.value as Bid['status'])}
                      className={`w-full text-left px-3 py-3 text-sm rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                        bid.status === option.value ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                      }`}
                    >
                      <span className={option.color}>{option.icon}</span>
                      <span className={option.color}>{option.label}</span>
                      {bid.status === option.value && (
                        <CheckCircle size={16} className="text-primary-600 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bid Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
              <User size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-black dark:text-white">Contact</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Primary Contact</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-black dark:text-white mb-1">{bid.contactName}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 w-full truncate">{bid.contactEmail}</p>
        </div>

        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
              <Phone size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-black dark:text-white">Phone</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Contact Number</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-black dark:text-white">{bid.contactPhone}</p>
        </div>

        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
              <DollarSign size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-black dark:text-white">Budget</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Proposed Amount</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-black dark:text-white mb-1">{bid.proposedBudget}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Timeline: {bid.proposedTimeline}</p>
        </div>

        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
              <Calendar size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-black dark:text-white">Submitted</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Date & Time</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-black dark:text-white mb-1">
            {new Date(bid.submittedDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {new Date(bid.submittedDate).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Email Display */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
              <Mail size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">Email Details</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Proposal Communication</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-slate-700 dark:text-slate-300">From:</span>
              <p className="text-slate-600 dark:text-slate-400">
                {bid.contactName} &lt;{bid.contactEmail}&gt;
              </p>
            </div>
            <div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Subject:</span>
              <p className="text-slate-600 dark:text-slate-400">{bid.emailSubject}</p>
            </div>
            <div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Date:</span>
              <p className="text-slate-600 dark:text-slate-400">
                {new Date(bid.submittedDate).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Corporation:</span>
              <p className="text-slate-600 dark:text-slate-400">{bid.corporation}</p>
            </div>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed break-words overflow-wrap-anywhere">
            {bid.emailBody}
          </pre>
        </div>
        
        {bid.notes && (
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Notes:</strong> {bid.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidDetails; 