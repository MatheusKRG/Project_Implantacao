import { useNavigate, useSearchParams } from "react-router-dom";
import { BuildForm } from "../../components/forms/BuildForm";
import { AppLayout } from "../../components/layout/AppLayout";
import { useAuth } from "../../hooks/useAuth";
import { createBuild } from "../../services/buildService";
import type { BuildFormValues, BuildGame } from "../../types/build";
import { SUPPORTED_GAMES, getThemeByGame } from "../../utils/games";

export function CreateBuildPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameParam = searchParams.get("game");
  const lockedGame = SUPPORTED_GAMES.find((game) => game === gameParam) as BuildGame | undefined;
  const theme = getThemeByGame(lockedGame ?? "Bloodborne");

  async function handleSubmit(values: BuildFormValues) {
    if (!user) {
      throw new Error("Voce precisa estar autenticado para criar uma build.");
    }

    const build = await createBuild(values, user.id);
    navigate(`/builds/${build.id}`);
  }

  return (
    <AppLayout
      description="Cadastre uma nova combinacao de personagem, equipamentos e habilidades."
      themeClassName={theme?.classes.page}
      title="Nova build"
    >
      <BuildForm
        initialValues={lockedGame ? { title: "", game: lockedGame, character_name: "", role: "dps", description: "", equipments: [], skills: [], is_public: true } : undefined}
        lockedGame={lockedGame}
        onSubmit={handleSubmit}
        submitLabel="Salvar build"
      />
    </AppLayout>
  );
}
