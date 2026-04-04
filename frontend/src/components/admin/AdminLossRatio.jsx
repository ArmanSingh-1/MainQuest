import React from 'react';

export default function AdminLossRatio() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Stats Card */}
      <div className="lg:col-span-2 bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight font-headline">Current Loss Ratio</h2>
            <p className="text-sm text-slate-500">Portfolio health and financial sustainability</p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-2xl">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
            <span className="text-sm font-black uppercase tracking-widest">Healthy</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-[10px] font-black inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10 tracking-widest">
                    Premium Collected
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-on-surface">$2,440,210</span>
                </div>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-surface-container-high">
                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-[10px] font-black inline-block py-1 px-2 uppercase rounded-full text-secondary bg-secondary/10 tracking-widest">
                    Total Payouts
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-on-surface">$1,176,181</span>
                </div>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-surface-container-high">
                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary" style={{ width: '48.2%' }}></div>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-secondary shadow-sm">
                <span className="material-symbols-outlined text-3xl">trending_up</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Net Margin (Q4)</p>
                <h4 className="text-xl font-black text-on-surface">+12.4% <span className="text-sm font-medium text-slate-400 ml-1">vs last quarter</span></h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Simple SVG Donut */}
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="16"></circle>
                <circle className="text-primary" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="260" strokeWidth="16"></circle>
              </svg>
              <div className="absolute text-center">
                <p className="text-4xl font-black text-on-surface font-headline">48.2%</p>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">Loss Ratio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats Grid */}
      <div className="flex flex-col gap-6">
        <div className="bg-gradient-to-br from-on-surface to-slate-900 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
              <span className="material-symbols-outlined text-blue-400">bolt</span>
            </div>
            <span className="text-xs font-bold text-blue-400">+5.2%</span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Average Premium</p>
          <h3 className="text-3xl font-black font-headline">$34.20 <span className="text-sm font-medium text-slate-500">/wk</span></h3>
        </div>
        <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-transparent hover:border-primary/10 transition-all cursor-pointer">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-on-surface">AI Processing Load</h4>
            <span className="material-symbols-outlined text-slate-400">more_horiz</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end h-24">
              <div className="w-2 bg-primary rounded-full h-8"></div>
              <div className="w-2 bg-primary rounded-full h-12"></div>
              <div className="w-2 bg-primary rounded-full h-10"></div>
              <div className="w-2 bg-primary/30 rounded-full h-16"></div>
              <div className="w-2 bg-primary rounded-full h-20"></div>
              <div className="w-2 bg-primary rounded-full h-14"></div>
              <div className="w-2 bg-primary rounded-full h-24"></div>
              <div className="w-2 bg-primary rounded-full h-18"></div>
            </div>
            <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <span>08:00</span>
              <span>Now</span>
              <span>16:00</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center overflow-hidden border-2 border-white ring-4 ring-primary/10">
            <img className="w-full h-full object-cover" alt="Latest Reviewer" src="https://placehold.co/100x100/1e293b/ffffff?text=MV" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Latest Reviewer</p>
            <p className="text-sm font-black">Marcus V. <span className="font-normal text-slate-400 text-xs ml-1">approved 12 claims</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
