import { useState } from "react";

type AuthFormProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function AuthForm({ title, subtitle, submitLabel, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(email, password);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Nao foi possivel concluir a autenticacao.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card panel">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1>{title}</h1>
        <p className="muted">{subtitle}</p>
      </div>

      <form className="stack" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>E-mail</span>
          <input
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="voce@email.com"
            required
            type="email"
            value={email}
          />
        </label>

        <label className="form-field">
          <span>Senha</span>
          <input
            autoComplete="current-password"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimo de 6 caracteres"
            required
            type="password"
            value={password}
          />
        </label>

        {error ? <p style={{ color: "#fca5a5", margin: 0 }}>{error}</p> : null}

        <button className="button" disabled={loading} type="submit">
          {loading ? "Carregando..." : submitLabel}
        </button>
      </form>
    </div>
  );
}
