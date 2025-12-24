
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
  Globe,
  Star,
  Info,
  X,
  CreditCard,
  BarChart3,
  Download,
  Filter,
  UserPlus,
  UserCheck,
  UserCog,
  Link,
  Copy,
  Shield,
  User
} from 'lucide-react';
import { Profile, Ticket, Agency, UserRole } from './types';
import { supabase } from './supabase';

// --- Interfaces Étendues ---
interface ExtendedProfile extends Profile {
  email?: string;
  status?: 'active' | 'pending';
}

interface ExtendedTicket extends Ticket {
  profile_name?: string;
  password?: string;
}

// --- Composant Toast Premium ---
const Toast: React.FC<{ message: string; type: 'error' | 'success' }> = ({ message, type }) => (
  <div className={`fixed bottom-8 right-8 z-[600] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8 duration-500 border backdrop-blur-2xl ${
    type === 'error' ? 'bg-rose-500/20 text-rose-200 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30'
  }`}>
    <div className={`p-2 rounded-xl ${type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'}`}>
      {type === 'error' ? <AlertCircle size={18} className="text-white" /> : <CheckCircle2 size={18} className="text-white" />}
    </div>
    <span className="font-bold text-sm tracking-tight">{message}</span>
  </div>
);

// --- Écran de Connexion Pro ---
const LoginScreen: React.FC<{ onLogin: (session: any) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      if (data.session) onLogin(data.session);
    } catch (err: any) {
      setError("Identifiants incorrects. Accès restreint par invitation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.05),transparent_40%)]"></div>
      
      <div className="w-full max-w-[460px] relative z-10 animate-in fade-in zoom-in duration-1000">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex p-5 rounded-3xl bg-brand-500 shadow-[0_0_50px_rgba(99,102,241,0.4)] animate-float mb-4">
            <Wifi className="text-white w-10 h-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white uppercase italic">
            TICKETS-WIFI-<span className="text-brand-500 underline decoration-4 underline-offset-8">ZONE</span>
          </h1>
          <p className="text-slate-500 font-medium uppercase tracking-[0.3em] text-[10px]">Cloud Infrastructure & POS</p>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
          <div className="bg-brand-500/10 border border-brand-500/20 p-4 rounded-xl flex items-start gap-3">
            <Info className="text-brand-500 shrink-0" size={18} />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed italic">
              Accès restreint. Seuls les administrateurs invités par le Super-Admin peuvent se connecter.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 text-xs font-bold italic animate-in slide-in-from-top-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 italic">Email Administrateur</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-500 transition-colors" size={20} />
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="admin@wifi-zone.pro"
                  className="w-full h-14 pl-14 pr-6 bg-slate-900/50 border border-white/5 rounded-2xl focus:border-brand-500 outline-none transition-all text-white placeholder:text-slate-700 font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 italic">Clé d'Accès</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-500 transition-colors" size={20} />
                <input 
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••••••"
                  className="w-full h-14 pl-14 pr-6 bg-slate-900/50 border border-white/5 rounded-2xl focus:border-brand-500 outline-none transition-all text-white placeholder:text-slate-700 font-semibold"
                />
              </div>
            </div>

            <button disabled={loading} className="w-full h-16 bg-brand-500 hover:bg-brand-600 text-white font-extrabold rounded-2xl shadow-lg shadow-brand-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase text-xs tracking-widest btn-glow">
              {loading ? <Loader2 className="animate-spin" /> : <>Ouvrir le Panneau <ChevronRight size={18} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- App SaaS Pro ---
const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tickets, setTickets] = useState<ExtendedTicket[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [agents, setAgents] = useState<ExtendedProfile[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'error' | 'success'} | null>(null);
  const [isCreatingAgency, setIsCreatingAgency] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [generatedInviteLink, setGeneratedInviteLink] = useState<string | null>(null);
  const [isSelling, setIsSelling] = useState(false);
  const [lastTicket, setLastTicket] = useState<ExtendedTicket | null>(null);
  const [ticketSearchTerm, setTicketSearchTerm] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchUserProfile(session.user.id);
      fetchTickets();
      fetchAgencies();
      fetchAgents();
    }
  }, [session]);

  const showToast = (message: string, type: 'error' | 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

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
    const { data } = await supabase.from('tickets').select('*').order('created_at', { ascending: false });
    if (data) setTickets(data as ExtendedTicket[]);
    setLoadingData(false);
  };

  const handleCreateAgency = async (name: string) => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase.from('agencies').insert([{ name }]).select();
      if (error) throw error;
      if (data) {
        setAgencies(prev => [...data, ...prev]);
        showToast("Nouvelle zone déployée.", 'success');
        setIsCreatingAgency(false);
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: UserRole) => {
    setLoadingAgents(true);
    try {
      const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
      if (error) throw error;
      setAgents(prev => prev.map(a => a.id === userId ? { ...a, role: newRole } : a));
      showToast("Permissions mises à jour.", 'success');
    } catch (err) {
      showToast("Échec mise à jour rôle.", 'error');
    } finally {
      setLoadingAgents(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Révoquer l'accès ?")) return;
    setLoadingAgents(true);
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error) throw error;
      setAgents(prev => prev.filter(a => a.id !== userId));
      showToast("Accès révoqué.", 'success');
    } catch (err) {
      showToast("Erreur suppression.", 'error');
    } finally {
      setLoadingAgents(false);
    }
  };

  const handleGenerateInvite = (details: { role: UserRole, agency_id?: string }) => {
    const token = btoa(JSON.stringify({ ...details, exp: Date.now() + 86400000 }));
    const link = `${window.location.origin}/join?token=${token}`;
    setGeneratedInviteLink(link);
    showToast("Lien d'invitation généré.", 'success');
  };

  const handleImportTickets = async (rows: any[]) => {
    setLoadingData(true);
    try {
      const agencyId = userProfile?.agency_id;
      const ticketsToInsert = rows.map(row => ({ ...row, agency_id: agencyId }));
      const { data, error } = await supabase.from('tickets').insert(ticketsToInsert).select();
      if (error) throw error;
      if (data) {
        setTickets(prev => [...(data as ExtendedTicket[]), ...prev]);
        showToast(`${data.length} coupons ajoutés.`, 'success');
        setCurrentView('tickets');
      }
    } catch (err) {
      showToast("Erreur d'injection MikroTik.", 'error');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSale = async (plan: any) => {
    setLoadingData(true);
    const availableTicket = tickets.find(t => t.status === 'active' && t.code.toLowerCase().includes(plan.name.toLowerCase()));
    if (!availableTicket) {
      showToast("Plus de coupons disponibles pour ce plan.", 'error');
      setLoadingData(false);
      return;
    }
    try {
      const { error } = await supabase.from('tickets').update({ status: 'sold' }).eq('id', availableTicket.id);
      if (error) throw error;
      setTickets(prev => prev.map(t => t.id === availableTicket.id ? { ...t, status: 'sold' as const } : t));
      setLastTicket({ ...availableTicket, status: 'sold' });
      setIsSelling(true);
      showToast("Vente réussie.", 'success');
    } catch (err) {
      showToast("Erreur transactionnelle.", 'error');
    } finally {
      setLoadingData(false);
    }
  };

  const isSuperAdmin = userProfile?.role === 'super_admin';

  if (!session) return <LoginScreen onLogin={setSession} />;

  return (
    <div className="flex h-screen overflow-hidden bg-dark-bg text-slate-100 transition-all duration-300">
      {toast && <Toast message={toast.message} type={toast.type} />}
      
      {/* Sidebar Pro */}
      <aside className={`glass-panel border-r border-white/5 flex flex-col p-6 transition-all duration-500 z-50 ${sidebarCollapsed ? 'w-24' : 'w-72'}`}>
        <div className="flex items-center justify-between mb-12 px-2">
          <div className="flex items-center gap-3 overflow-hidden group">
            <div className="bg-brand-500 p-2.5 rounded-xl shadow-lg shadow-brand-500/30 shrink-0 group-hover:rotate-6 transition-transform">
              <Wifi className="text-white w-5 h-5" strokeWidth={3} />
            </div>
            {!sidebarCollapsed && <h1 className="text-lg font-black tracking-tight uppercase italic whitespace-nowrap">WIFI-ZONE</h1>}
          </div>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-brand-500 transition-all">
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2 no-scrollbar overflow-y-auto">
          {isSuperAdmin ? (
            <>
              <SidebarItem icon={<Globe size={20} />} label="Parc Global" active={currentView === 'super_dashboard'} onClick={() => setCurrentView('super_dashboard')} collapsed={sidebarCollapsed} />
              <SidebarItem icon={<Building2 size={20} />} label="Agences WiFi" active={currentView === 'agencies'} onClick={() => setCurrentView('agencies')} collapsed={sidebarCollapsed} />
              <SidebarItem icon={<Users size={20} />} label="Utilisateurs & Accès" active={currentView === 'users'} onClick={() => setCurrentView('users')} collapsed={sidebarCollapsed} />
            </>
          ) : (
            <>
              <SidebarItem icon={<LayoutDashboard size={20} />} label="Tableau de Bord" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} collapsed={sidebarCollapsed} />
              <SidebarItem icon={<ShoppingCart size={20} />} label="Caisse Express" active={currentView === 'sale'} onClick={() => setCurrentView('sale')} collapsed={sidebarCollapsed} />
              <SidebarItem icon={<TicketIcon size={20} />} label="Gestion Stock" active={currentView === 'tickets'} onClick={() => setCurrentView('tickets')} collapsed={sidebarCollapsed} />
              <SidebarItem icon={<Users size={20} />} label="Mon Équipe" active={currentView === 'team'} onClick={() => setCurrentView('team')} collapsed={sidebarCollapsed} />
              <SidebarItem icon={<UploadCloud size={20} />} label="Injection MikroTik" active={currentView === 'import'} onClick={() => setCurrentView('import')} collapsed={sidebarCollapsed} />
            </>
          )}
          <div className="pt-6 border-t border-white/5 mt-4">
             <SidebarItem icon={<SettingsIcon size={20} />} label="Configuration" active={currentView === 'settings'} onClick={() => setCurrentView('settings')} collapsed={sidebarCollapsed} />
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className={`flex items-center gap-3 px-3 mb-6 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-black italic border border-brand-500/20 shadow-inner">
              {(userProfile?.full_name || 'U').charAt(0)}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-[11px] font-black uppercase truncate leading-none mb-1">{userProfile?.full_name}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest truncate">{userProfile?.role.replace('_', ' ')}</p>
              </div>
            )}
          </div>
          <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-3 px-5 py-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest w-full italic group">
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> {!sidebarCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <header className="h-24 border-b border-white/5 px-10 flex items-center justify-between glass-panel z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black tracking-tight uppercase italic leading-none">
              {currentView === 'dashboard' && 'Rapport d\'activité'}
              {currentView === 'sale' && 'Terminal Vente'}
              {currentView === 'tickets' && 'Inventaire Coupons'}
              {currentView === 'agencies' && 'Gestion des Zones'}
              {currentView === 'users' && 'Administration des Accès'}
              {currentView === 'team' && 'Équipe Opérationnelle'}
              {currentView === 'super_dashboard' && 'Monitoring Global'}
            </h2>
            <div className="h-4 w-px bg-white/10 hidden md:block"></div>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest hidden md:flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
              Session Sécurisée
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-3.5 bg-white/5 text-slate-400 hover:text-brand-500 rounded-xl border border-white/5 transition-all hover:scale-105 active:rotate-180 duration-500">
              <RefreshCcw size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 no-scrollbar animate-in fade-in duration-700">
          {currentView === 'dashboard' && <Dashboard tickets={tickets} />}
          {currentView === 'sale' && <ExpressSale tickets={tickets} onSale={handleSale} loading={loadingData} />}
          {currentView === 'tickets' && <TicketList tickets={tickets} onSearch={setTicketSearchTerm} searchTerm={ticketSearchTerm} />}
          {currentView === 'agencies' && <AgencyGrid agencies={agencies} onCreate={() => setIsCreatingAgency(true)} />}
          {currentView === 'users' && (
            <UserManagement 
              users={agents} 
              onInvite={() => setIsInviting(true)} 
              onUpdateRole={handleUpdateRole} 
              onDelete={handleDeleteUser}
              isSuperAdmin={true}
              agencies={agencies}
            />
          )}
          {currentView === 'team' && (
             <UserManagement 
              users={agents.filter(a => a.agency_id === userProfile?.agency_id)} 
              onInvite={() => setIsInviting(true)} 
              onUpdateRole={handleUpdateRole} 
              onDelete={handleDeleteUser}
              isSuperAdmin={false}
           />
          )}
          {currentView === 'import' && <ImportPanel onImport={handleImportTickets} loading={loadingData} />}
          {currentView === 'super_dashboard' && <SuperDashboard tickets={tickets} agencies={agencies} />}
        </div>
      </main>

      {isSelling && lastTicket && <TicketReceipt ticket={lastTicket} onClose={() => setIsSelling(false)} />}
      {isCreatingAgency && <AgencyModal onClose={() => setIsCreatingAgency(false)} onSubmit={handleCreateAgency} loading={loadingData} />}
      {isInviting && (
        <InviteModal 
          onClose={() => { setIsInviting(false); setGeneratedInviteLink(null); }} 
          onGenerate={handleGenerateInvite} 
          link={generatedInviteLink}
          isSuperAdmin={isSuperAdmin}
          agencies={agencies}
        />
      )}
    </div>
  );
};

// --- Composant UserManagement ---

const UserManagement = ({ users, onInvite, onUpdateRole, onDelete, isSuperAdmin, agencies }: any) => {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-brand-500 leading-none underline decoration-4 underline-offset-8">
            {isSuperAdmin ? 'ADMINISTRATION GLOBALE' : 'GESTION ÉQUIPE'}
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] italic">Contrôle granulaire des accès</p>
        </div>
        <button onClick={onInvite} className="h-16 px-10 bg-brand-500 text-white rounded-[1.8rem] font-black uppercase text-xs tracking-widest flex items-center gap-4 shadow-xl shadow-brand-500/30 btn-glow italic">
          <UserPlus size={22} strokeWidth={3} /> Générer Invitation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user: ExtendedProfile) => (
          <div key={user.id} className="premium-card p-8 rounded-[3rem] group relative overflow-hidden flex flex-col gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center text-2xl font-black text-brand-500 italic border border-brand-500/10 shadow-inner group-hover:scale-110 transition-transform">
                {(user.full_name || 'U').charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-lg font-black italic uppercase tracking-tight truncate">{user.full_name || 'Nouvel Utilisateur'}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <RoleBadge role={user.role} />
                </div>
              </div>
            </div>

            {isSuperAdmin && user.agency_id && (
              <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
                <Building2 size={14} className="text-slate-500" />
                <p className="text-[9px] font-black text-slate-400 uppercase truncate">
                  {agencies?.find((a: any) => a.id === user.agency_id)?.name || 'Zone Inconnue'}
                </p>
              </div>
            )}

            <div className="pt-6 border-t border-white/5 flex gap-3 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">Compte Actif</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  const roles: UserRole[] = ['agency_admin', 'employee', 'accountant'];
                  const next = roles[(roles.indexOf(user.role) + 1) % roles.length];
                  onUpdateRole(user.id, next);
                }} className="p-3 bg-white/5 hover:bg-brand-500/20 text-slate-400 hover:text-brand-500 rounded-xl transition-all"><UserCog size={18} /></button>
                <button onClick={() => onDelete(user.id)} className="p-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="col-span-full py-24 text-center glass-panel rounded-[3rem] border-dashed border-2">
            <Users size={48} className="mx-auto text-slate-700 mb-4 opacity-20" />
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] italic opacity-40">Aucun membre dans cette vue.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RoleBadge = ({ role }: { role: string }) => {
  const styles: any = {
    super_admin: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    agency_admin: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
    employee: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    accountant: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${styles[role] || 'bg-slate-500/10 text-slate-400'}`}>
      {role.replace('_', ' ')}
    </span>
  );
};

const InviteModal = ({ onClose, onGenerate, link, isSuperAdmin, agencies }: any) => {
  const [role, setRole] = useState<UserRole>('employee');
  const [agencyId, setAgencyId] = useState('');

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center z-[500] p-6 animate-in fade-in duration-500">
      <div className="premium-card rounded-[4rem] max-w-md w-full p-12 space-y-10 relative bg-[#0b1224] shadow-brand-500/10">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors"><X size={28} /></button>
        
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-brand-500/10 text-brand-500 rounded-3xl mx-auto flex items-center justify-center mb-2 animate-pulse">
            <UserPlus size={40} />
          </div>
          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">INVITATION SAAS</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">L'accès est restreint par jeton d'invitation</p>
        </div>

        {link ? (
          <div className="space-y-6 animate-in zoom-in duration-500">
            <div className="bg-slate-950 p-6 rounded-3xl border border-brand-500/30 flex flex-col gap-4 shadow-inner">
               <div className="flex justify-between items-center">
                 <p className="text-[9px] font-black text-brand-500 uppercase tracking-widest italic leading-none">LIEN GÉNÉRÉ</p>
                 <ShieldCheck size={16} className="text-brand-500" />
               </div>
               <p className="font-mono text-[10px] text-slate-300 break-all bg-white/5 p-3 rounded-lg border border-white/5">{link}</p>
            </div>
            <button 
              onClick={() => { navigator.clipboard.writeText(link); alert("Copié !"); }}
              className="w-full h-16 bg-brand-500 text-white font-extrabold rounded-3xl uppercase text-[11px] tracking-[0.2em] italic shadow-2xl btn-glow flex items-center justify-center gap-3"
            >
              <Copy size={18} /> COPIER LE LIEN D'ACCÈS
            </button>
            <p className="text-center text-[9px] text-slate-600 font-bold uppercase italic tracking-widest leading-relaxed">
              Ce lien expire dans 24 heures et ne peut être utilisé que par une seule personne.
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic ml-1 opacity-70">RÔLE ATTRIBUÉ</label>
              <div className="grid grid-cols-1 gap-2">
                {['agency_admin', 'employee', 'accountant'].map((r: any) => (
                  <button 
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${role === r ? 'bg-brand-500/10 border-brand-500 text-brand-500' : 'bg-slate-950 border-white/5 text-slate-500 hover:border-white/10'}`}
                  >
                    <div className="flex items-center gap-3">
                       <Shield size={16} />
                       <span className="font-bold text-[11px] uppercase tracking-widest italic">{r.replace('_', ' ')}</span>
                    </div>
                    {role === r && <CheckCircle2 size={16} />}
                  </button>
                ))}
              </div>
            </div>

            {isSuperAdmin && (
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic ml-1 opacity-70">ZONE WIFI CIBLE</label>
                <select 
                  value={agencyId}
                  onChange={(e) => setAgencyId(e.target.value)}
                  className="w-full h-14 px-6 bg-slate-950 border border-white/10 rounded-2xl focus:border-brand-500 outline-none text-white font-bold text-xs"
                >
                  <option value="">Sélectionner une Agence</option>
                  {agencies.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
            )}

            <button 
              onClick={() => onGenerate({ role, agency_id: agencyId || undefined })}
              disabled={isSuperAdmin && !agencyId}
              className="w-full h-16 bg-brand-500 text-white font-extrabold rounded-3xl uppercase text-[11px] tracking-[0.2em] italic shadow-2xl btn-glow flex items-center justify-center gap-3"
            >
              CRÉER LE JETON D'ACCÈS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Composants de Vue (Dashboard, Stats, etc.) ---

const SidebarItem = ({ icon, label, active, onClick, collapsed }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all relative group ${active ? 'sidebar-item-active text-brand-500' : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'}`}>
    <div className={`transition-colors duration-300 ${active ? 'text-brand-500 scale-110' : 'group-hover:text-brand-500'}`}>{icon}</div>
    {!collapsed && <span className="font-bold text-xs uppercase tracking-widest italic">{label}</span>}
  </button>
);

const StatBox = ({ title, value, color, icon, trend }: any) => (
  <div className="premium-card p-8 rounded-[2rem] flex flex-col gap-6 group">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 border border-current border-opacity-20 shadow-inner group-hover:rotate-6 transition-all duration-500`}>
      {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
    </div>
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{title}</p>
        {trend && <span className="text-[9px] font-bold text-emerald-500">+{trend}%</span>}
      </div>
      <p className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">{value}</p>
    </div>
  </div>
);

const Dashboard = ({ tickets }: { tickets: ExtendedTicket[] }) => {
  const sold = tickets.filter(t => t.status === 'sold');
  const revenue = sold.reduce((acc, t) => acc + t.price, 0);
  const stock = tickets.filter(t => t.status === 'active').length;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatBox title="Recette Totale" value={`${revenue.toLocaleString()} GNF`} color="text-emerald-500" icon={<Zap />} trend="14.8" />
        <StatBox title="Tickets en Stock" value={stock.toString()} color="text-brand-500" icon={<TicketIcon />} />
        <StatBox title="Sessions Actives" value={sold.length.toString()} color="text-blue-500" icon={<Activity />} trend="3.1" />
        <StatBox title="Disponibilité" value="100%" color="text-amber-500" icon={<Server />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card rounded-[2.5rem] p-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black uppercase italic tracking-tight flex items-center gap-3 text-brand-500">
              <BarChart3 size={20} strokeWidth={3} /> Ventes Récentes
            </h3>
            <button className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 transition-colors"><Filter size={18} /></button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/30">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-[10px] font-black uppercase tracking-[0.2em] italic text-slate-500 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">ID Coupon</th>
                  <th className="px-6 py-4">Profil</th>
                  <th className="px-6 py-4 text-right">Encaissement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sold.slice(0, 6).map(t => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-mono font-black text-brand-500 uppercase italic tracking-tighter text-sm underline decoration-brand-500/20">{t.code}</td>
                    <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">{t.profile_name || 'Standard'}</td>
                    <td className="px-6 py-4 text-right font-black italic text-emerald-400">{t.price.toLocaleString()} GNF</td>
                  </tr>
                ))}
                {sold.length === 0 && (
                   <tr><td colSpan={3} className="px-6 py-12 text-center text-[10px] font-black uppercase italic text-slate-700">Aucune transaction ce jour</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="premium-card rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center space-y-6 bg-brand-500/5 border-brand-500/20">
          <div className="w-24 h-24 rounded-full border-4 border-brand-500/20 border-t-brand-500 flex items-center justify-center animate-spin-slow">
            <Zap className="text-brand-500 animate-pulse" size={32} />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-black italic uppercase leading-none">{Math.min(100, Math.floor((stock/1000)*100))}%</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">État du Stockage</p>
          </div>
          <button className="w-full h-14 bg-brand-500 rounded-2xl text-[10px] font-black uppercase tracking-widest italic btn-glow">Générer Tickets</button>
        </div>
      </div>
    </div>
  );
};

const ExpressSale = ({ tickets, onSale, loading }: any) => {
  const PLANS = [
    { name: '30m', price: 2000, color: 'text-blue-400 bg-blue-500' },
    { name: '1h', price: 5000, color: 'text-emerald-400 bg-emerald-500' },
    { name: '3h', price: 10000, color: 'text-purple-400 bg-purple-500' },
    { name: '24h', price: 25000, color: 'text-rose-400 bg-rose-500' },
    { name: '7j', price: 100000, color: 'text-amber-400 bg-amber-500' },
    { name: 'Mensuel', price: 350000, color: 'text-indigo-400 bg-indigo-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PLANS.map(plan => {
        const stock = tickets.filter((t: any) => t.status === 'active' && t.code.toLowerCase().includes(plan.name.toLowerCase())).length;
        return (
          <button 
            key={plan.name}
            onClick={() => onSale(plan)}
            disabled={loading || stock === 0}
            className={`premium-card rounded-[3rem] p-10 text-left group relative overflow-hidden ${stock === 0 ? 'opacity-30 grayscale' : 'hover:-translate-y-2 shadow-2xl'}`}
          >
            <div className={`w-16 h-16 rounded-2xl ${plan.color} bg-opacity-10 flex items-center justify-center mb-8 border border-current border-opacity-10 group-hover:scale-110 transition-transform`}>
              <Zap size={32} />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-3xl font-black italic uppercase leading-none tracking-tighter">{plan.name}</h4>
              <div className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${stock > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                {stock} EN STOCK
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-10 italic">Point de Vente Zone</p>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <p className="text-2xl font-black italic text-brand-500">{plan.price.toLocaleString()} <span className="text-xs">GNF</span></p>
              <div className="w-12 h-12 bg-brand-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-90 transition-all duration-500"><Plus size={24} strokeWidth={3} /></div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const TicketList = ({ tickets, onSearch, searchTerm }: any) => {
  const filtered = tickets.filter((t: any) => t.code.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
          <input 
            type="text" value={searchTerm} onChange={(e) => onSearch(e.target.value)}
            placeholder="Rechercher par code..."
            className="w-full h-14 pl-14 pr-6 bg-slate-900/50 border border-white/5 rounded-2xl focus:border-brand-500 outline-none transition-all font-bold text-sm shadow-inner"
          />
        </div>
        <div className="flex gap-4">
          <button className="h-14 px-8 bg-brand-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest italic flex items-center gap-3 shadow-lg shadow-brand-500/20 btn-glow">
            <Download size={16} /> Rapport PDF
          </button>
        </div>
      </div>

      <div className="premium-card rounded-[3rem] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/80 border-b border-white/5 text-[10px] font-black uppercase tracking-widest italic text-slate-500">
              <th className="px-10 py-7">Code Coupon</th>
              <th className="px-10 py-7">Type / Profil</th>
              <th className="px-10 py-7 text-center">Statut</th>
              <th className="px-10 py-7 text-right">Gestion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.slice(0, 15).map((t: any) => (
              <tr key={t.id} className="hover:bg-brand-500/5 transition-all group">
                <td className="px-10 py-6 font-mono font-black text-brand-500 uppercase tracking-tighter text-base italic">{t.code}</td>
                <td className="px-10 py-6 uppercase font-bold text-[11px] text-slate-400">{t.profile_name || 'Standard'}</td>
                <td className="px-10 py-6 text-center">
                   <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${t.status === 'sold' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-brand-500/10 text-brand-500 border-brand-500/20'}`}>
                      {t.status === 'active' ? 'Libre' : 'Vendu'}
                    </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <button className="p-3 bg-white/5 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AgencyGrid = ({ agencies, onCreate }: any) => (
  <div className="space-y-12">
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-brand-500 leading-none underline decoration-4 underline-offset-8">RÉSEAU DE ZONES</h3>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] italic">Infrastructure multi-sites opérationnelle</p>
      </div>
      <button onClick={onCreate} className="h-16 px-10 bg-brand-500 text-white rounded-[1.8rem] font-black uppercase text-xs tracking-widest flex items-center gap-4 shadow-xl shadow-brand-500/30 btn-glow italic">
        <Plus size={22} strokeWidth={3} /> Nouvelle Zone
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {agencies.map((agency: any) => (
        <div key={agency.id} className="premium-card p-10 rounded-[3.5rem] relative overflow-hidden group bg-slate-900/40">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-500/5 rounded-full blur-3xl group-hover:bg-brand-500/10 transition-colors"></div>
           <Building2 size={40} className="text-brand-500/20 mb-6 group-hover:scale-110 transition-transform duration-500" />
           <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-2 truncate">{agency.name}</h4>
           <div className="flex items-center gap-2 mb-8">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] font-bold text-slate-500 uppercase italic tracking-widest">Connecté au Cloud</p>
           </div>
           <div className="pt-6 border-t border-white/5 flex gap-4">
              <button className="flex-1 h-12 bg-brand-500/10 hover:bg-brand-500 text-brand-500 hover:text-white rounded-2xl text-[9px] font-black uppercase italic tracking-widest transition-all">Configuration</button>
              <button className="w-12 h-12 flex items-center justify-center bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={18} /></button>
           </div>
        </div>
      ))}
    </div>
  </div>
);

const AgencyModal = ({ onClose, onSubmit, loading }: any) => {
  const [name, setName] = useState('');
  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center z-[500] p-6 animate-in fade-in duration-500">
      <div className="premium-card rounded-[4rem] max-w-sm w-full p-12 space-y-10 relative bg-[#0b1224] shadow-brand-500/10">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors"><X size={28} /></button>
        <div className="space-y-4 pt-4 text-center">
          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">DÉPLOIEMENT ZONE</h3>
          <p className="text-[10px] font-black text-brand-500 uppercase tracking-widest italic">Serveur Cloud MikroTik</p>
        </div>
        <div className="space-y-8">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic ml-1 opacity-70">NOM DE L'AGENCE</label>
              <input 
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Cyber-Zone Conakry"
                className="w-full h-16 px-6 bg-slate-950 border border-white/10 rounded-[1.8rem] focus:border-brand-500 outline-none text-white font-bold"
              />
           </div>
           <button 
             disabled={loading || !name} onClick={() => onSubmit(name)}
             className="w-full h-16 bg-brand-500 text-white font-extrabold rounded-3xl uppercase text-[11px] tracking-[0.2em] italic shadow-2xl btn-glow flex items-center justify-center gap-3"
           >
             {loading ? <Loader2 className="animate-spin" /> : <Plus size={22} strokeWidth={3} />} VALIDER
           </button>
        </div>
      </div>
    </div>
  );
};

const ImportPanel = ({ onImport, loading }: any) => {
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split(/\r?\n/).filter(l => l.trim());
      const rows = lines.slice(1).map(line => {
        const parts = line.split(',').map(p => p.trim());
        return {
          code: parts[0],
          profile_name: parts[1],
          price: parseInt(parts[2]) || 0,
          duration_minutes: 60,
          status: 'active'
        };
      }).filter(r => r.code);
      onImport(rows);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
         <h3 className="text-4xl font-black tracking-tight uppercase italic text-brand-500">INJECTION MIKROTIK</h3>
         <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.3em] italic">Synchronisation massive via CSV exporté de Mikhmon</p>
      </div>

      <div 
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}
        className={`border-4 border-dashed rounded-[4rem] p-24 text-center cursor-pointer transition-all duration-700 relative overflow-hidden group ${drag ? 'border-brand-500 bg-brand-500/10' : 'border-white/5 bg-slate-900/30 shadow-inner'}`}
      >
        <input type="file" ref={fileRef} className="hidden" accept=".csv" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <div className={`w-20 h-20 bg-brand-500 text-white rounded-[2rem] mx-auto flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 ${drag ? 'scale-125 rotate-12' : 'group-hover:scale-110'}`}>
          <UploadCloud size={36} strokeWidth={2.5} />
        </div>
        <p className="text-2xl font-black uppercase italic tracking-tighter mb-2">Choisir le fichier CSV</p>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] italic opacity-60">Structure : Code, Profil, Prix</p>
        
        {loading && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-10">
             <Loader2 className="text-brand-500 animate-spin" size={48} />
          </div>
        )}
      </div>
    </div>
  );
};

const TicketReceipt = ({ ticket, onClose }: any) => (
  <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-[40px] flex items-center justify-center z-[500] p-6 animate-in fade-in duration-700">
    <div className="bg-white rounded-[5rem] max-w-sm w-full shadow-[0_0_100px_rgba(99,102,241,0.5)] transform animate-in zoom-in duration-1000">
      <div className="bg-brand-500 p-14 text-center text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="bg-white/20 p-8 rounded-[2.5rem] inline-flex mb-8 backdrop-blur-md animate-float"><CheckCircle2 size={56} strokeWidth={3} /></div>
        <h3 className="text-5xl font-black italic tracking-tighter leading-none mb-4">WIFI-ZONE</h3>
        <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-60 italic">COUPON TRANSACTIONNEL</p>
      </div>
      <div className="p-12 space-y-12 bg-white">
        <div className="bg-slate-50 rounded-[3.5rem] p-12 border-4 border-dashed border-slate-200 text-center relative shadow-inner">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
          
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.5em] mb-8 italic opacity-60">CODE D'ACCÈS</p>
          <div className="space-y-4 mb-10">
            <p className="text-7xl font-mono font-black text-brand-500 tracking-tighter uppercase italic leading-none">{ticket.code}</p>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic">{ticket.profile_name || 'MIKROTIK PRO'}</p>
          </div>
          <div className="flex justify-center p-6 bg-white rounded-[3rem] shadow-lg border border-slate-100"><QrCode size={180} strokeWidth={1} className="text-slate-900" /></div>
        </div>
        <button onClick={onClose} className="h-20 w-full bg-slate-950 text-white font-black rounded-3xl uppercase text-[12px] tracking-[0.4em] italic hover:bg-brand-500 shadow-2xl transition-all btn-glow">DÉLIVRER TICKET</button>
      </div>
    </div>
  </div>
);

const SuperDashboard = ({ tickets, agencies }: any) => {
  const total = tickets.filter((t: any) => t.status === 'sold').reduce((acc: any, t: any) => acc + t.price, 0);
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <StatBox title="Réseau Global" value={`${agencies.length} Zones`} color="text-brand-500" icon={<Building2 />} />
        <StatBox title="Recette SaaS" value={`${total.toLocaleString()} GNF`} color="text-emerald-500" icon={<Zap />} trend="21.5" />
        <StatBox title="Coupons Émis" value={tickets.length} color="text-blue-500" icon={<TicketIcon />} />
        <StatBox title="Monitoring" value="Optimal" color="text-amber-500" icon={<Activity />} />
      </div>

      <div className="premium-card rounded-[4rem] p-12 space-y-10 bg-slate-900/40">
        <h3 className="text-2xl font-black uppercase italic tracking-tight text-brand-500 flex items-center gap-4">
          <Globe strokeWidth={3} /> PERFORMANCE MULTI-ZONES
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {agencies.slice(0, 6).map((agency: any) => {
            const agencySales = tickets.filter((t: any) => t.agency_id === agency.id && t.status === 'sold').reduce((acc: any, t: any) => acc + t.price, 0);
            return (
              <div key={agency.id} className="p-10 bg-slate-950/50 rounded-[3rem] border border-white/5 hover:border-brand-500/40 transition-all group">
                 <h4 className="font-black text-lg uppercase italic text-white mb-6 truncate">{agency.name}</h4>
                 <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic opacity-60">Recette Totale</p>
                      <p className="text-3xl font-black italic text-emerald-400">{agencySales.toLocaleString()} <span className="text-xs">GNF</span></p>
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
