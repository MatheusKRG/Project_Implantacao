import { Link } from "react-router-dom";
import { getRoleLabel, type Build } from "../../types/build";

type BuildCardProps = {
  build: Build;
  showActions?: boolean;
  onDelete?: (id: string) => void;
};

export function BuildCard({ build, showActions = false, onDelete }: BuildCardProps) {
  return (
    <article className="panel card">
      <div className="badge-row">
        <span className="badge">{build.game}</span>
        <span className="badge">{getRoleLabel(build.role)}</span>
        <span className="badge">{build.is_public ? "Publica" : "Privada"}</span>
      </div>
      <h3>{build.title}</h3>
      <p className="muted">
        {build.character_name} • {new Date(build.created_at).toLocaleDateString("pt-BR")}
      </p>
      <p>{build.description}</p>
      <div className="button-row">
        <Link className="button-secondary" to={`/builds/${build.id}`}>
          Ver detalhes
        </Link>
        {showActions ? (
          <>
            <Link className="button" to={`/builds/${build.id}/edit`}>
              Editar
            </Link>
            <button className="button-danger" onClick={() => onDelete?.(build.id)} type="button">
              Excluir
            </button>
          </>
        ) : null}
      </div>
    </article>
  );
}
