import React, { useEffect } from 'react';
import {
  ShieldCheck, LayoutDashboard, Users, FileText, BarChart3,
  Plus, Settings, HelpCircle, Search, Bell, Eye, Check, X,
  Filter, TrendingUp, HeartPulse, Zap, MoreHorizontal
} from 'lucide-react';
import '../components/admin/admin.css';

export default function AdminDashboardPage() {
  useEffect(() => {
    document.body.classList.add('admin-page');
    return () => document.body.classList.remove('admin-page');
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* SideNavBar Shell */}
      <aside className="bg-slate-950 h-screen w-64 fixed left-0 top-0 shadow-2xl flex flex-col py-6 z-50">
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>ARKA</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Parametric AI</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          <a className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl border-r-4 border-blue-500 scale-95 transition-all" href="#">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white transition-all scale-95" href="#">
            <Users size={20} />
            <span className="font-medium">Users</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white transition-all scale-95" href="#">
            <FileText size={20} />
            <span className="font-medium">Claims</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white transition-all scale-95" href="#">
            <BarChart3 size={20} />
            <span className="font-medium">Analytics</span>
          </a>
        </nav>
        <div className="mt-auto px-6 mb-8">
          <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform">
            <Plus size={20} />
            New Policy
          </button>
        </div>
        <footer className="px-3 space-y-1 border-t border-slate-800 pt-6">
          <a className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-white transition-colors" href="#">
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-white transition-colors" href="#">
            <HelpCircle size={18} />
            <span className="text-sm">Support</span>
          </a>
        </footer>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen">
        {/* TopNavBar Shell */}
        <header className="bg-white/80 backdrop-blur-xl flex justify-between items-center h-20 px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                className="w-full bg-surface-container-high border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-slate-400 transition-all outline-none"
                placeholder="Search workers, policies, or claims..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
            </button>
            <button className="text-slate-500 hover:text-primary transition-colors">
              <Settings size={20} />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-surface-container-high">
              <div className="text-right">
                <p className="text-sm font-bold text-on-surface leading-none">Alex Rivers</p>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-1">Admin User</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white text-sm font-bold ring-2 ring-primary/10">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
          {/* Section 1: User Verification Tables */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Card: Registered but Not Verified */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-extrabold tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>Registered but Not Verified Users</h2>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">128</span>
                </div>
                <button className="text-slate-400 hover:text-primary"><Filter size={20} /></button>
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
                          <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all"><Check size={16} /></button>
                          <button className="p-2 bg-error/10 text-error rounded-lg hover:bg-error hover:text-white transition-all"><X size={16} /></button>
                        </div>
                      </td>
                    </tr>
                    <tr className="group hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-4 pl-4">
                        <div className="font-semibold text-sm">Elena Rodriguez</div>
                        <div className="text-xs text-slate-400">+1 213-555-0988</div>
                      </td>
                      <td className="py-4">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight">DoorDash</span>
                      </td>
                      <td className="py-4 text-xs text-slate-500">Oct 11, 2023</td>
                      <td className="py-4 text-right pr-4">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all"><Check size={16} /></button>
                          <button className="p-2 bg-error/10 text-error rounded-lg hover:bg-error hover:text-white transition-all"><X size={16} /></button>
                        </div>
                      </td>
                    </tr>
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
                          <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all"><Check size={16} /></button>
                          <button className="p-2 bg-error/10 text-error rounded-lg hover:bg-error hover:text-white transition-all"><X size={16} /></button>
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
                  <h2 className="text-xl font-extrabold tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>Verified Users</h2>
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold">2,410</span>
                </div>
                <div className="bg-surface-container-low rounded-xl px-3 py-1 flex items-center gap-2">
                  <Search size={14} className="text-slate-400" />
                  <input className="bg-transparent border-none text-xs focus:ring-0 w-32 outline-none" placeholder="Search..." type="text" />
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
                    <tr className="group hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-4 pl-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-white text-xs font-bold">SJ</div>
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
                    <tr className="group hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-4 pl-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white text-xs font-bold">DM</div>
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
                    <tr className="group hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-4 pl-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-white text-xs font-bold">AO</div>
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

          {/* Section 2: Pending Claim Review */}
          <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>Pending Claims Requiring Manual Review</h2>
                <p className="text-sm text-slate-500 mt-1">High-risk AI flags detected in the following submissions</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-xl border border-outline-variant text-sm font-bold text-on-surface hover:bg-surface-container-low transition-colors">Export Report</button>
                <button className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 active:scale-95 transition-transform">Process All</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate" style={{ borderSpacing: '0 1rem' }}>
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
                <tbody>
                  <tr className="bg-surface-container-low shadow-sm">
                    <td className="py-6 pl-6 rounded-l-2xl font-mono text-xs font-bold text-primary">#CLM-99210</td>
                    <td className="py-6">
                      <div className="font-bold text-sm">Tomasz Kowalski</div>
                      <div className="text-xs text-slate-400">Created: 2h ago</div>
                    </td>
                    <td className="py-6">
                      <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight">Loss of Income</span>
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
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Eye size={18} /></button>
                        <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all">Approve</button>
                        <button className="px-4 py-1.5 bg-error text-white rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all">Reject</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-surface-container-low shadow-sm">
                    <td className="py-6 pl-6 rounded-l-2xl font-mono text-xs font-bold text-primary">#CLM-99208</td>
                    <td className="py-6">
                      <div className="font-bold text-sm">Linda Wu</div>
                      <div className="text-xs text-slate-400">Created: 5h ago</div>
                    </td>
                    <td className="py-6">
                      <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight">Accident Medical</span>
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
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Eye size={18} /></button>
                        <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all">Approve</button>
                        <button className="px-4 py-1.5 bg-error text-white rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all">Reject</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Current Loss Ratio */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>Current Loss Ratio</h2>
                  <p className="text-sm text-slate-500">Portfolio health and financial sustainability</p>
                </div>
                <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-2xl">
                  <HeartPulse size={20} />
                  <span className="text-sm font-black uppercase tracking-widest">Healthy</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <span className="text-[10px] font-black inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10 tracking-widest">Premium Collected</span>
                      <span className="text-sm font-bold text-on-surface">$2,440,210</span>
                    </div>
                    <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-surface-container-high">
                      <div className="bg-primary h-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <span className="text-[10px] font-black inline-block py-1 px-2 uppercase rounded-full text-secondary bg-secondary/10 tracking-widest">Total Payouts</span>
                      <span className="text-sm font-bold text-on-surface">$1,176,181</span>
                    </div>
                    <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-surface-container-high">
                      <div className="bg-secondary h-full" style={{ width: '48.2%' }}></div>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-secondary shadow-sm">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Net Margin (Q4)</p>
                      <h4 className="text-xl font-black text-on-surface" style={{ fontFamily: "'Manrope', sans-serif" }}>+12.4% <span className="text-sm font-medium text-slate-400 ml-1">vs last quarter</span></h4>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="96" cy="96" fill="transparent" r="80" stroke="#e1e8ff" strokeWidth="16"></circle>
                      <circle cx="96" cy="96" fill="transparent" r="80" stroke="#003d9b" strokeDasharray="502" strokeDashoffset="260" strokeWidth="16"></circle>
                    </svg>
                    <div className="absolute text-center">
                      <p className="text-4xl font-black text-on-surface" style={{ fontFamily: "'Manrope', sans-serif" }}>48.2%</p>
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Loss Ratio</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Secondary Stats */}
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-br from-on-surface to-slate-900 rounded-3xl p-6 text-white shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Zap size={20} className="text-blue-400" />
                  </div>
                  <span className="text-xs font-bold text-blue-400">+5.2%</span>
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Average Premium</p>
                <h3 className="text-3xl font-black" style={{ fontFamily: "'Manrope', sans-serif" }}>$34.20 <span className="text-sm font-medium text-slate-500">/wk</span></h3>
              </div>
              <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-transparent hover:border-primary/10 transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold text-on-surface">AI Processing Load</h4>
                  <MoreHorizontal size={18} className="text-slate-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end" style={{ height: '96px' }}>
                    <div className="w-2 bg-primary rounded-full" style={{ height: '32px' }}></div>
                    <div className="w-2 bg-primary rounded-full" style={{ height: '48px' }}></div>
                    <div className="w-2 bg-primary rounded-full" style={{ height: '40px' }}></div>
                    <div className="w-2 bg-primary/30 rounded-full" style={{ height: '64px' }}></div>
                    <div className="w-2 bg-primary rounded-full" style={{ height: '80px' }}></div>
                    <div className="w-2 bg-primary rounded-full" style={{ height: '56px' }}></div>
                    <div className="w-2 bg-primary rounded-full" style={{ height: '96px' }}></div>
                    <div className="w-2 bg-primary rounded-full" style={{ height: '72px' }}></div>
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
                  <div className="w-full h-full bg-primary-container flex items-center justify-center text-white text-sm font-bold">MV</div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Latest Reviewer</p>
                  <p className="text-sm font-black">Marcus V. <span className="font-normal text-slate-400 text-xs ml-1">approved 12 claims</span></p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Contextual FAB */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50">
        <Plus size={28} />
      </button>
    </div>
  );
}
