import React from 'react';

export default function AdminUserVerification() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Left Card: Registered but Not Verified */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col h-[500px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold tracking-tight font-headline">Registered but Not Verified Users</h2>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">128</span>
          </div>
          <button className="text-slate-400 hover:text-primary">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
        <div className="overflow-hidden flex-1 relative">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <tr>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest pl-4">Name</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Platform</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Reg. Date</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {/* Row 1 */}
              <tr className="group hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 pl-4">
                  <div className="font-semibold text-sm">Marcus Chen</div>
                  <div className="text-xs text-slate-400">+1 415-555-0123</div>
                </td>
                <td className="py-4">
                  <span className="bg-secondary-container/20 text-on-secondary-container px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight">Uber</span>
                </td>
                <td className="py-4 text-xs text-slate-500">Oct 12, 2023</td>
                <td className="py-4 text-right pr-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </button>
                    <button className="p-2 bg-error/10 text-error rounded-lg hover:bg-error hover:text-white transition-all">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="group hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 pl-4">
                  <div className="font-semibold text-sm">Elena Rodriguez</div>
                  <div className="text-xs text-slate-400">+1 213-555-0988</div>
                </td>
                <td className="py-4">
                  <span className="bg-tertiary-container/20 text-on-tertiary-container px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight">DoorDash</span>
                </td>
                <td className="py-4 text-xs text-slate-500">Oct 11, 2023</td>
                <td className="py-4 text-right pr-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </button>
                    <button className="p-2 bg-error/10 text-error rounded-lg hover:bg-error hover:text-white transition-all">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="group hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 pl-4">
                  <div className="font-semibold text-sm">Jordan Smith</div>
                  <div className="text-xs text-slate-400">+1 305-555-4421</div>
                </td>
                <td className="py-4">
                  <span className="bg-secondary-container/20 text-on-secondary-container px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight">Lyft</span>
                </td>
                <td className="py-4 text-xs text-slate-500">Oct 10, 2023</td>
                <td className="py-4 text-right pr-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </button>
                    <button className="p-2 bg-error/10 text-error rounded-lg hover:bg-error hover:text-white transition-all">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Card: Verified Users */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col h-[500px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold tracking-tight font-headline">Verified Users</h2>
            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold">2,410</span>
          </div>
          <div className="bg-surface-container-low rounded-xl px-3 py-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-slate-400">search</span>
            <input className="bg-transparent border-none text-xs focus:ring-0 w-32 outline-none font-body" placeholder="Search..." type="text" />
          </div>
        </div>
        <div className="overflow-y-auto no-scrollbar flex-1">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <tr>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest pl-4">User</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right pr-4">Weeks Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {/* Row 1 */}
              <tr className="group hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 pl-4 flex items-center gap-3">
                  <img className="w-8 h-8 rounded-lg object-cover" alt="Sarah Jenkins" src="https://placehold.co/100x100/1e293b/ffffff?text=SJ" />
                  <div>
                    <div className="font-semibold text-sm">Sarah Jenkins</div>
                    <div className="text-[10px] text-slate-400">Instacart • Austin, TX</div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-secondary">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    Active Policy
                  </span>
                </td>
                <td className="py-4 text-right pr-4 font-mono text-sm">42</td>
              </tr>
              {/* Row 2 */}
              <tr className="group hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 pl-4 flex items-center gap-3">
                  <img className="w-8 h-8 rounded-lg object-cover" alt="David Miller" src="https://placehold.co/100x100/1e293b/ffffff?text=DM" />
                  <div>
                    <div className="font-semibold text-sm">David Miller</div>
                    <div className="text-[10px] text-slate-400">Uber • New York, NY</div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    Expired
                  </span>
                </td>
                <td className="py-4 text-right pr-4 font-mono text-sm">18</td>
              </tr>
              {/* Row 3 */}
              <tr className="group hover:bg-surface-container-low/50 transition-colors">
                <td className="py-4 pl-4 flex items-center gap-3">
                  <img className="w-8 h-8 rounded-lg object-cover" alt="Amara Okafor" src="https://placehold.co/100x100/1e293b/ffffff?text=AO" />
                  <div>
                    <div className="font-semibold text-sm">Amara Okafor</div>
                    <div className="text-[10px] text-slate-400">TaskRabbit • Chicago, IL</div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-secondary">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    Active Policy
                  </span>
                </td>
                <td className="py-4 text-right pr-4 font-mono text-sm">114</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
