
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Ticket as TicketIcon, 
  Users, 
  Settings, 
  LogOut, 
  ShoppingCart, 
  Activity, 
  BarChart3, 
  Plus, 
  QrCode, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Wifi, 
  MoreVertical, 
  Bell, 
  Sun, 
  Moon, 
  Mail, 
  Lock,
  UserCheck
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { UserRole, Profile, Agency } from './types';
import { MOCK_AGENCIES, MOCK_TICKET_PLANS, MOCK_SALES_STATS } from './constants';

// --- Écran de Connexion (Design Pro Dark) ---
const LoginScreen: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation simple de rôle
    if (email.includes('super')) onLogin('super_admin');
    else if (email.includes('admin')) onLogin('agency_admin');
    else if (email.includes('comptable')) onLogin('accountant');
    else onLogin('employee');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050a18] p-4 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-[480px] z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)] mb-6">
            <Wifi className="text-white w-10 h-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight text-center mb-1">
            WIFIZONE PRO MANAGER
          </h1>
          <p className="text-slate-400 text-lg">Accès Console de Gestion</p>
        </div>

        <div className="bg-[#0b1120]/80 backdrop-blur-xl border border-slate-800/50 rounded-[40px] p-10 shadow-2xl">
          <form onSubmit={handleAuth}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 tracking-[0.15em] uppercase px-1">EMAIL</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-[#e9f0ff] text-[#1e293b] rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="super@wifi.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 tracking-[0.15em] uppercase px-1">MOT DE PASSE</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-[#e9f0ff] text-[#1e293b] rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button className="w-full h-16 bg-[#5e5ce6] hover:bg-[#4d4bbd] text-white font-black text-lg rounded-2xl mt-8 transition-all transform active:scale-[0.98] shadow-[0_10px_30px_rgba(94,92,230,0.3)] tracking-wide uppercase">
              SE CONNECTER
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-800/60 text-center">
            <button className="text-[11px] font-black text-slate-500 tracking-[0.1em] uppercase hover:text-white transition-colors">
              PARTENAIRE ? UTILISER VOTRE LIEN D'INVITATION
            </button>
          </div>
        </div>

        <p className="mt-12 text-center text-[11px] font-black text-slate-600 tracking-[0.2em] uppercase">
          SYSTÈME D'ACCÈS CLOUD SÉCURISÉ
        </p>
      </div>
    </div>
  );
};

// --- Composants UI ---
const SidebarItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-slate-200'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard: React.FC<{ title: string, value: string, change: string, icon: React.ReactNode }> = ({ title, value, change, icon }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-4 transition-colors">
    <div className="flex items-center justify-between">
      <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">{icon}</div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'}`}>
        {change}
      </span>
    </div>
    <div>
      <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-black text-slate-800 dark:text-white transition-colors">{value}</p>
    </div>
  </div>
);

// --- Application Principale ---
const App: React.FC = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSelling, setIsSelling] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    if (nextTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', nextTheme);
  };

  const handleLogin = (role: UserRole) => {
    setUser({
      id: 'u-123',
      agency_id: role === 'super_admin' ? null : 'a1',
      role,
      full_name: role === 'super_admin' ? 'Alpha Condé (Super)' : 'Moussa Camara',
      updated_at: new Date().toISOString()
    });
  };

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  const viewTitles: Record<string, string> = {
    dashboard: 'Tableau de bord',
    sale: 'Vente Express',
    tickets: 'Gestion des Tickets',
    sessions: 'Connexions Temps Réel',
    history: 'Historique des Ventes',
    agencies: 'Liste des Agences',
    clients: 'Base Clients',
    profiles: 'Gestion Équipe'
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Barre Latérale */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col p-6 overflow-y-auto transition-colors">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Wifi className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Wifi Zone</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          {user.role !== 'super_admin' && (
            <SidebarItem icon={<ShoppingCart size={20} />} label="Vente Express" active={currentView === 'sale'} onClick={() => setCurrentView('sale')} />
          )}
          <SidebarItem icon={<TicketIcon size={20} />} label="Tickets" active={currentView === 'tickets'} onClick={() => setCurrentView('tickets')} />
          <SidebarItem icon={<Activity size={20} />} label="Monitoring" active={currentView === 'sessions'} onClick={() => setCurrentView('sessions')} />
          <SidebarItem icon={<BarChart3 size={20} />} label="Historique Ventes" active={currentView === 'history'} onClick={() => setCurrentView('history')} />
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gestion</p>
            <SidebarItem icon={<UserCheck size={20} />} label="Clients" active={currentView === 'clients'} onClick={() => setCurrentView('clients')} />
            {user.role === 'super_admin' && (
              <SidebarItem icon={<Users size={20} />} label="Agences" active={currentView === 'agencies'} onClick={() => setCurrentView('agencies')} />
            )}
            {(user.role === 'super_admin' || user.role === 'agency_admin') && (
              <SidebarItem icon={<Users size={20} />} label="Équipe" active={currentView === 'profiles'} onClick={() => setCurrentView('profiles')} />
            )}
          </div>
        </nav>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
              {user.full_name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate dark:text-slate-200">{user.full_name}</p>
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-tighter">{user.role}</p>
            </div>
          </div>
          <button onClick={() => setUser(null)} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Contenu Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 transition-colors">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{viewTitles[currentView]}</h2>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
            <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Solde Agence</p>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">1,245,000 GNF</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'sale' && <ExpressSaleView onSaleComplete={(plan) => { setSelectedPlan(plan); setIsSelling(true); }} />}
          {currentView === 'tickets' && <TicketsView />}
          {currentView === 'history' && <SalesHistoryView />}
          {currentView === 'agencies' && <AgenciesView />}
          {['sessions', 'clients', 'profiles'].includes(currentView) && (
             <div className="flex items-center justify-center h-full text-slate-500 italic">Module en cours de développement...</div>
          )}
        </div>
      </main>

      {/* Confirmation de Vente */}
      {isSelling && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200 border dark:border-slate-800">
            <div className="bg-emerald-600 p-8 text-center text-white">
              <CheckCircle2 size={64} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Vente Terminée !</h3>
              <p className="text-emerald-100">Ticket {selectedPlan?.name} généré pour {selectedPlan?.price} GNF.</p>
            </div>
            <div className="p-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6 border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-black">CODE ACCÈS WIFI</p>
                <p className="text-4xl font-mono font-black text-slate-800 dark:text-white mb-4 tracking-tighter">CKY-8V2-P01</p>
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                    <QrCode size={140} className="text-slate-800" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">Valable 30 jours après activation</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setIsSelling(false)} className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all">Imprimer</button>
                <button onClick={() => setIsSelling(false)} className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all">Partager WhatsApp</button>
              </div>
              <button onClick={() => setIsSelling(false)} className="w-full mt-3 text-sm text-slate-400 hover:text-slate-600 font-medium">Retourner au Terminal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sous-Vues ---

const DashboardView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Recettes Jour" value="450,000 GNF" change="+15%" icon={<BarChart3 className="text-emerald-500" />} />
      <StatCard title="Tickets Vendus" value="1,240" change="+4.2%" icon={<ShoppingCart className="text-blue-500" />} />
      <StatCard title="Utilisateurs Actifs" value="84" change="+12" icon={<Activity className="text-orange-500" />} />
      <StatCard title="Base Clients" value="2,104" change="+128" icon={<Users className="text-purple-500" />} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Chiffre d'Affaires Hebdomadaire</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_SALES_STATS}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:opacity-10" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip contentStyle={{borderRadius: '12px', border: 'none', backgroundColor: '#1e293b', color: '#fff'}} />
              <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Dernières Ventes</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">#CKY-{100+i}P</p>
                  <p className="text-xs text-slate-400">il y a {i*2} min</p>
                </div>
              </div>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">5,000 GNF</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ExpressSaleView: React.FC<{ onSaleComplete: (plan: any) => void }> = ({ onSaleComplete }) => (
  <div className="max-w-4xl mx-auto space-y-8">
    <div className="text-center mb-10">
      <h3 className="text-3xl font-black text-slate-800 dark:text-white">Point de Vente Express</h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2">Générez un ticket en un clic pour votre client.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_TICKET_PLANS.map((plan, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer" onClick={() => onSaleComplete(plan)}>
          <div className={`w-14 h-14 rounded-2xl ${plan.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <Clock size={28} />
          </div>
          <h4 className="text-2xl font-black text-slate-800 dark:text-white">{plan.name}</h4>
          <p className="text-slate-400 dark:text-slate-400 mb-6 font-medium">{plan.duration_minutes} Minutes d'accès</p>
          <div className="flex items-end justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">PRIX</p>
              <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{plan.price.toLocaleString()} <span className="text-sm font-bold">GNF</span></p>
            </div>
            <button className="bg-slate-900 dark:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors">Vendre</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TicketsView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input type="text" placeholder="Rechercher un ticket..." className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none" />
      </div>
      <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
        <Plus size={18} /> Génération de masse
      </button>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Code</th>
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Profil</th>
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Prix</th>
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">État</th>
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Créé le</th>
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 font-mono font-bold text-slate-700 dark:text-slate-300">CKY-G72-M0{i}</td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold">1 Heure</span></td>
              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">5,000 GNF</td>
              <td className="px-6 py-4">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Actif
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">22 Nov 2023</td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><MoreVertical size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SalesHistoryView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md">Aujourd'hui</button>
        <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm">Semaine</button>
      </div>
      <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-200 dark:shadow-none">Exporter Recettes</button>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">ID Vente</th>
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Ticket</th>
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Vendeur</th>
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Montant</th>
            <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {[1, 2, 3, 4].map((i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 text-xs font-medium text-slate-400 uppercase">S-2311-{100+i}</td>
              <td className="px-6 py-4 font-mono font-bold text-slate-800 dark:text-slate-200">CKY-8V2-P0{i}</td>
              <td className="px-6 py-4 text-sm font-semibold">Moussa C.</td>
              <td className="px-6 py-4 font-black text-indigo-600 dark:text-indigo-400">5,000 GNF</td>
              <td className="px-6 py-4 text-sm text-slate-500">22/11/2023 10:45</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AgenciesView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {MOCK_AGENCIES.map((agency) => (
      <div key={agency.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600"><Users size={24} /></div>
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase">Active</span>
        </div>
        <h4 className="text-xl font-black text-slate-800 dark:text-white mb-1">{agency.name}</h4>
        <p className="text-xs text-slate-400 mb-6 uppercase tracking-tighter">Créée le {new Date(agency.created_at).toLocaleDateString()}</p>
        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
          <div><p className="text-[10px] text-slate-400 font-black uppercase">Statut SaaS</p><p className="text-sm font-bold text-emerald-500">PAYÉ</p></div>
          <div><p className="text-[10px] text-slate-400 font-black uppercase">Ventes Total</p><p className="text-sm font-bold text-slate-700 dark:text-slate-300">14.2M GNF</p></div>
        </div>
        <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 dark:shadow-none transition-all hover:bg-indigo-700">Paramétrer Agence</button>
      </div>
    ))}
    <button className="border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all bg-white/50 dark:bg-slate-900/30 group">
      <Plus size={48} className="mb-4 group-hover:scale-110 transition-transform" />
      <p className="font-bold text-lg">Enregistrer une Agence</p>
    </button>
  </div>
);

export default App;
