import { useEffect, useState } from 'react';
import { supabase } from './services/supabase';
import LoginView from './components/LoginView';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, LogOut, CheckCircle, Database } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Evitamos llamadas de red si faltan las variables de entorno
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setLoading(false);
      return;
    }

    // 1. Obtener sesión inicial
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Error al recuperar sesión de Supabase:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // 2. Escuchar cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Pantalla de carga oficial Vantto
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          id="loading-brand-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-6"
        >
          <h1 className="text-6xl font-bold tracking-tight font-sans text-[#0a0f0d] select-none">
            vantto<span className="text-[#10b981]">.</span>
          </h1>
          <div className="flex justify-center pt-2">
            <Loader2 id="spinner" className="h-8 w-8 animate-spin text-[#10b981] stroke-[2]" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!session ? (
        <LoginView key="login-view" />
      ) : (
        <motion.div
          key="dashboard-view"
          id="dashboard-placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-white text-[#0a0f0d] flex flex-col"
        >
          {/* Header Minimalista */}
          <header className="bg-[#0a0f0d] text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight font-sans select-none">
                vantto<span className="text-[#10b981]">.</span>
              </span>
              <span className="bg-neutral-800 text-[10px] text-gray-300 font-mono px-2 py-0.5 rounded select-none">
                SaaS
              </span>
            </div>

            <button
              id="btn-signout"
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-xs font-medium text-gray-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-3 py-1.5 rounded-md transition-all duration-150 focus:outline-none"
            >
              <LogOut id="logout-icon" className="h-3.5 w-3.5 text-gray-400" />
              <span>Cerrar sesión</span>
            </button>
          </header>

          {/* Contenido en construcción */}
          <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto space-y-8">
            <motion.div
              id="construction-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center justify-center p-4 bg-emerald-50 rounded-full border border-emerald-100">
                <CheckCircle id="session-check-icon" className="h-10 w-10 text-[#10b981]" />
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0f0d] font-sans">
                  Sesión Iniciada con Éxito
                </h2>
                <p className="text-sm font-mono text-gray-500 bg-gray-50 border border-neutral-100 px-3 py-1.5 rounded-md max-w-md mx-auto truncate select-all">
                  Usuario: {session.user?.email}
                </p>
                <div className="pt-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    <span>Dashboard — en construcción</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-150 pt-6 max-w-md mx-auto">
                <p className="text-sm text-gray-600 font-sans leading-relaxed">
                  Pronto vas a poder gestionar pedidos, flota de volquetes, choferes y clientes de forma centralizada y en tiempo real.
                </p>
              </div>

              {/* Información Técnica Sencilla del Rol */}
              <div className="bg-gray-50 border border-neutral-200 rounded-lg p-4 max-w-md mx-auto space-y-2 text-left">
                <div className="flex items-center space-x-2 font-sans font-semibold text-xs text-gray-700 uppercase tracking-wider">
                  <Database id="db-icon" className="h-4 w-4 text-gray-400" />
                  <span>Conexión Supabase Activa</span>
                </div>
                <p className="text-xs text-gray-500 font-sans">
                  Tu sesión fue autenticada via Magic Link oficial. Todas las políticas de seguridad (RLS) están activas en la base de datos de Vantto.
                </p>
              </div>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="py-4 border-t border-neutral-150 text-center font-mono text-[9px] text-gray-400 select-none">
            VANTTO LOGÍSTICA PLATFORM • AÑELO, ARGENTINA
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
