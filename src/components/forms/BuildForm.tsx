import { useEffect, useMemo, useState } from "react";
import type { BuildFormValues, BuildGame, BuildRole } from "../../types/build";
import {
  SUPPORTED_GAMES,
  decodeStoredField,
  encodeStoredField,
  getThemeByGame,
} from "../../utils/games";

type BuildFormProps = {
  initialValues?: BuildFormValues;
  submitLabel: string;
  onSubmit: (values: BuildFormValues) => Promise<void>;
  lockedGame?: BuildGame;
};

const defaultValues: BuildFormValues = {
  title: "",
  game: "Bloodborne",
  character_name: "",
  role: "dps",
  description: "",
  equipments: [],
  skills: [],
  is_public: true,
};

function parseStoredEntries(entries: string[]) {
  return entries.reduce<Record<string, string>>((accumulator, entry) => {
    const { label, value } = decodeStoredField(entry);
    accumulator[label] = value;
    return accumulator;
  }, {});
}

function withCurrentOption(options: string[], currentValue: string) {
  if (!currentValue || options.includes(currentValue)) {
    return options;
  }

  return [currentValue, ...options];
}

export function BuildForm({
  initialValues = defaultValues,
  submitLabel,
  onSubmit,
  lockedGame,
}: BuildFormProps) {
  const [values, setValues] = useState<BuildFormValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeGame = lockedGame ?? values.game;
  const theme = getThemeByGame(activeGame);

  const initialGameFields = useMemo(() => {
    const equipmentEntries = parseStoredEntries(initialValues.equipments);
    const skillEntries = parseStoredEntries(initialValues.skills);

    return {
      ...equipmentEntries,
      ...skillEntries,
    };
  }, [initialValues.equipments, initialValues.skills]);

  const [gameFields, setGameFields] = useState<Record<string, string>>(initialGameFields);

  useEffect(() => {
    setGameFields(initialGameFields);
  }, [initialGameFields]);

  function updateField<K extends keyof BuildFormValues>(field: K, value: BuildFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function updateGameField(key: string, value: string) {
    setGameFields((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const nextTheme = getThemeByGame(activeGame);
      const equipments =
        nextTheme?.fields
          .filter((field) => field.storage === "equipments")
          .map((field) => encodeStoredField(field.label, gameFields[field.label] ?? ""))
          .filter((entry) => !entry.endsWith("::")) ?? [];
      const skills =
        nextTheme?.fields
          .filter((field) => field.storage === "skills")
          .map((field) => encodeStoredField(field.label, gameFields[field.label] ?? ""))
          .filter((entry) => !entry.endsWith("::")) ?? [];

      await onSubmit({
        ...values,
        game: activeGame,
        equipments,
        skills,
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Nao foi possivel salvar a build.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="panel hero-panel stack" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field">
          <span>Titulo</span>
          <input
            onChange={(event) => updateField("title", event.target.value)}
            placeholder={theme?.placeholders.title ?? "Nome da build"}
            required
            value={values.title}
          />
        </label>

        <label className="form-field">
          <span>Jogo</span>
          <select
            disabled={Boolean(lockedGame)}
            onChange={(event) => updateField("game", event.target.value as BuildGame)}
            value={activeGame}
          >
            {SUPPORTED_GAMES.map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Classe, personagem ou arquetipo</span>
          <select
            onChange={(event) => updateField("character_name", event.target.value)}
            required
            value={values.character_name}
          >
            <option value="">Selecione uma opcao</option>
            {withCurrentOption(theme?.characterOptions ?? [], values.character_name).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Funcao</span>
          <select
            onChange={(event) => updateField("role", event.target.value as BuildRole)}
            value={values.role}
          >
            <option value="tank">Tanque</option>
            <option value="dps">Dano</option>
            <option value="support">Suporte</option>
          </select>
        </label>

        {theme?.fields.map((field) => (
          <label className="form-field full" key={field.key}>
            <span>{field.label}</span>
            <select
              onChange={(event) => updateGameField(field.label, event.target.value)}
              value={gameFields[field.label] ?? ""}
            >
              <option value="">{field.placeholder}</option>
              {withCurrentOption(field.options, gameFields[field.label] ?? "").map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}

        <label className="form-field full">
          <span>Estrategia</span>
          <textarea
            onChange={(event) => updateField("description", event.target.value)}
            placeholder={theme?.placeholders.strategy ?? "Explique o objetivo da build."}
            required
            value={values.description}
          />
        </label>

        <label className="form-field">
          <span>Visibilidade</span>
          <select
            onChange={(event) => updateField("is_public", event.target.value === "true")}
            value={String(values.is_public)}
          >
            <option value="true">Publica</option>
            <option value="false">Privada</option>
          </select>
        </label>
      </div>

      {error ? <p style={{ color: "#fca5a5", margin: 0 }}>{error}</p> : null}

      <div className="button-row">
        <button className="button" disabled={loading} type="submit">
          {loading ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
