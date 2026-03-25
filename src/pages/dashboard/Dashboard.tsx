import { useNavigate } from "react-router-dom";
import { BuildCard } from "../../components/builds/BuildCard";
import { AppLayout } from "../../components/layout/AppLayout";
import { useAuth } from "../../hooks/useAuth";
import { useBuilds } from "../../hooks/useBuilds";
import { deleteBuild } from "../../services/buildService";

export function DashboardPage() {
  const { user } = useAuth();
  const { builds, loading, error, reload } = useBuilds({ userId: user?.id, mode: "private" });
  const navigate = useNavigate();
  const bloodborneCount = builds.filter((build) => build.game === "Bloodborne").length;
  const eldenRingCount = builds.filter((build) => build.game === "Elden Ring").length;

  async function handleDelete(id: string) {
    await deleteBuild(id);
    await reload();
  }

  return (
    <AppLayout
      description="Gerencie suas builds, acompanhe o que esta publico e refine suas melhores estrategias."
      title="Meu dashboard"
    >
      <section className="panel hero-panel" style={{ marginBottom: "1rem" }}>
        <h2 className="section-title">Minhas builds</h2>
        <p className="muted">Seu espaco privado para criar, revisar e publicar builds.</p>
        <div className="badge-row" style={{ marginTop: "1rem" }}>
          <span className="badge">Bloodborne: {bloodborneCount}</span>
          <span className="badge">Elden Ring: {eldenRingCount}</span>
        </div>
        <div className="button-row" style={{ marginTop: "1rem" }}>
          <button className="button" onClick={() => navigate("/builds/new")} type="button">
            Criar build
          </button>
        </div>
      </section>

      {loading ? <p>Carregando suas builds...</p> : null}
      {error ? <p style={{ color: "#fca5a5" }}>{error}</p> : null}

      <section className="grid grid-2">
        {builds.map((build) => (
          <BuildCard build={build} key={build.id} onDelete={handleDelete} showActions />
        ))}
      </section>

      {!loading && !builds.length ? (
        <div className="panel empty-state">
          <h3>Voce ainda nao criou nenhuma build</h3>
          <p>Crie a primeira para testar o fluxo completo de autenticacao e CRUD.</p>
        </div>
      ) : null}
    </AppLayout>
  );
}
