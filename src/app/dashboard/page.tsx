import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signOut } from '@/app/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-white text-[#0a0f0d]">
      <header className="bg-[#0a0f0d] text-white px-6 py-4 flex items-center justify-between">
        <span className="text-2xl font-bold">vantto<span className="text-[#10b981]">.</span></span>
        <form action={signOut}>
          <button type="submit" className="text-xs text-gray-400 hover:text-white border border-neutral-700 px-3 py-1.5 rounded-md cursor-pointer">
            Cerrar sesión
          </button>
        </form>
      </header>
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Bienvenido, {user.email}</h2>
          <p className="text-gray-500">Dashboard — en construcción</p>
        </div>
      </main>
    </div>
  )
}
