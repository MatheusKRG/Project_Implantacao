export type BuildGame = "Bloodborne" | "Elden Ring";
export type BuildRole = "tank" | "dps" | "support";

export type Build = {
  id: string;
  user_id: string;
  title: string;
  game: BuildGame;
  character_name: string;
  role: BuildRole;
  description: string;
  equipments: string[];
  skills: string[];
  is_public: boolean;
  created_at: string;
};

export type BuildFormValues = Omit<Build, "id" | "user_id" | "created_at">;

export function getRoleLabel(role: BuildRole) {
  if (role === "tank") {
    return "Tanque";
  }

  if (role === "support") {
    return "Suporte";
  }

  return "Dano";
}
