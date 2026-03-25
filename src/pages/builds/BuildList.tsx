import { Link } from "react-router-dom";
import { GAME_THEMES } from "../../utils/games";

export function HomePage() {
  const themes = [GAME_THEMES.bloodborne, GAME_THEMES["elden-ring"]];

  return (
    <main className="app-shell theme-hub">
      <section className="panel landing-shell">
        <div className="landing-copy">
          <p className="eyebrow">Build Library</p>
          <h1>Escolha um mundo e catalogue suas builds soulslike.</h1>
          <p className="landing-text">
            Cada jogo ganha uma pagina propria, com atmosfera, navegacao e vitrine pensadas para o seu universo.
          </p>
        </div>

        <div className="grid grid-2">
          {themes.map((theme) => (
            <article className={`game-portal ${theme.classes.portal}`} key={theme.slug}>
              <div className="portal-overlay" />
              <div className="portal-content">
                <p className="eyebrow">{theme.accentLabel}</p>
                <h2>{theme.name}</h2>
                <p>{theme.subtitle}</p>
                <div className="button-row">
                  <Link className="button" to={`/${theme.slug}`}>
                    Entrar na pagina
                  </Link>
                  <Link className="button-secondary" to={`/builds/new?game=${encodeURIComponent(theme.name)}`}>
                    Criar build
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
