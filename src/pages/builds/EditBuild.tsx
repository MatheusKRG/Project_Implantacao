import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BuildForm } from "../../components/forms/BuildForm";
import { AppLayout } from "../../components/layout/AppLayout";
import { getBuildById, updateBuild } from "../../services/buildService";
import type { BuildFormValues } from "../../types/build";
import { getThemeByGame } from "../../utils/games";

export function EditBuildPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<BuildFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = initialValues ? getThemeByGame(initialValues.game) : null;

  useEffect(() => {
    if (!id) {
      setError("Build invalida.");
      setLoading(false);
      return;
    }

    getBuildById(id)
      .then((build) => {
        setInitialValues({
          title: build.title,
          game: build.game,
          character_name: build.character_name,
          role: build.role,
          description: build.description,
          equipments: build.equipments,
          skills: build.skills,
          is_public: build.is_public,
        });
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Nao foi possivel carregar a build.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(values: BuildFormValues) {
    if (!id) {
      throw new Error("Build invalida.");
    }

    await updateBuild(id, values);
    navigate(`/builds/${id}`);
  }

  return (
    <AppLayout
      description="Atualize itens, funcao e estrategia da sua build."
      themeClassName={theme?.classes.page}
      title="Editar build"
    >
      {loading ? <p>Carregando build...</p> : null}
      {error ? <p style={{ color: "#fca5a5" }}>{error}</p> : null}
      {initialValues ? <BuildForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Atualizar build" /> : null}
    </AppLayout>
  );
}
