
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Ticket as TicketIcon, 
  Users, 
  Settings as SettingsIcon, 
  LogOut, 
  ShoppingCart, 
  Activity, 
  Plus, 
  QrCode, 
  Search, 
  CheckCircle2, 
  Wifi, 
  Sun, 
  Moon, 
  Mail, 
  Lock,
  Loader2,
  RefreshCcw,
  ChevronRight,
  ChevronLeft,
  Trash2,
  UploadCloud,
  FileSpreadsheet,
  Zap,
  ArrowUpRight,
  History,
  Server,
  AlertCircle,
  Building2,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { Profile, Ticket, Agency } from './types';
import { supabase } from './supabase';

// --- Interfaces Étendues ---
interface ExtendedProfile extends Profile {
  email?: string;
  status?: string;
}

interface ExtendedTicket extends Ticket {
  profile_name?: string;
  password?: string;
  validity_label?: string;
}

// --- Écran de Connexion ---
const LoginScreen: React.FC<{ onLogin: (session: any) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Accès refusé : Identifiants incorrects ou rôle non autorisé.");
      setLoading(false);
    } else if (data.session) {
      onLogin(data.session);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-dark-bg overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(94,92,230,0.14),transparent_50%)]"></div>
      <div className="w-full max-w-[440px] z-10 space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <div className="inline-flex p-5 rounded-[2rem] bg-brand-500 shadow-[0_0_50px_rgba(94,92,230,0.4)] animate-float">
            <Wifi className="text-white w-12 h-12" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Tickets-Wifi-<span className="text-brand-500">Zone</span></h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] opacity-70">Administration MikroTik Pro</p>
        </div>

        <div className="glass-card rounded-[2.5rem] p-10 space-y-6 shadow-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500 text-xs font-bold">
              <AlertCircle size={18} /> {error}
            </div>
          )}
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-500 transition-colors" size={20} />
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="admin@wifi-zone.com"
                  className="w-full h-14 pl-12 pr-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-white placeholder:text-slate-700 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mot de Passe</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-500 transition-colors" size={20} />
                <input 
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-white placeholder:text-slate-700 font-bold"
                />
              </div>
            </div>

            <button disabled={loading} className="w-full h-16 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-black rounded-2xl shadow-xl shadow-brand-500/30 transition-all active:scale-[0.97] flex items-center justify-center gap-3 uppercase text-xs tracking-widest italic">
              {loading ? <Loader2 className="animate-spin" /> : <>Déverrouiller le SaaS <ChevronRight size={18} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- App Principale ---
const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [tickets, setTickets] = useState<ExtendedTicket[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [isSelling, setIsSelling] = useState(false);
  const [lastTicket, setLastTicket] = useState<ExtendedTicket | null>(null);
  const [ticketSearchTerm, setTicketSearchTerm] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [agents, setAgents] = useState<ExtendedProfile[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchUserProfile(session.user.id);
      fetchAgents();
      fetchTickets();
      fetchAgencies();
    }
  }, [session]);

  const fetchUserProfile = async (uid: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', uid).single();
    if (data) {
      setUserProfile(data);
      if (data.role === 'super_admin') setCurrentView('super_dashboard');
    }
  };

  const fetchAgencies = async () => {
    const { data } = await supabase.from('agencies').select('*').order('created_at', { ascending: false });
    if (data) setAgencies(data);
  };

  const fetchAgents = async () => {
    setLoadingAgents(true);
    const { data } = await supabase.from('profiles').select('*').order('updated_at', { ascending: false });
    if (data) setAgents(data as ExtendedProfile[]);
    setLoadingAgents(false);
  };

  const fetchTickets = async () => {
    setLoadingData(true);
    const { data, error } = await supabase.from('tickets').select('*').order('created_at', { ascending: false });
    if (error) console.error("Supabase Fetch Error:", error);
    if (data) setTickets(data as ExtendedTicket[]);
    setLoadingData(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleImportTickets = async (newTickets: ExtendedTicket[]) => {
    setLoadingData(true);
    const agencyId = userProfile?.agency_id || 'a1';
    
    // On extrait uniquement les colonnes présentes dans la table tickets de Supabase
    // On ajoute 'profile_name' et 'password' qui ont été créés via le script SQL.
    const formattedForDb = newTickets.map((t) => ({
      agency_id: agencyId,
      code: t.code,
      password: t.password || t.code,
      profile_name: t.profile_name, // Stockage du profil MikroTik
      price: Number(t.price) || 0,
      duration_minutes: Number(t.duration_minutes) || 0,
      status: 'active' as const
    }));

    const { data, error } = await supabase
      .from('tickets')
      .insert(formattedForDb)
      .select();

    if (error) {
      console.error("Erreur insertion Supabase:", error);
      alert(`ERREUR DATABASE : ${error.message}. Vérifiez que les colonnes 'password' et 'profile_name' existent dans la table 'tickets'.`);
    } else if (data) {
      setTickets(prev => [...(data as ExtendedTicket[]), ...prev]);
      setCurrentView('tickets');
      alert(`${data.length} tickets importés avec succès.`);
    }
    setLoadingData(false);
  };

  const handleDeleteTicket = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce ticket ?")) return;

    setLoadingData(true);
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Erreur de suppression : " + error.message);
    } else {
      setTickets(prev => prev.filter(t => t.id !== id));
    }
    setLoadingData(false);
  };

  const handleSale = async (plan: any) => {
    setLoadingData(true);
    const availableTicket = tickets.find(t => t.status === 'active' && (t.profile_name === plan.name || t.code.includes(plan.name)));
    
    if (!availableTicket) {
      alert(`STOCK ÉPUISÉ : Aucun ticket pour le profil "${plan.name}" n'est en réserve.`);
      setLoadingData(false);
      return;
    }

    const { error } = await supabase
      .from('tickets')
      .update({ status: 'sold' })
      .eq('id', availableTicket.id);

    if (error) {
      alert("Erreur lors de la vente : " + error.message);
    } else {
      setTickets(prev => prev.map(t => t.id === availableTicket.id ? { ...t, status: 'sold' as const } : t));
      setLastTicket({ ...availableTicket, status: 'sold' });
      setIsSelling(true);
    }
    setLoadingData(false);
  };

  const isSuperAdmin = userProfile?.role === 'super_admin';

  if (!session) return <LoginScreen onLogin={setSession} />;

  return (
    <div className={`flex h-screen overflow-hidden font-sans ${isDarkMode ? 'dark' : ''} bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100 selection:bg-brand-500/20 transition-all duration-300`}>
      <aside className={`bg-white dark:bg-dark-card border-r border-slate-200 dark:border-white/5 flex flex-col p-6 transition-all duration-500 z-30 shadow-2xl ${sidebarCollapsed ? 'w-24' : 'w-80'}`}>
        <div className="flex items-center justify-between mb-12 px-2">
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="bg-brand-500 p-2.5 rounded-2xl shadow-xl shadow-brand-500/30 shrink-0">
              <Wifi className="text-white w-6 h-6" strokeWidth={2.5} />
            </div>
            {!sidebarCollapsed && <h1 className="text-xl font-black tracking-tighter uppercase whitespace-nowrap italic">Tickets-Wifi-<span className="text-brand-500">Zone</span></h1>}
          </div>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-slate-400">
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2 no-scrollbar overflow-y-auto">
          {isSuperAdmin ? (
            <>
              <SidebarBtn icon={<Globe size={22} />} label="Stats Globales" active={currentView === 'super_dashboard'} onClick={() => setCurrentView('super_dashboard')} collapsed={sidebarCollapsed} />
              <SidebarBtn icon={<Building2 size={22} />} label="Agences WiFi" active={currentView === 'agencies'} onClick={() => setCurrentView('agencies')} collapsed={sidebarCollapsed} />
              <SidebarBtn icon={<ShieldCheck size={22} />} label="Rôles & Accès" active={currentView === 'users'} onClick={() => setCurrentView('users')} collapsed={sidebarCollapsed} />
            </>
          ) : (
            <>
              <SidebarBtn icon={<LayoutDashboard size={22} />} label="Tableau de Bord" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} collapsed={sidebarCollapsed} />
              <SidebarBtn icon={<ShoppingCart size={22} />} label="Vente Directe" active={currentView === 'sale'} onClick={() => setCurrentView('sale')} collapsed={sidebarCollapsed} />
              <SidebarBtn icon={<TicketIcon size={22} />} label="Stock Tickets" active={currentView === 'tickets'} onClick={() => setCurrentView('tickets')} collapsed={sidebarCollapsed} />
              <SidebarBtn icon={<UploadCloud size={22} />} label="Import CSV" active={currentView === 'import'} onClick={() => setCurrentView('import')} collapsed={sidebarCollapsed} />
              <SidebarBtn icon={<Activity size={22} />} label="Monitoring Live" active={currentView === 'sessions'} onClick={() => setCurrentView('sessions')} collapsed={sidebarCollapsed} />
              <SidebarBtn icon={<History size={22} />} label="Comptabilité" active={currentView === 'history'} onClick={() => setCurrentView('history')} collapsed={sidebarCollapsed} />
            </>
          )}
          <div className="pt-6 border-t border-slate-100 dark:border-white/5 my-4">
             <SidebarBtn icon={<SettingsIcon size={22} />} label="Paramètres" active={currentView === 'settings'} onClick={() => setCurrentView('settings')} collapsed={sidebarCollapsed} />
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
          <div className={`flex items-center gap-3 px-4 mb-4 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-black italic shadow-inner">{(userProfile?.full_name || 'U').charAt(0)}</div>
            {!sidebarCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-[11px] font-black uppercase truncate italic">{userProfile?.full_name}</p>
                <p className="text-[9px] text-brand-500 font-bold uppercase truncate">{isSuperAdmin ? 'SUPER-ADMIN' : 'ADMIN AGENCE'}</p>
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="flex items-center gap-4 px-5 py-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all font-black text-xs uppercase tracking-widest w-full italic">
            <LogOut size={20} /> {!sidebarCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50 dark:bg-dark-bg transition-colors duration-500">
        <header className="h-24 border-b border-slate-200 dark:border-white/5 px-10 flex items-center justify-between bg-white/50 dark:bg-dark-bg/50 backdrop-blur-2xl z-20">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic">
              {currentView === 'super_dashboard' && 'Console Global Admin'}
              {currentView === 'agencies' && 'Partenaires WiFi Zone'}
              {currentView === 'dashboard' && 'Ma Zone'}
              {currentView === 'sale' && 'Point de Vente'}
              {currentView === 'tickets' && 'Gestion du Stock'}
              {currentView === 'import' && 'Chargement Stock MikroTik'}
              {currentView === 'users' && 'Équipe & Permissions'}
              {currentView === 'settings' && 'Réglages SaaS'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic opacity-60">Tickets-Wifi-Zone v1.0 | Connecté</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3.5 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-brand-500 rounded-2xl shadow-sm">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 no-scrollbar">
          {currentView === 'super_dashboard' && <SuperAdminDashboard tickets={tickets} agencies={agencies} />}
          {currentView === 'agencies' && <AgenciesManagementView agencies={agencies} />}
          {currentView === 'dashboard' && <DashboardView tickets={tickets} />}
          {currentView === 'sale' && <ExpressSaleView tickets={tickets} onSaleClick={handleSale} loading={loadingData} />}
          {currentView === 'tickets' && <TicketsView tickets={tickets} onSearch={setTicketSearchTerm} searchTerm={ticketSearchTerm} onDeleteTicket={handleDeleteTicket} loading={loadingData} />}
          {currentView === 'import' && <ImportStationView onImport={handleImportTickets} loading={loadingData} />}
          {currentView === 'users' && <UserManagementView agents={agents} loading={loadingAgents} onRefresh={fetchAgents} />}
          {currentView === 'settings' && <SettingsView profile={userProfile} onTheme={() => setIsDarkMode(!isDarkMode)} isDark={isDarkMode} />}
        </div>
      </main>

      {isSelling && lastTicket && <TicketModal ticket={lastTicket} onClose={() => setIsSelling(false)} />}
    </div>
  );
};

// --- Composants ---

const SidebarBtn = ({ icon, label, active, onClick, collapsed }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${active ? 'bg-brand-500 text-white shadow-2xl shadow-brand-500/40 translate-x-1' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}>
    <div className={active ? 'text-white' : 'text-slate-400 group-hover:text-brand-500 transition-colors'}>{icon}</div>
    {!collapsed && <span className="font-black text-[11px] uppercase tracking-widest italic">{label}</span>}
  </button>
);

const StatCard = ({ title, value, unit, color, icon }: any) => (
  <div className="glass-card p-10 rounded-[3rem] flex flex-col gap-5 border border-slate-200 dark:border-white/5 shadow-2xl hover:-translate-y-1 transition-transform">
    <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center ${color} bg-opacity-10 dark:bg-opacity-20 shadow-inner`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">{title}</p>
      <p className="text-3xl font-black tracking-tighter uppercase italic flex items-baseline gap-2">
        {value} {unit && <span className="text-[10px] font-bold tracking-normal opacity-50">{unit}</span>}
      </p>
    </div>
  </div>
);

const SuperAdminDashboard = ({ tickets, agencies }: { tickets: Ticket[], agencies: Agency[] }) => {
  const totalRev = tickets.filter(t => t.status === 'sold').reduce((acc, t) => acc + t.price, 0);
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard title="Agences Actives" value={agencies.length.toString()} color="text-brand-500 bg-brand-500" icon={<Building2 />} />
        <StatCard title="Revenu Global" value={totalRev.toLocaleString()} unit="GNF" color="text-emerald-500 bg-emerald-500" icon={<Zap />} />
        <StatCard title="Volume Tickets" value={tickets.length.toString()} color="text-blue-500 bg-blue-500" icon={<TicketIcon />} />
        <StatCard title="Santé SaaS" value="UP" color="text-rose-500 bg-rose-500" icon={<Activity />} />
      </div>

      <div className="glass-card rounded-[3rem] p-10 space-y-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/5 shadow-2xl">
        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-4 italic"><Activity className="text-brand-500" /> Analyse Multizone</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencies.map(agency => {
            const agencyTickets = tickets.filter(t => t.agency_id === agency.id);
            const agencySales = agencyTickets.filter(t => t.status === 'sold').reduce((acc, t) => acc + t.price, 0);
            return (
              <div key={agency.id} className="p-8 bg-slate-50 dark:bg-slate-950/50 rounded-[2.5rem] border border-slate-200 dark:border-white/5 flex flex-col gap-4">
                <h4 className="font-black text-sm uppercase italic text-brand-500">{agency.name}</h4>
                <div className="flex justify-between items-baseline">
                   <p className="text-2xl font-black italic">{agencySales.toLocaleString()} <span className="text-[10px] opacity-50">GNF</span></p>
                   <p className="text-[10px] font-black uppercase text-slate-500 italic">{agencyTickets.length} tickets</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AgenciesManagementView = ({ agencies }: { agencies: Agency[] }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
         <h3 className="text-2xl font-black uppercase tracking-tight italic text-brand-500">Partenaires Enregistrés</h3>
         <button onClick={() => alert('Création d\'agence')} className="h-16 px-10 bg-brand-500 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center gap-4 shadow-xl italic hover:bg-brand-600">
           <Plus size={22} /> Ajouter une Agence
         </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {agencies.map(agency => (
          <div key={agency.id} className="glass-card p-10 rounded-[3.5rem] space-y-6 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-bl-[4rem] flex items-center justify-center -mr-8 -mt-8 group-hover:bg-brand-500/10 transition-colors"><Building2 size={40} className="text-brand-500/20" /></div>
             <h4 className="text-xl font-black uppercase tracking-tighter italic">{agency.name}</h4>
             <code className="text-[10px] block p-2 bg-slate-100 dark:bg-slate-950/50 rounded-xl font-mono text-brand-500 break-all">{agency.id}</code>
             <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex gap-4">
                <button className="flex-1 h-12 bg-slate-100 dark:bg-white/5 rounded-2xl text-[10px] font-black uppercase italic hover:bg-brand-500 hover:text-white transition-all">Gérer</button>
                <button className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={18} /></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExpressSaleView = ({ tickets, onSaleClick, loading }: { tickets: ExtendedTicket[], onSaleClick: any, loading: boolean }) => {
  const SALE_PLANS = [
    { name: '2Go', label: 'Pass 2 Go', price: 3000, color: 'bg-blue-500/10 text-blue-500' },
    { name: '5Go', label: 'Pass 5 Go', price: 5000, color: 'bg-emerald-500/10 text-emerald-500' },
    { name: '24h', label: 'Pass 24h / 1jr', price: 5000, color: 'bg-purple-500/10 text-purple-500' },
    { name: '3jrs', label: 'Pass 3 Jours', price: 15000, color: 'bg-rose-500/10 text-rose-500' },
    { name: '7jrs', label: 'Pass 7 Jours', price: 35000, color: 'bg-indigo-500/10 text-indigo-500' },
    { name: '30jrs', label: 'Pass 30 Jours', price: 150000, color: 'bg-amber-500/10 text-amber-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-10 duration-700">
      {SALE_PLANS.map((plan, i) => {
        const stockAvailable = tickets.filter(t => t.status === 'active' && (t.profile_name === plan.name || t.code.includes(plan.name))).length;
        return (
          <button 
            key={i} 
            onClick={() => onSaleClick(plan)} 
            disabled={loading || stockAvailable === 0} 
            className={`glass-card rounded-[3.5rem] p-12 hover:scale-[1.03] active:scale-95 transition-all text-left group relative overflow-hidden border-2 border-transparent hover:border-brand-500/30 ${stockAvailable === 0 ? 'opacity-50 grayscale cursor-not-allowed' : 'shadow-2xl'}`}
          >
            <div className={`w-20 h-20 rounded-[2rem] ${plan.color} flex items-center justify-center mb-10 shadow-inner group-hover:rotate-6 transition-all`}>
               <Zap size={40} />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-4xl font-black tracking-tighter uppercase italic">{plan.name}</h4>
              <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${stockAvailable > 0 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                {stockAvailable} en stock
              </span>
            </div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-12 italic opacity-60">{plan.label}</p>
            <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-white/5">
               <p className="text-3xl font-black text-brand-500 italic tracking-tighter">{plan.price.toLocaleString()} <span className="text-[10px] font-bold uppercase tracking-normal">GNF</span></p>
               <div className={`w-14 h-14 ${stockAvailable > 0 ? 'bg-brand-500 shadow-xl' : 'bg-slate-400'} text-white rounded-2xl flex items-center justify-center`}>
                <Plus size={24} />
               </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const TicketsView = ({ tickets, onSearch, searchTerm, onDeleteTicket, loading }: { tickets: ExtendedTicket[], onSearch: (s: string) => void, searchTerm: string, onDeleteTicket: (id: string) => void, loading: boolean }) => {
  const filtered = tickets.filter(t => t.code.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" value={searchTerm} onChange={(e) => onSearch(e.target.value)}
            placeholder="Rechercher par code..."
            className="w-full h-14 pl-12 pr-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl focus:border-brand-500 outline-none transition-all font-bold text-sm shadow-sm"
          />
        </div>
        <div className="bg-brand-500/10 text-brand-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center border border-brand-500/20">
          Inventaire : {tickets.length} tickets
        </div>
      </div>

      <div className="glass-card rounded-[3.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-white/5">
               <th className="px-10 py-7 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Code Ticket</th>
               <th className="px-10 py-7 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Profile</th>
               <th className="px-10 py-7 text-[10px] font-black uppercase tracking-widest text-slate-500 italic text-center">État</th>
               <th className="px-10 py-7 text-[10px] font-black uppercase tracking-widest text-slate-500 italic text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {filtered.length > 0 ? filtered.map((t: any) => (
              <tr key={t.id} className="hover:bg-brand-500/5 transition-all group">
                 <td className="px-10 py-6 font-mono font-black text-brand-500 uppercase tracking-tighter italic text-base underline decoration-brand-500/20">{t.code}</td>
                 <td className="px-10 py-6 font-black uppercase text-[11px] tracking-widest">{t.profile_name || 'MikroTik'}</td>
                 <td className="px-10 py-6">
                    <div className="flex justify-center">
                      <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${t.status === 'sold' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-brand-500/10 text-brand-500 border-brand-500/20'}`}>
                         {t.status === 'active' ? 'Disponible' : 'Vendu'}
                      </span>
                    </div>
                 </td>
                 <td className="px-10 py-6 text-right">
                    <button 
                      onClick={() => onDeleteTicket(t.id)} 
                      disabled={loading}
                      className="p-3 bg-slate-100 dark:bg-slate-950/50 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all shadow-sm disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                 </td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="p-32 text-center text-slate-400 font-black uppercase italic opacity-30 tracking-[0.4em] text-xs">Aucun ticket en réserve.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Fonction utilitaire pour convertir la validité textuelle en minutes
const parseValidityToMinutes = (validity: string): number => {
  const v = validity.toLowerCase().trim();
  const num = parseInt(v);
  if (isNaN(num)) return 60; // Par défaut 1h

  if (v.includes('h')) return num * 60;
  if (v.includes('m')) return num;
  if (v.includes('j') || v.includes('d')) return num * 1440;
  if (v.includes('s') || v.includes('w')) return num * 10080;
  if (v.includes('mois')) return num * 43200;
  
  return num; // Si juste un nombre, on assume minutes
};

const ImportStationView: React.FC<{ onImport: (tickets: ExtendedTicket[]) => void, loading: boolean }> = ({ onImport, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewData, setPreviewData] = useState<ExtendedTicket[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      alert("Erreur : Format CSV requis.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
      
      // Extraction selon l'ordre : Code, Profile, Prix (GNF), Validité
      const rows = lines.slice(1).map((line, i) => {
        const parts = line.split(',').map(cell => cell?.trim() || "");
        if (parts.length < 4) return null;

        const [code, profile, prixStr, validite] = parts;
        if (!code || !profile) return null;

        const prix = parseInt(prixStr.replace(/[^0-9]/g, "")) || 0;
        const mins = parseValidityToMinutes(validite);

        return {
          id: `tmp-${i}`,
          code: code,
          password: code,
          profile_name: profile,
          validity_label: validite,
          price: prix,
          duration_minutes: mins,
          status: 'active' as const,
          created_at: new Date().toISOString()
        } as ExtendedTicket;
      }).filter(t => t !== null) as ExtendedTicket[];
      
      if (rows.length === 0) {
        alert("Aucune donnée valide trouvée. Vérifiez que votre CSV contient : Code, Profile, Prix, Validité");
      }
      setPreviewData(rows);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-3">
         <h3 className="text-4xl font-black tracking-tighter uppercase italic text-brand-500">Tickets-Wifi-Zone Station</h3>
         <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] italic">Chargement Cloud (CSV: Code, Profile, Prix, Validité)</p>
      </div>

      <div 
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-4 border-dashed rounded-[3.5rem] p-24 text-center cursor-pointer transition-all duration-500 group relative overflow-hidden ${dragActive ? 'border-brand-500 bg-brand-500/10' : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 shadow-inner'}`}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <div className={`w-24 h-24 bg-brand-500 text-white rounded-[2.5rem] mx-auto flex items-center justify-center mb-10 shadow-2xl transition-transform ${dragActive ? 'scale-110' : 'group-hover:scale-110'}`}>
          <UploadCloud size={48} />
        </div>
        <p className="text-2xl font-black uppercase tracking-tight italic">GLISSEZ VOTRE CSV ICI</p>
        <p className="text-[10px] text-slate-500 mt-2 font-black uppercase tracking-widest opacity-60">EXPLORATEUR DE FICHIERS</p>
      </div>

      {previewData.length > 0 && (
        <div className="glass-card rounded-[3rem] p-10 space-y-10 animate-in fade-in duration-500 border border-brand-500/20 shadow-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-3 italic">
              <FileSpreadsheet className="text-brand-500" /> Analyse : {previewData.length} tickets prêts
            </h4>
            <div className="flex gap-4">
              <button onClick={() => setPreviewData([])} className="px-8 py-3 bg-rose-500/10 text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-rose-500/20 italic hover:bg-rose-500 hover:text-white transition-all">Annuler</button>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-[2.5rem] border border-slate-200 dark:border-white/10 max-h-[450px] no-scrollbar shadow-inner bg-slate-50 dark:bg-slate-900/50">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 z-10">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Code</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Profile</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Prix (GNF)</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Validité</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {previewData.map((t, i) => (
                  <tr key={i} className="hover:bg-brand-500/5 transition-colors">
                    <td className="px-10 py-5 font-mono font-black text-brand-500 italic uppercase text-sm tracking-tighter">{t.code}</td>
                    <td className="px-10 py-5 font-black text-[11px] uppercase tracking-tight">{t.profile_name}</td>
                    <td className="px-10 py-5 font-bold text-xs">{t.price.toLocaleString()}</td>
                    <td className="px-10 py-5 font-bold text-xs">{t.validity_label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center pt-6">
            <button 
              onClick={() => onImport(previewData)} 
              disabled={loading} 
              className="w-full h-16 bg-brand-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(94,92,230,0.3)] hover:bg-brand-600 active:scale-95 transition-all italic flex items-center justify-center gap-3 border border-white/10"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Synchronisation Database...
                </>
              ) : (
                "Confirmer l'Importation Database"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardView = ({ tickets }: { tickets: ExtendedTicket[] }) => {
  const soldTickets = tickets.filter(t => t.status === 'sold');
  const revenue = soldTickets.reduce((acc, t) => acc + t.price, 0);
  const activeCount = tickets.filter(t => t.status === 'active').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard title="Revenu Global" value={revenue.toLocaleString()} unit="GNF" color="text-emerald-500 bg-emerald-500" icon={<Zap />} />
        <StatCard title="En Stock" value={activeCount.toString()} color="text-brand-500 bg-brand-500" icon={<TicketIcon />} />
        <StatCard title="Total Ventes" value={soldTickets.length.toString()} color="text-amber-500 bg-amber-500" icon={<CheckCircle2 />} />
        <StatCard title="Réseau" value="OK" color="text-blue-500 bg-blue-500" icon={<Server />} />
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 space-y-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/5 shadow-2xl">
        <h3 className="text-lg font-black uppercase italic flex items-center gap-3 text-brand-500"><History size={20} /> Ventes Récentes</h3>
        <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-white/5">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest italic text-slate-500">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4 text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {soldTickets.slice(0, 5).map(t => (
                <tr key={t.id} className="text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-brand-500 uppercase">{t.code}</td>
                  <td className="px-6 py-4 text-right">{t.price.toLocaleString()} GNF</td>
                </tr>
              ))}
              {soldTickets.length === 0 && (
                <tr><td colSpan={2} className="p-8 text-center text-slate-400 uppercase italic text-[10px]">Aucune vente</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const UserManagementView = ({ agents, loading, onRefresh }: { 
  agents: ExtendedProfile[], 
  loading: boolean, 
  onRefresh: () => void | Promise<void>
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
         <h3 className="text-xl font-black uppercase italic text-brand-500 flex items-center gap-3"><Users /> Gestion de l'Équipe</h3>
         <button onClick={onRefresh} className={`p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all ${loading ? 'animate-spin' : ''}`}><RefreshCcw size={18} /></button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {agents.map(agent => (
           <div key={agent.id} className="glass-card p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 flex items-center gap-5 group hover:border-brand-500/50 transition-all shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-xl font-black text-brand-500 italic shadow-inner">{(agent.full_name || 'U').charAt(0)}</div>
              <div className="flex-1 overflow-hidden">
                 <p className="text-sm font-black uppercase italic truncate">{agent.full_name || 'Opérateur'}</p>
                 <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest italic">{agent.role.replace('_', ' ')}</p>
              </div>
           </div>
         ))}
       </div>
    </div>
  );
};

const SettingsView = ({ profile, onTheme, isDark }: { profile: Profile | null, onTheme: () => void, isDark: boolean }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500">
       <div className="glass-card p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 space-y-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-6">
             <div className="w-24 h-24 rounded-[2rem] bg-brand-500 flex items-center justify-center text-white text-3xl font-black italic shadow-2xl shadow-brand-500/30">{(profile?.full_name || 'A').charAt(0)}</div>
             <div className="space-y-1">
                <h4 className="text-2xl font-black uppercase italic">{profile?.full_name}</h4>
                <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] italic">{profile?.role}</p>
             </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-white/5">
             <button onClick={onTheme} className="w-full h-16 px-6 bg-slate-900 dark:bg-white/5 rounded-2xl flex items-center justify-between group hover:bg-brand-500 transition-colors">
                <span className="text-[11px] font-black uppercase italic">Apparence Console</span>
                <div className="flex items-center gap-3">
                   <span className="text-[10px] font-bold opacity-50 uppercase">{isDark ? 'Sombre' : 'Clair'}</span>
                   {isDark ? <Moon className="text-brand-500 group-hover:text-white" /> : <Sun className="text-amber-500 group-hover:text-white" />}
                </div>
             </button>
          </div>
       </div>
    </div>
  );
};

const TicketModal = ({ ticket, onClose }: { ticket: ExtendedTicket, onClose: any }) => (
  <div className="fixed inset-0 bg-dark-bg/95 backdrop-blur-3xl flex items-center justify-center z-[100] p-6 animate-in fade-in duration-500">
    <div className="bg-white dark:bg-dark-card rounded-[4rem] shadow-2xl max-w-sm w-full overflow-hidden border border-white/10 transform animate-in zoom-in duration-700">
      <div className="bg-brand-500 p-12 text-center text-white relative">
        <div className="bg-white/20 p-6 rounded-[2rem] inline-flex mb-8 backdrop-blur-md animate-float shadow-xl"><CheckCircle2 size={56} className="text-white" /></div>
        <h3 className="text-4xl font-black tracking-tighter uppercase italic text-white">Tickets-Wifi-Zone</h3>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mt-2">Délivrer le coupon au client</p>
      </div>
      <div className="p-12 space-y-10 bg-white dark:bg-dark-card">
        <div className="bg-slate-50 dark:bg-slate-950/50 rounded-[3rem] p-10 border-4 border-dashed border-slate-200 dark:border-white/10 text-center shadow-inner">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mb-6 italic">CODE ACCÈS</p>
          <div className="space-y-2 mb-10">
            <p className="text-5xl font-mono font-black text-brand-500 tracking-tighter uppercase italic">{ticket.code}</p>
            {ticket.password && <p className="text-sm font-mono font-bold text-slate-400">Pass: {ticket.password}</p>}
          </div>
          <div className="flex justify-center mb-10">
            <div className="p-6 bg-white rounded-[2.5rem] shadow-lg"><QrCode size={160} className="text-slate-900" /></div>
          </div>
        </div>
        <button onClick={onClose} className="h-16 w-full bg-slate-900 text-white font-black rounded-3xl transition-all uppercase text-[10px] tracking-[0.3em] italic hover:bg-brand-500 shadow-xl">Fermer & Continuer</button>
      </div>
    </div>
  </div>
);

export default App;
