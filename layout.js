import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  AlertTriangle, 
  Map, 
  FileText, 
  Settings,
  Wifi,
  WifiOff,
  Shield
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Landing"),
    icon: Home,
    color: "text-blue-600"
  },
  {
    title: "Report",
    url: createPageUrl("ReportHazard"),
    icon: AlertTriangle,
    color: "text-red-500"
  },
  {
    title: "Feed",
    url: createPageUrl("HazardFeed"),
    icon: Map,
    color: "text-emerald-600"
  },
  {
    title: "My Reports",
    url: createPageUrl("MyReports"),
    icon: FileText,
    color: "text-teal-600"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('synced');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50">
      <style>{`
        :root {
          --coastal-blue: #1e40af;
          --coastal-green: #059669;
          --danger-red: #dc2626;
          --warning-orange: #ea580c;
          --safe-green: #16a34a;
          --coastal-teal: #0891b2;
        }
        
        .coastal-shadow {
          box-shadow: 0 4px 20px rgba(30, 64, 175, 0.1);
        }
        
        .emergency-pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100 coastal-shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={createPageUrl("Landing")} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent">
                  CoastalGuard AI
                </h1>
                <p className="text-xs text-gray-500">Protecting Our Coasts</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              {/* Connection Status */}
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-emerald-600" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
                  {isOnline ? "Online" : "Offline"}
                </Badge>
              </div>

              {/* Sync Status */}
              {syncStatus !== 'synced' && (
                <Badge variant="outline" className="text-xs">
                  {syncStatus === 'syncing' ? 'Syncing...' : 'Pending Sync'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-blue-100 coastal-shadow z-40">
        <NavigationMenu className="max-w-full">
          <NavigationMenuList className="flex justify-around w-screen px-4 py-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <NavigationMenuItem key={item.title}>
                  <Link to={item.url}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`flex flex-col items-center gap-1 h-auto p-2 min-w-16 transition-all duration-200 ${
                        isActive 
                          ? `${item.color} bg-blue-50` 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${item.title === 'Report' ? 'emergency-pulse' : ''}`} />
                      <span className="text-xs font-medium">{item.title}</span>
                      {isActive && (
                        <div className="w-4 h-0.5 bg-current rounded-full mt-1" />
                      )}
                    </Button>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}