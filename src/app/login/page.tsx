export default function LoginPage() {
  const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white border border-slate-100 rounded-2xl shadow-xs space-y-6 text-center">
        <div>
          <h1 className="text-5xl font-black text-slate-950 select-none tracking-tight">
            vantto<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-sans">
            Gestión logística de volquetes
          </p>
        </div>

        {!isConfigured ? (
          <div className="rounded-xl bg-amber-50 p-5 border border-amber-200 text-left space-y-3">
            <h4 className="text-sm font-semibold text-amber-900 font-sans">
              Falta configurar Supabase
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed font-sans">
              Para habilitar la autenticación real de Vantto, por favor agregá las credenciales en el panel de **Secrets** de Google AI Studio:
            </p>
            <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-amber-900">
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            </ul>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-emerald-600 font-medium text-sm font-sans animate-pulse">
              ● Base de datos conectada correctamente
            </p>
            <p className="text-slate-500 text-xs font-sans">
              Próximamente: Autenticación por link mágico de Supabase.
            </p>
          </div>
        )}

        <div className="text-center font-mono text-[10px] text-slate-400 tracking-tight">
          VANTTO LOGÍSTICA • © {new Date().getFullYear()}
        </div>
      </div>
    </main>
  );
}
