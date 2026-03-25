import { supabase } from "./supabase";
import type { Build, BuildFormValues, BuildGame } from "../types/build";
import { decodeStoredField, getThemeByGame, type GameFieldDefinition } from "../utils/games";

type GameRow = {
  id: number;
  name: BuildGame;
  slug: string;
};

type OptionCategoryRow = {
  id: number;
  key: string;
  label: string;
  option_kind: "profile" | "equipment" | "skill";
};

type GameOptionRow = {
  id: number;
  name: string;
};

type BuildV2Row = {
  id: string;
  user_id: string;
  title: string;
  role: Build["role"];
  description: string;
  is_public: boolean;
  created_at: string;
  custom_character_name: string | null;
  games: GameRow | GameRow[] | null;
  character_option: GameOptionRow | GameOptionRow[] | null;
};

type BuildOptionValueRow = {
  category_id: number;
  slot_index: number;
  custom_value: string | null;
  option: GameOptionRow | GameOptionRow[] | null;
  category: OptionCategoryRow | OptionCategoryRow[] | null;
};

const BUILD_SELECT = `
  id,
  user_id,
  title,
  role,
  description,
  is_public,
  created_at,
  custom_character_name,
  games:games!builds_v2_game_id_fkey(id, name, slug),
  character_option:game_options!builds_v2_character_option_id_fkey(id, name)
`;

function toSingle<T>(value: T | T[] | null): T | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

async function getGameRow(game: BuildGame) {
  const { data, error } = await supabase.from("games").select("id, name, slug").eq("name", game).single();

  if (error) {
    throw error;
  }

  return data as GameRow;
}

async function getCategoriesByGameId(gameId: number) {
  const { data, error } = await supabase
    .from("option_categories")
    .select("id, key, label, option_kind")
    .eq("game_id", gameId);

  if (error) {
    throw error;
  }

  return (data ?? []) as OptionCategoryRow[];
}

async function resolveCharacterOptionId(gameId: number, characterName: string) {
  const { data, error } = await supabase
    .from("option_categories")
    .select("id")
    .eq("game_id", gameId)
    .eq("key", "character")
    .single();

  if (error) {
    return null;
  }

  const categoryId = data.id as number;

  const { data: optionData, error: optionError } = await supabase
    .from("game_options")
    .select("id")
    .eq("category_id", categoryId)
    .eq("name", characterName)
    .maybeSingle();

  if (optionError) {
    throw optionError;
  }

  return (optionData?.id as number | undefined) ?? null;
}

function mapBuildRow(row: BuildV2Row, optionValues: BuildOptionValueRow[]): Build {
  const gameRow = toSingle(row.games);
  const characterOption = toSingle(row.character_option);
  const theme = getThemeByGame(gameRow?.name ?? "");

  const equipments: string[] = [];
  const skills: string[] = [];

  optionValues
    .slice()
    .sort((left, right) => left.slot_index - right.slot_index)
    .forEach((value) => {
      const category = toSingle(value.category);
      const option = toSingle(value.option);
      const nextValue = option?.name ?? value.custom_value ?? "";

      if (!category || !nextValue) {
        return;
      }

      const encoded = `${getStoredLabel(theme?.fields ?? [], category.key, category.label, value.slot_index)}::${nextValue}`;

      if (category.option_kind === "skill") {
        skills.push(encoded);
      } else {
        equipments.push(encoded);
      }
    });

  return {
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    game: (gameRow?.name ?? "Bloodborne") as BuildGame,
    character_name: row.custom_character_name ?? characterOption?.name ?? "Build personalizada",
    role: row.role,
    description: row.description,
    equipments,
    skills,
    is_public: row.is_public,
    created_at: row.created_at,
  };
}

async function fetchOptionValues(buildId: string) {
  const { data, error } = await supabase
    .from("build_option_values")
    .select(
      `
        category_id,
        slot_index,
        custom_value,
        option:game_options(id, name),
        category:option_categories(id, key, label, option_kind)
      `,
    )
    .eq("build_id", buildId);

  if (error) {
    throw error;
  }

  return (data ?? []) as BuildOptionValueRow[];
}

async function mapBuildWithOptions(row: BuildV2Row) {
  const optionValues = await fetchOptionValues(row.id);
  return mapBuildRow(row, optionValues);
}

export async function getPublicBuilds(game?: BuildGame) {
  let query = supabase.from("builds_v2").select(BUILD_SELECT).eq("is_public", true);

  if (game) {
    const gameRow = await getGameRow(game);
    query = query.eq("game_id", gameRow.id);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return Promise.all(((data ?? []) as BuildV2Row[]).map(mapBuildWithOptions));
}

export async function getUserBuilds(userId: string, game?: BuildGame) {
  let query = supabase.from("builds_v2").select(BUILD_SELECT).eq("user_id", userId);

  if (game) {
    const gameRow = await getGameRow(game);
    query = query.eq("game_id", gameRow.id);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return Promise.all(((data ?? []) as BuildV2Row[]).map(mapBuildWithOptions));
}

export async function getBuildById(id: string) {
  const { data, error } = await supabase.from("builds_v2").select(BUILD_SELECT).eq("id", id).single();

  if (error) {
    throw error;
  }

  return mapBuildWithOptions(data as BuildV2Row);
}

export async function createBuild(values: BuildFormValues, userId: string) {
  const gameRow = await getGameRow(values.game);
  const categories = await getCategoriesByGameId(gameRow.id);
  const characterOptionId = await resolveCharacterOptionId(gameRow.id, values.character_name);

  const { data, error } = await supabase
    .from("builds_v2")
    .insert({
      user_id: userId,
      game_id: gameRow.id,
      title: values.title,
      role: values.role,
      description: values.description,
      is_public: values.is_public,
      character_option_id: characterOptionId,
      custom_character_name: characterOptionId ? null : values.character_name,
    })
    .select(BUILD_SELECT)
    .single();

  if (error) {
    throw error;
  }

  await replaceBuildOptionValues(data.id as string, categories, values);
  return getBuildById(data.id as string);
}

export async function updateBuild(id: string, values: Partial<BuildFormValues>) {
  const current = await getBuildById(id);
  const mergedValues: BuildFormValues = {
    ...current,
    ...values,
  };

  const gameRow = await getGameRow(mergedValues.game);
  const categories = await getCategoriesByGameId(gameRow.id);
  const characterOptionId = await resolveCharacterOptionId(gameRow.id, mergedValues.character_name);

  const { error } = await supabase
    .from("builds_v2")
    .update({
      game_id: gameRow.id,
      title: mergedValues.title,
      role: mergedValues.role,
      description: mergedValues.description,
      is_public: mergedValues.is_public,
      character_option_id: characterOptionId,
      custom_character_name: characterOptionId ? null : mergedValues.character_name,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  await replaceBuildOptionValues(id, categories, mergedValues);
  return getBuildById(id);
}

async function replaceBuildOptionValues(buildId: string, categories: OptionCategoryRow[], values: BuildFormValues) {
  const theme = getThemeByGame(values.game);
  const categoryMap = new Map(categories.map((category) => [category.key, category]));
  const decodedFields = [...values.equipments, ...values.skills]
    .map(decodeStoredField)
    .filter((field) => field.value);

  const payload = decodedFields
    .map((field) => {
      const fieldDefinition = theme?.fields.find((item) => item.label === field.label);
      const category = fieldDefinition ? categoryMap.get(toCategoryKey(fieldDefinition.key)) : null;

      if (!category || !fieldDefinition) {
        return null;
      }

      const slotIndex = extractSlotIndex(fieldDefinition?.key);

      return {
        build_id: buildId,
        category_id: category.id,
        slot_index: slotIndex,
        custom_value: field.value,
      };
    })
    .filter(Boolean);

  const { error: deleteError } = await supabase.from("build_option_values").delete().eq("build_id", buildId);

  if (deleteError) {
    throw deleteError;
  }

  if (!payload.length) {
    return;
  }

  const { error: insertError } = await supabase.from("build_option_values").insert(payload);

  if (insertError) {
    throw insertError;
  }
}

function extractSlotIndex(key?: string) {
  if (!key) {
    return 1;
  }

  const match = key.match(/_(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function toCategoryKey(key: string) {
  return key.replace(/_\d+$/, "");
}

function getStoredLabel(fields: GameFieldDefinition[], categoryKey: string, fallbackLabel: string, slotIndex: number) {
  const field = fields.find((item) => toCategoryKey(item.key) === categoryKey && extractSlotIndex(item.key) === slotIndex);
  return field?.label ?? fallbackLabel;
}

export async function deleteBuild(id: string) {
  const { error } = await supabase.from("builds_v2").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
