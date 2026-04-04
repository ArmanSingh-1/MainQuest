import React from 'react';

export default function AdminSidebar() {
  return (
    <aside className="bg-slate-950 dark:bg-black w-64 fixed left-0 top-0 shadow-2xl flex flex-col h-full py-6 z-50">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-headline">ARKA</h1>
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Parametric AI</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        <a className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl border-r-4 border-blue-500 scale-95 transition-all" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-medium">Dashboard</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white transition-all scale-95 cursor-pointer" href="#">
          <span className="material-symbols-outlined">group</span>
          <span className="font-medium">Users</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white transition-all scale-95 cursor-pointer" href="#">
          <span className="material-symbols-outlined">description</span>
          <span className="font-medium">Claims</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white transition-all scale-95 cursor-pointer" href="#">
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-medium">Analytics</span>
        </a>
      </nav>
      <div className="mt-auto px-6 mb-8">
        <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">add</span>
          New Policy
        </button>
      </div>
      <footer className="px-3 space-y-1 border-t border-slate-800 pt-6">
        <a className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-white transition-colors cursor-pointer" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm">Settings</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-white transition-colors cursor-pointer" href="#">
          <span className="material-symbols-outlined">help</span>
          <span className="text-sm">Support</span>
        </a>
      </footer>
    </aside>
  );
}
