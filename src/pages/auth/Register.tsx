import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/forms/AuthForm";
import { useAuth } from "../../hooks/useAuth";

export function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(email: string, password: string) {
    await signUp(email, password);
    navigate("/dashboard");
  }

  return (
    <>
      <AuthForm
        onSubmit={handleRegister}
        submitLabel="Criar conta"
        subtitle="Comece sua biblioteca de builds e compartilhe combinacoes vencedoras."
        title="Cadastro"
      />
      <p style={{ textAlign: "center" }}>
        Ja tem conta? <Link to="/login">Entre aqui</Link>
      </p>
    </>
  );
}
