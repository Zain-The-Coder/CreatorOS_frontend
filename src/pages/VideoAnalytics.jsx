import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import '../pages/Dashboard.css';

export default function VideoAnalytics() {
  const { id } = useParams();
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('views');

  return (
    <div className="dashboard-layout bg-[#fff9ee] font-['Plus_Jakarta_Sans'] text-[#1e1b11] antialiased selection:bg-[#ffdcc5] selection:text-[#301400]">
      <Sidebar />
      <main className="dashboard-main relative w-full flex-1 px-8 py-8" style={{ paddingTop: '2rem' }}>
        <div className="flex flex-col w-full gap-8 relative pb-16">
          <div className="absolute -top-12 right-1/4 w-96 h-96 bg-gradient-to-br from-[#b61722]/10 via-[#fd933d]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fbf3e2] hover:bg-[#f5eddc] text-[#1e1b11] shadow-sm transition-all duration-200 group">
                <span className="material-symbols-outlined text-[18px] text-[#944a00] group-hover:-translate-x-0.5 transition-transform duration-150">arrow_back</span>
                <span className="text-[14px] font-semibold">Back to Dashboard</span>
              </Link>
              <div className="hidden sm:flex items-center gap-2 pl-2">
                <span className="text-[12px] text-[#8f6f6d]">Telemetry Record</span>
                <span className="text-[12px] text-[#1e1b11] font-semibold">{id || 'VID-2025-08XQ'}</span>
              </div>
            </div>
          </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-[#ffffff]/80 backdrop-blur-xl shadow-[0_12px_36px_-6px_rgba(251,146,60,0.12)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 relative group overflow-hidden rounded-xl shadow-[0_8px_24px_-4px_rgba(239,68,68,0.18)] aspect-video bg-[#efe7d7]">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC50gcy9HVSlUoE_ZbRDyR-pOKibyu9-LEqJwVaKDoWuu-DiBckPeea_BH6iOzBAgkDUcVTXFoHKZ5eY2w5_EtLz5IbyxM_TUfJ4fGltjZtKmBIx5ZglwJYRm54BkBZJO7tlmQTwYcDnsZ0Sq0t6cG2z61zKDWnq-UkG8rV-8GmbIVAGBx9-AP6TTSRm1ExRMg1U9kJsXxMHZb-41toF8jJkL7hj0IYv-bZmqAPCni44yvt4DShuhh4" alt="thumbnail" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#343025]/80 via-transparent to-black/20 pointer-events-none"></div>
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#343025]/85 backdrop-blur-md text-[#f8f0df] text-[10px] tracking-wider font-semibold">4K ULTRA HD</span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded-md bg-[#343025]/90 text-[#f8f0df] text-[10px] font-semibold">18:42</span>
                  </div>
                </div>
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <h1 className="font-['Outfit'] text-[32px] font-semibold text-[#1e1b11] leading-tight">
                    How I Scaled My YouTube Channel to 100K Subscribers in 8 Months
                  </h1>
                  <div className="flex flex-col gap-1.5">
                    <p className={`text-[16px] text-[#5b403e] leading-relaxed ${!isDescExpanded ? 'line-clamp-2' : ''}`}>
                      A complete step-by-step breakdown of content strategy, packaging, CTR optimization, and retention pacing that took our tech studio from zero to six figures in under a year.
                    </p>
                    <button onClick={() => setIsDescExpanded(!isDescExpanded)} className="self-start text-[12px] text-[#944a00] hover:text-[#b61722] transition-colors flex items-center gap-1 mt-0.5">
                      <span>{isDescExpanded ? 'Show less' : 'Show more'}</span>
                      <span className="material-symbols-outlined text-[16px]">{isDescExpanded ? 'expand_less' : 'expand_more'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
              <div className="p-6 rounded-2xl bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_8px_28px_-6px_rgba(251,146,60,0.1)] flex flex-col justify-between">
                <span className="text-[10px] text-[#8f6f6d] uppercase tracking-wider block mb-1">Total Views</span>
                <div className="font-['Outfit'] text-[40px] text-[#1e1b11] font-bold">342,520</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_8px_28px_-6px_rgba(251,146,60,0.1)] flex flex-col justify-between">
                <span className="text-[10px] text-[#8f6f6d] uppercase tracking-wider block mb-1">Total Likes</span>
                <div className="font-['Outfit'] text-[40px] text-[#1e1b11] font-bold">28,410</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_8px_28px_-6px_rgba(251,146,60,0.1)] flex flex-col justify-between">
                <span className="text-[10px] text-[#8f6f6d] uppercase tracking-wider block mb-1">Discussions</span>
                <div className="font-['Outfit'] text-[40px] text-[#1e1b11] font-bold">3,892</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_8px_28px_-6px_rgba(251,146,60,0.1)] flex flex-col justify-between">
                <span className="text-[10px] text-[#8f6f6d] uppercase tracking-wider block mb-1">Total Watch Time</span>
                <div className="font-['Outfit'] text-[40px] text-[#1e1b11] font-bold">142.8K <span className="text-[20px] font-medium text-[#5b403e]">hrs</span></div>
              </div>
            </div>

        </main>
    </div>
  );
}
