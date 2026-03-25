import type { PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type AppLayoutProps = PropsWithChildren<{
  title: string;
  description: string;
  themeClassName?: string;
}>;

export function AppLayout({ title, description, children, themeClassName }: AppLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/login");
  }

  return (
    <div className={`app-shell ${themeClassName ?? ""}`.trim()}>
      <header className="topbar">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="button-row">
          <Link className="button-secondary" to="/">
            Hub
          </Link>
          <Link className="button-secondary" to="/bloodborne">
            Bloodborne
          </Link>
          <Link className="button-secondary" to="/elden-ring">
            Elden Ring
          </Link>
          {user ? (
            <>
              <Link className="button-secondary" to="/dashboard">
                Dashboard
              </Link>
              <Link className="button" to="/builds/new">
                Nova build
              </Link>
              <button className="button-danger" onClick={handleSignOut} type="button">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link className="button-secondary" to="/login">
                Entrar
              </Link>
              <Link className="button" to="/register">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}
