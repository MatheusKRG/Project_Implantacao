import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppLayout } from "../../components/layout/AppLayout";
import { getBuildById } from "../../services/buildService";
import { getRoleLabel, type Build } from "../../types/build";
import { decodeStoredField, getThemeByGame } from "../../utils/games";

export function BuildDetailsPage() {
  const { id } = useParams();
  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = build ? getThemeByGame(build.game) : null;

  useEffect(() => {
    if (!id) {
      setError("Build invalida.");
      setLoading(false);
      return;
    }

    getBuildById(id)
      .then((data) => setBuild(data))
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Nao foi possivel carregar a build.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const equipmentGroups = build ? build.equipments.map(decodeStoredField) : [];
  const skillGroups = build ? build.skills.map(decodeStoredField) : [];

  return (
    <AppLayout
      description="Detalhes completos da build selecionada."
      themeClassName={theme?.classes.page}
      title="Detalhes da build"
    >
      {loading ? <p>Carregando build...</p> : null}
      {error ? <p style={{ color: "#fca5a5" }}>{error}</p> : null}

      {build ? (
        <section className="panel hero-panel stack">
          <div className="badge-row">
            <span className="badge">{build.game}</span>
            <span className="badge">{build.character_name}</span>
            <span className="badge">{getRoleLabel(build.role)}</span>
          </div>

          <div>
            <h2>{build.title}</h2>
            <p className="muted">
              Criada em {new Date(build.created_at).toLocaleDateString("pt-BR")} •{" "}
              {build.is_public ? "Build publica" : "Build privada"}
            </p>
          </div>

          <div>
            <h3>Estrategia</h3>
            <p>{build.description}</p>
          </div>

          <div>
            <h3>Equipamentos e estrutura</h3>
            <div className="stack">
              {equipmentGroups.map((equipment) => (
                <div key={`${equipment.label}-${equipment.value}`}>
                  <strong>{equipment.label}</strong>
                  <p className="muted" style={{ marginBottom: 0 }}>
                    {equipment.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>Magias, tecnicas e apoio</h3>
            <div className="stack">
              {skillGroups.map((skill) => (
                <div key={`${skill.label}-${skill.value}`}>
                  <strong>{skill.label}</strong>
                  <p className="muted" style={{ marginBottom: 0 }}>
                    {skill.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="button-row">
            <Link className="button-secondary" to={build.game === "Bloodborne" ? "/bloodborne" : "/elden-ring"}>
              Voltar ao jogo
            </Link>
            <Link className="button" to={`/builds/${build.id}/edit`}>
              Editar
            </Link>
          </div>
        </section>
      ) : null}
    </AppLayout>
  );
}
