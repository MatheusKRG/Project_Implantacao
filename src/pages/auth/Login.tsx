import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/forms/AuthForm";
import { useAuth } from "../../hooks/useAuth";

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    await signIn(email, password);
    navigate("/dashboard");
  }

  return (
    <>
      <AuthForm
        onSubmit={handleLogin}
        submitLabel="Entrar"
        subtitle="Acesse suas builds e continue evoluindo seu acervo gamer."
        title="Login"
      />
      <p style={{ textAlign: "center" }}>
        Nao tem conta? <Link to="/register">Crie agora</Link>
      </p>
    </>
  );
}
