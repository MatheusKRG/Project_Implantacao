import { Link } from "react-router-dom";
import { BuildCard } from "../../components/builds/BuildCard";
import { AppLayout } from "../../components/layout/AppLayout";
import { useBuilds } from "../../hooks/useBuilds";
import type { BuildGame } from "../../types/build";
import { getThemeByGame } from "../../utils/games";

type GamePageProps = {
  game: BuildGame;
};

export function GamePage({ game }: GamePageProps) {
  const theme = getThemeByGame(game);
  const { builds, loading, error } = useBuilds({ game });

  if (!theme) {
    return null;
  }

  return (
    <AppLayout
      description={theme.description}
      themeClassName={theme.classes.page}
      title={theme.title}
    >
      <section className={`panel hero-panel themed-hero ${theme.classes.hero}`}>
        <div className="hero-copy">
          <p className="eyebrow">{theme.accentLabel}</p>
          <h2>{theme.name}</h2>
          <p>{theme.subtitle}</p>
          <div className="badge-row hero-badges">
            {theme.buildCategories.map((category) => (
              <span className="badge" key={category}>
                {category}
              </span>
            ))}
          </div>
          <div className="button-row">
            <Link className="button" to={`/builds/new?game=${encodeURIComponent(game)}`}>
              Nova build de {game}
            </Link>
          </div>
        </div>
      </section>

      <section className="panel hero-panel info-strip">
        <div>
          <h3 className="section-title">Identidade da pagina</h3>
          <p className="muted">Personagens sugeridos: {theme.ctaCharacterHint}</p>
        </div>
        <div>
          <h3 className="section-title">Itens em destaque</h3>
          <p className="muted">{theme.ctaEquipmentHint}</p>
        </div>
        <div>
          <h3 className="section-title">Foco da build</h3>
          <p className="muted">{theme.ctaSkillsHint}</p>
        </div>
      </section>

      <section className="archetype-section">
        <div className="section-heading">
          <p className="eyebrow">Build paths</p>
          <h3 className="section-title">Arquetipos classicos de {game}</h3>
          <p className="muted">
            Cada bloco abaixo ja traz itens e habilidades reais para te ajudar a montar builds mais fieis ao jogo.
          </p>
        </div>

        <div className="grid grid-2">
          {theme.archetypes.map((archetype) => (
            <article className="panel card archetype-card" key={archetype.name}>
              <p className="eyebrow">{archetype.role}</p>
              <h3>{archetype.name}</h3>
              <p>{archetype.summary}</p>
              <div>
                <strong>Itens sugeridos</strong>
                <div className="badge-row" style={{ marginTop: "0.6rem" }}>
                  {archetype.items.map((item) => (
                    <span className="badge" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong>Foco da build</strong>
                <div className="badge-row" style={{ marginTop: "0.6rem" }}>
                  {archetype.skills.map((skill) => (
                    <span className="badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {loading ? <p>Carregando builds de {game}...</p> : null}
      {error ? <p style={{ color: "#fca5a5" }}>{error}</p> : null}

      <section className="grid grid-2">
        {builds.map((build) => (
          <BuildCard build={build} key={build.id} />
        ))}
      </section>

      {!loading && !builds.length ? (
        <div className="panel empty-state">
          <h3>Nenhuma build publica de {game} ainda</h3>
          <p>Crie a primeira build tematica para inaugurar esta biblioteca.</p>
        </div>
      ) : null}
    </AppLayout>
  );
}
