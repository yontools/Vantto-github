import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { motion } from 'motion/react';
import { Loader2, Mail, CheckCircle2, AlertTriangle, Key, ExternalLink } from 'lucide-react';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Verificamos si están declaradas las variables de entorno para instruir al operador en caso contrario
  const hasEnvVars = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (!hasEnvVars) {
      setErrorMsg('Supabase no está configurado. Por favor, cargá las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tus de secretos (Secrets).');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccess(false);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
    } catch (err: any) {
      console.error('Error al enviar el link mágico:', err);
      if (err.message === 'Failed to fetch' || err.toString().includes('Failed to fetch')) {
        setErrorMsg('Error de conexión con Supabase. Por favor, verificá que las credenciales del proyecto sean correctas.');
      } else {
        setErrorMsg(err.message || 'Ocurrió un error al intentar enviar el link de acceso. Por favor, intentá de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <motion.div 
        id="login-card-container"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo Vantto */}
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight font-sans text-[#0a0f0d] select-none">
            vantto<span className="text-[#10b981]">.</span>
          </h1>
          <p className="mt-3 text-sm text-gray-500 font-sans tracking-wide">
            Gestión logística de activos.
          </p>
        </div>

        {/* Notificación didáctica si faltan secrets */}
        {!hasEnvVars && (
          <motion.div
            id="supabase-no-env-alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-amber-50 p-5 border border-amber-200 space-y-3 shadow-xs"
          >
            <div className="flex items-start space-x-3">
              <Key id="icon-key" className="h-5 w-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-amber-900 font-sans">
                  Falta configurar Supabase
                </h4>
                <p className="text-xs text-amber-800 font-sans leading-relaxed">
                  Para habilitar la autenticación real de Vantto, agregá tus credenciales de Supabase.
                </p>
              </div>
            </div>
            
            <div className="text-xs text-amber-800 pl-8 space-y-2">
              <p className="font-sans">
                Modificá tus variables de entorno en el panel de **Secrets** de Google AI Studio con:
              </p>
              <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-amber-900">
                <li><span className="font-bold">VITE_SUPABASE_URL</span></li>
                <li><span className="font-bold">VITE_SUPABASE_ANON_KEY</span></li>
              </ul>
              <div className="pt-1">
                <a 
                  href="https://supabase.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 font-medium text-amber-900 hover:text-amber-950 underline focus:outline-none"
                >
                  <span>Crear cuenta de Supabase</span>
                  <ExternalLink id="icon-ext" className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Caja de Login */}
        <div id="login-box" className="mt-8 bg-white py-8 px-4 border border-neutral-200 rounded-lg sm:px-10">
          {success ? (
            <motion.div 
              id="success-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-md bg-emerald-50 p-6 border border-emerald-100 text-center space-y-4"
            >
              <div className="flex justify-center">
                <CheckCircle2 id="icon-success" className="h-10 w-10 text-[#10b981]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#0a0f0d] font-sans">
                  Revisá tu email
                </h3>
                <p className="text-sm text-gray-600 font-sans leading-relaxed">
                  Te enviamos un link para ingresar. Podés cerrar esta ventana y hacer clic en el enlace desde tu bandeja de entrada para iniciar sesión.
                </p>
              </div>
              <button
                id="btn-back"
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 text-xs font-medium text-emerald-700 hover:text-emerald-800 underline font-sans focus:outline-none cursor-pointer"
              >
                Volver a intentar con otro correo
              </button>
            </motion.div>
          ) : (
            <form id="login-form" onSubmit={handleLogin} className="space-y-6">
              {errorMsg && (
                <div id="error-message" className="rounded-md bg-red-50 p-4 border border-red-100 flex items-start space-x-3">
                  <AlertTriangle id="icon-alert" className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-red-700 font-sans">
                    {errorMsg}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 font-sans uppercase tracking-wider select-none">
                  Email
                </label>
                <div className="relative rounded-md shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail id="icon-mail" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@empresa.com"
                    disabled={loading || !hasEnvVars}
                    className="block w-full pl-10 pr-3 py-2.5 border border-neutral-200 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] sm:text-sm font-sans transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <button
                  id="btn-login-submit"
                  type="submit"
                  disabled={loading || !email.trim() || !hasEnvVars}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-[#0a0f0d] hover:bg-neutral-850 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10b981] disabled:opacity-50 disabled:cursor-not-allowed font-sans tracking-wide transition-all duration-150 relative cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <Loader2 id="icon-loading" className="animate-spin h-5 w-5 text-[#10b981]" />
                      <span>Enviando enlace...</span>
                    </span>
                  ) : (
                    <span>Ingresar con link mágico</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Políticas y Pie de login limpio al estilo B2B argentino */}
        <div className="text-center font-mono text-[10px] text-gray-400 tracking-tight select-none">
          VANTTO LOGÍSTICA • AÑELO & NEUQUÉN • © {new Date().getFullYear()}
        </div>
      </motion.div>
    </div>
  );
}
