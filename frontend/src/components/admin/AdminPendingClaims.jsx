import React from 'react';

export default function AdminPendingClaims() {
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight font-headline">Pending Claims Requiring Manual Review</h2>
          <p className="text-sm text-slate-500 mt-1">High-risk AI flags detected in the following submissions</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-outline-variant text-sm font-bold text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer">
            Export Report
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 active:scale-95 transition-transform cursor-pointer">
            Process All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            <tr>
              <th className="pl-6 pb-2">Claim ID</th>
              <th className="pb-2">Worker Name</th>
              <th className="pb-2">Reason</th>
              <th className="pb-2 text-right">Requested</th>
              <th className="pb-2 text-center">AI Fraud Score</th>
              <th className="pb-2">Status</th>
              <th className="pr-6 pb-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="space-y-4">
            {/* Table Row 1 */}
            <tr className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm">
              <td className="py-6 pl-6 rounded-l-2xl font-mono text-xs font-bold text-primary">#CLM-99210</td>
              <td className="py-6">
                <div className="font-bold text-sm">Tomasz Kowalski</div>
                <div className="text-xs text-slate-400">Created: 2h ago</div>
              </td>
              <td className="py-6">
                <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight">
                  Loss of Income
                </span>
              </td>
              <td className="py-6 text-right font-bold text-sm">$450.00</td>
              <td className="py-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-error" style={{ width: '82%' }}></div>
                  </div>
                  <span className="text-xs font-black text-error">82%</span>
                </div>
              </td>
              <td className="py-6">
                <span className="bg-tertiary-container/10 text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Critical</span>
              </td>
              <td className="py-6 pr-6 rounded-r-2xl text-right">
                <div className="flex justify-end items-center gap-3">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                    Approve
                  </button>
                  <button className="px-4 py-1.5 bg-error text-white rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                    Reject
                  </button>
                </div>
              </td>
            </tr>
            {/* Table Row 2 */}
            <tr className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm">
              <td className="py-6 pl-6 rounded-l-2xl font-mono text-xs font-bold text-primary">#CLM-99208</td>
              <td className="py-6">
                <div className="font-bold text-sm">Linda Wu</div>
                <div className="text-xs text-slate-400">Created: 5h ago</div>
              </td>
              <td className="py-6">
                <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight">
                  Accident Medical
                </span>
              </td>
              <td className="py-6 text-right font-bold text-sm">$1,200.00</td>
              <td className="py-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: '34%' }}></div>
                  </div>
                  <span className="text-xs font-black text-yellow-600">34%</span>
                </div>
              </td>
              <td className="py-6">
                <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Normal</span>
              </td>
              <td className="py-6 pr-6 rounded-r-2xl text-right">
                <div className="flex justify-end items-center gap-3">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                    Approve
                  </button>
                  <button className="px-4 py-1.5 bg-error text-white rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
