'use client';

import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Tractor,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Droplets,
  Fuel,
  Activity,
  User,
  LogOut
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

type DashboardData = {
  stats: {
    totalExcavation: number;
    totalEmbankment: number;
    inspectionsPassed: number;
    inspectionsFailed: number;
    fuelEfficiency: number;
  };
  earthworkProgress: Array<{ date: string; excavation: number; embankment: number }>;
  recentInspections: Array<{ id: string; element: string; date: string; status: string; inspector: string }>;
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const NAVIGATION = [
    { id: 'Overview', label: 'ទិដ្ឋភាពទូទៅ / Overview', icon: LayoutDashboard },
    { id: 'Concrete', label: 'ត្រួតពិនិត្យបេតុង / Concrete Checks', icon: ShieldCheck },
    { id: 'Earthworks', label: 'ការងារដី / Earthworks', icon: Tractor },
    { id: 'Reports', label: 'របាយការណ៍ / Reports', icon: FileText },
    { id: 'Settings', label: 'ការកំណត់ / Settings', icon: Settings },
  ];

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <Activity className="w-6 h-6 animate-spin mr-3 text-indigo-600" />
        កំពុងទាញយកទិន្នន័យ... / Loading Dashboard Data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-900 font-sans">
      {/* Sidebar */}
      <aside
        className={
          (sidebarOpen ? 'w-64' : 'w-0 md:w-20') +
          ' transition-all duration-300 ease-in-out bg-white border-r border-gray-200 flex flex-col overflow-hidden shrink-0 fixed md:relative z-20 h-full'
        }
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shrink-0">
              <Droplets size={20} />
            </div>
            {sidebarOpen && <span className="font-bold text-gray-900 tracking-tight">HydroManage</span>}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 flex flex-col gap-1.5 overflow-y-auto">
          {NAVIGATION.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ' +
                  (isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900')
                }
                title={item.label}
              >
                <Icon size={20} className={'shrink-0 ' + (isActive ? 'text-indigo-600' : '')} />
                {sidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span className="font-medium text-sm whitespace-nowrap">ចាកចេញ / Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 relative z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg md:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
              {NAVIGATION.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="ស្វែងរក... / Search..." 
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64 bg-gray-50 focus:bg-white transition-all"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold ml-2">
              <User size={16} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatCard 
                title="មាឌដីជីកសរុប / Total Excavation" 
                value={data.stats.totalExcavation.toLocaleString() + ' m³'} 
                icon={Tractor}
                trend="+12%"
                color="text-amber-600"
                bgColor="bg-amber-100"
              />
              <StatCard 
                title="មាឌដីចាក់សរុប / Total Embankment" 
                value={data.stats.totalEmbankment.toLocaleString() + ' m³'} 
                icon={TrendingUp}
                trend="+8%"
                color="text-emerald-600"
                bgColor="bg-emerald-100"
              />
              <StatCard 
                title="បេតុងជាប់ស្តង់ដារ / Concrete Passed" 
                value={data.stats.inspectionsPassed} 
                subtitle={'សរុប / Out of ' + (data.stats.inspectionsPassed + data.stats.inspectionsFailed) + ' checks'}
                icon={ShieldCheck}
                color="text-indigo-600"
                bgColor="bg-indigo-100"
              />
              <StatCard 
                title="កម្រិតស៊ីប្រេង / Fuel Efficiency (Avg)" 
                value={data.stats.fuelEfficiency + ' L/m³'} 
                icon={Fuel}
                trend="ល្អ / Optimal"
                trendColor="text-emerald-600"
                color="text-sky-600"
                bgColor="bg-sky-100"
              />
            </div>

            {/* Charts & Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Earthwork Progress Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">វឌ្ឍនភាពការងារដី / Earthwork Progress (7 Days)</h2>
                </div>
                <div className="p-6 flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.earthworkProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                      />
                      <Tooltip 
                        cursor={{ fill: '#F3F4F6' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend 
                        verticalAlign="top" 
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: '14px', color: '#374151' }}
                      />
                      <Bar dataKey="excavation" name="ដីជីក / Excavation (m³)" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={32} />
                      <Bar dataKey="embankment" name="ដីចាក់ / Embankment (m³)" fill="#10B981" radius={[4, 4, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Inspections Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">ការត្រួតពិនិត្យថ្មីៗ / Recent Inspections</h2>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">មើលទាំងអស់ / View All</button>
                </div>
                <div className="p-0 flex-1 overflow-auto">
                  <ul className="divide-y divide-gray-100">
                    {data.recentInspections.map((inspection) => (
                      <li key={inspection.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{inspection.element}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">{inspection.id}</span>
                              <span className="text-gray-300">•</span>
                              <span className="text-xs text-gray-500">{inspection.date}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">វិស្វករ / Inspector: {inspection.inspector}</p>
                          </div>
                          <div className="shrink-0 mt-1">
                            {inspection.status === 'Passed' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle2 size={12} />
                                ជាប់ / Passed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                                <XCircle size={12} />
                                ធ្លាក់ / Failed
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

// ---------------------------------
// Subcomponents
// ---------------------------------

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendColor = "text-indigo-600",
  color, 
  bgColor 
}: { 
  title: string, 
  value: string | number, 
  subtitle?: string, 
  icon: any, 
  trend?: string,
  trendColor?: string,
  color: string, 
  bgColor: string 
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={bgColor + ' ' + color + ' p-3 rounded-lg'}>
          <Icon size={24} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={'font-medium ' + trendColor}>{trend}</span>
          <span className="text-gray-400 ml-2">ធៀបសប្តាហ៍មុន / from last week</span>
        </div>
      )}
    </div>
  );
}
