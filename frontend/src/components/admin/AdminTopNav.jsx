import React from 'react';

export default function AdminTopNav() {
  return (
    <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center h-20 px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            search
          </span>
          <input 
            className="w-full bg-surface-container-high border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-slate-400 transition-all font-body outline-none" 
            placeholder="Search workers, policies, or claims..." 
            type="text" 
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
        </button>
        <button className="text-slate-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-surface-container-high">
          <div className="text-right">
            <p className="text-sm font-bold text-on-surface leading-none">Alex Rivers</p>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-1">Admin User</p>
          </div>
          <img 
            alt="Admin Profile" 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/10" 
            src="https://placehold.co/100x100/1e293b/ffffff?text=AR" 
          />
        </div>
      </div>
    </header>
  );
}
