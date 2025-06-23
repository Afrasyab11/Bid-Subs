import React, { useState } from 'react';
import { useSession } from '@/sessionManager/SessionContext';
import { sampleProjectTrades } from '@/data/tradesData';
import type { Bid, Trade } from '@/data/tradesData';
import { ChevronDown, ArrowRight, Building, Clock, CheckCircle, XCircle, AlertCircle, Star, DollarSign, Calendar, FileText, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES_ENUM } from '@/constants/routes.constant';

const BidComparison: React.FC = () => {
  const { currentProject } = useSession();
  const navigate = useNavigate();
  const [expandedTradeId, setExpandedTradeId] = useState<string | null>(null);
  const [showReasons, setShowReasons] = useState<Set<string>>(new Set());

  const projectTrades = sampleProjectTrades.find(pt => pt.projectId === currentProject?.id);

  const handleToggleExpand = (tradeId: string) => {
    setExpandedTradeId(expandedTradeId === tradeId ? null : tradeId);
  };

  const handleToggleReason = (bidId: string) => {
    setShowReasons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bidId)) {
        newSet.delete(bidId);
      } else {
        newSet.add(bidId);
      }
      return newSet;
    });
  };

  const handleNavigateToBid = (tradeId: string, bidId: string) => {
    navigate(`${ROUTES_ENUM.BID_DETAILS}/${tradeId}/${bidId}`);
  };

  const getStatusIcon = (status: Bid['status']) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="text-green-500" size={14} />;
      case 'selected':
        return <Star className="text-yellow-500 fill-yellow-500" size={14} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={14} />;
      case 'under-review':
        return <AlertCircle className="text-blue-500" size={14} />;
      default:
        return <Clock className="text-gray-500" size={14} />;
    }
  };

  const getStatusColor = (status: Bid['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800';
      case 'selected':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800';
      case 'under-review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
    }
  };

  const getStatusText = (status: Bid['status']) => {
    switch (status) {
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      case 'under-review': return 'Under Review';
      case 'selected': return 'Selected';
      default: return 'Under Review';
    }
  };

  const SelectedBidCard: React.FC<{ trade: Trade; bid: Bid }> = ({ trade, bid }) => (
    <div 
      className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/0 p-3  dark:border-primary/30 flex items-center justify-between cursor-pointer hover:from-primary/10 hover:to-primary/20 dark:hover:from-primary/20 dark:hover:to-primary/30 transition-all duration-300 shadow-sm"
      onClick={() => handleNavigateToBid(trade.id, bid.id)}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
          <Building size={20} className="text-primary"/>
        </div>
        <div>
          <p className="font-bold text-base text-gray-900 dark:text-white">{bid.companyName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{bid.contactName}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-xs">{bid.emailSubject}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center mb-1">
            <DollarSign size={12} className="text-primary"/>
            <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
          </div>
          <p className="font-semibold text-sm text-gray-900 dark:text-white">{bid.proposedBudget}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center mb-1">
            <Calendar size={12} className="text-primary"/>
            <p className="text-xs text-gray-500 dark:text-gray-400">Timeline</p>
          </div>
          <p className="font-semibold text-sm text-gray-900 dark:text-white">{bid.proposedTimeline}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
          <Star size={12} className="fill-current"/>
          <span className="font-semibold text-xs">Selected</span>
        </div>
        <ArrowRight size={16} className="text-gray-400 hover:text-primary transition-colors" />
      </div>
    </div>
  );

  const OtherBidRow: React.FC<{ trade: Trade; bid: Bid }> = ({ trade, bid }) => {
    const isReasonVisible = showReasons.has(bid.id);
    
    return (
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div 
          className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => handleNavigateToBid(trade.id, bid.id)}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Building size={16} className="text-gray-500"/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{bid.companyName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{bid.contactName}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-xs">{bid.emailSubject}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-1">
            <div className="text-center w-24">
              <div className="flex items-center gap-1 justify-center mb-1">
                <DollarSign size={10} className="text-primary"/>
                <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
              </div>
              <p className="font-semibold text-xs text-gray-800 dark:text-gray-200">{bid.proposedBudget}</p>
            </div>
            <div className="text-center w-24">
              <div className="flex items-center gap-1 justify-center mb-1">
                <Calendar size={10} className="text-primary"/>
                <p className="text-xs text-gray-500 dark:text-gray-400">Timeline</p>
              </div>
              <p className="font-semibold text-xs text-gray-800 dark:text-gray-200">{bid.proposedTimeline}</p>
            </div>
            <div className="flex items-center gap-1 min-w-28">
              {getStatusIcon(bid.status)}
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(bid.status)}`}>
                {getStatusText(bid.status)}
              </span>
            </div>
          </div>
          <div className="flex justify-end w-6">
            <ArrowRight size={14} className="text-gray-400 hover:text-primary transition-colors" />
          </div>
        </div>
        {bid.status === 'rejected' && (
          <div className="px-3 pb-3">
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleReason(bid.id);
                }}
                className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium py-1 px-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                {isReasonVisible ? (
                  <>
                    <EyeOff size={12} />
                    Hide reason
                  </>
                ) : (
                  <>
                    <Eye size={12} />
                    Show reason
                  </>
                )}
              </button>
            </div>
            {isReasonVisible && (
              <div className="mt-2 bg-red-50 dark:bg-red-900/20 p-2 rounded-md border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-2">
                  <XCircle size={12} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">Reason for Rejection</p>
                    <p className="text-xs text-red-600 dark:text-red-400">Budget too high for project scope and timeline requirements.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!projectTrades?.trades.length) {
    return (
      <div className="flex-1 overflow-auto p-4 bg-white dark:bg-dark rounded-3xl">
        <div className="text-center py-8">
          <FileText size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Trades Found</h3>
          <p className="text-gray-500 dark:text-gray-400">No trades have been created for this project yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-4 bg-white dark:bg-dark rounded-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Bid Comparison</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Compare all bids submitted for each trade in {currentProject?.name}.</p>
      </div>

      <div className="space-y-4">
        {projectTrades.trades.map(trade => {
          const selectedBid = trade.bids.find(b => b.isSelected);
          const otherBids = trade.bids.filter(b => !b.isSelected);
          const totalBids = trade.bids.length;
          
          return (
            <div key={trade.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{trade.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">{trade.name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{totalBids} bids received</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleToggleExpand(trade.id)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
                  style={{ transform: expandedTradeId === trade.id ? 'rotate(180deg)' : 'rotate(0deg)'}}
                >
                  <ChevronDown size={18} className="text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors" />
                </button>
              </div>

              <div className="p-0">
                {selectedBid ? (
                  <div className="mb-4">
                    {/* <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      Selected Bid
                    </h3> */}
                    <SelectedBidCard trade={trade} bid={selectedBid} />
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    <Star size={32} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                    <p className="text-sm font-medium">No bid has been selected for this trade yet.</p>
                    <p className="text-xs mt-1">Click on a bid below to select it.</p>
                  </div>
                )}

                {otherBids.length > 0 && (
                  <div className="py-2 px-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                        <FileText size={14} className="text-gray-500" />
                        Other Bids ({otherBids.length})
                      </h3>
                      {expandedTradeId !== trade.id && (
                        <button 
                          onClick={() => handleToggleExpand(trade.id)}
                          className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 text-sm"
                        >
                          <ChevronDown size={12} />
                          View bids
                        </button>
                      )}
                    </div>
                    {expandedTradeId === trade.id && (
                      <div className="space-y-1">
                        {otherBids.map(bid => <OtherBidRow key={bid.id} trade={trade} bid={bid} />)}
                      </div>
                    )}
                  </div>
                )}

                {otherBids.length === 0 && selectedBid && (
                  <div className="text-center py-3 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No other bids to compare.</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default BidComparison; 