import React, { useState } from "react";
import { 
  ArrowLeft,
  Search,
  Mail,
  Star,
  ArrowRight,
  Building,
  DollarSign,
  Calendar,
  FileText
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "@/sessionManager/SessionContext";
import { ROUTES_ENUM } from "@/constants/routes.constant";
import { sampleProjectTrades } from "@/data/tradesData";
import type { Bid } from "@/data/tradesData";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';

const NextButton = () => {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => swiper.slideNext()}
      className="absolute bottom-4 right-4 z-10 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
    >
      <ArrowRight size={24} className="text-gray-900 dark:text-white" />
    </button>
  );
};

const Bids: React.FC = () => {
  const navigate = useNavigate();
  const { tradeId } = useParams<{ tradeId: string }>();
  const { currentProject } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const projectTrades = sampleProjectTrades.find(pt => pt.projectId === currentProject?.id);
  const trade = projectTrades?.trades.find(t => t.id === tradeId);
  const originalBids = trade?.bids || [];
  
  const [bids, setBids] = useState<Bid[]>(originalBids);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "rejected": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "under-review": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "selected": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default: return "bg-gray-100 text-secondary-800 dark:bg-gray-700 dark:text-secondary-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted": return "Accepted";
      case "rejected": return "Rejected";
      case "under-review": return "Under Review";
      case "selected": return "Selected";
      default: return "Under Review";
    }
  };

  const handleSelectBid = (bidToSelect: Bid, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedBids = bids.map(b => {
      const isSelected = b.id === bidToSelect.id;
      let newStatus: Bid['status'] = b.status;
      if (isSelected) {
        newStatus = 'selected';
      } else if (b.status === 'selected') {
        newStatus = 'under-review';
      }
      return { ...b, isSelected, status: newStatus };
    });
    setBids(updatedBids);
  };

  const filteredBids = bids.filter(bid => {
    const matchesSearch = bid.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.emailSubject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bid.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBackClick = () => {
    navigate(ROUTES_ENUM.TRADES);
  };
  
  const handleViewDetailsClick = (bidId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`${ROUTES_ENUM.BID_DETAILS}/${tradeId}/${bidId}`);
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
              {trade?.name} Bids
            </h1>
            <p className="text-secondary-600 dark:text-secondary-300">
              {currentProject?.name} - {bids.length} bids received
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500" size={20} />
          <input
            type="text"
            placeholder="Search bids by company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="under-review">Under Review</option>
          <option value="selected">Selected</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Bids Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBids.map((bid) => (
          <div
            key={bid.id}
            className={`rounded-[20px] border border-zinc-400/10 p-[8px] shadow-md overflow-hidden transition-all duration-300 ${bid.isSelected ? 'ring-2 ring-primary' : 'ring-1 ring-transparent'}`}
          >
            <div className="p-[10px] rounded-[12px] bg-[#F7F9F2] dark:bg-gray-800/50 relative h-64 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                {/* <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{bid.proposedBudget}</span> */}
                <button onClick={(e) => handleSelectBid(bid, e)} className="z-10">
                  <Star size={20} className={`transition-colors ${bid.isSelected ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                </button>
              </div>

              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="w-full h-full"
                loop={true}
              >
                <SwiperSlide className="flex flex-col items-start justify-center p-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{bid.companyName}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{bid.contactName}</p>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-start justify-center p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-primary"/>
                    <span className="font-semibold">{bid.proposedBudget}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={16} className="text-primary"/>
                    <span>{bid.proposedTimeline}</span>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col items-start justify-center p-4">
                   <div className="flex items-center gap-2">
                    <FileText size={16} className="text-primary"/>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-md ${getStatusColor(bid.status)}`}>{getStatusText(bid.status)}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ">{bid.emailSubject}</p>
                </SwiperSlide>
                <NextButton />
              </Swiper>
            </div>
            <div className="p-4 bg-white dark:bg-dark flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building size={16} className="text-primary"/>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{bid.companyName}</p>
                </div>
              </div>
              <button 
                onClick={(e) => handleViewDetailsClick(bid.id, e)}
                className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBids.length === 0 && (
        <div className="text-center py-12 col-span-full">
          <Mail size={48} className="mx-auto text-secondary-400 dark:text-secondary-500 mb-4" />
          <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
            No bids found
          </h3>
          <p className="text-secondary-500 dark:text-secondary-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
      <style>{`
        .swiper-pagination-bullet {
          background-color: #9ca3af;
          opacity: 0.5;
          transition: opacity 0.2s, background-color 0.2s;
        }
        .swiper-pagination-bullet-active {
          background-color: #1f2937;
          opacity: 1;
        }
        .dark .swiper-pagination-bullet {
          background-color: #6b7280;
        }
        .dark .swiper-pagination-bullet-active {
          background-color: #f9fafb;
        }
      `}</style>
    </div>
  );
};

export default Bids; 