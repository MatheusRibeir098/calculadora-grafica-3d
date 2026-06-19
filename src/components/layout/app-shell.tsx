'use client';

import { useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { MainPanel } from './main-panel';
import { ViewportArea } from './viewport-area';
import { MobileNav } from './mobile-nav';

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <Header onMenuClick={() => setMobileOpen(true)} />
      <div
        className="flex-1 overflow-hidden grid
          grid-cols-[1fr] grid-rows-[1fr_2fr]
          [grid-template-areas:'main'_'viewport']
          md:grid-cols-[60px_1fr_2fr] md:grid-rows-[1fr]
          md:[grid-template-areas:'sidebar_main_viewport']
          lg:grid-cols-[280px_1fr_2fr]"
      >
        <Sidebar />
        <MainPanel />
        <ViewportArea />
      </div>
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </div>
  );
}
