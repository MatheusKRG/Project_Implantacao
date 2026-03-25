import { AppLayout } from "../../components/layout/AppLayout";
import { useAuth } from "../../hooks/useAuth";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <AppLayout description="Resumo basico da conta autenticada no Supabase." title="Perfil">
      <section className="panel hero-panel stack">
        <div>
          <h2 className="section-title">Conta</h2>
          <p className="muted">Use esta tela depois para editar nome, avatar e preferencias.</p>
        </div>

        <div className="grid grid-2">
          <article className="panel card">
            <h3>E-mail</h3>
            <p>{user?.email ?? "Nao identificado"}</p>
          </article>

          <article className="panel card">
            <h3>User ID</h3>
            <p className="muted">{user?.id ?? "Sem sessao"}</p>
          </article>
        </div>
      </section>
    </AppLayout>
  );
}
