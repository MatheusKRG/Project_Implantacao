import { useCallback, useEffect, useState } from "react";
import { getPublicBuilds, getUserBuilds } from "../services/buildService";
import type { Build, BuildGame } from "../types/build";

type UseBuildsParams = {
  userId?: string;
  mode?: "public" | "private";
  game?: BuildGame;
};

export function useBuilds({ userId, mode = "public", game }: UseBuildsParams = {}) {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBuilds = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (mode === "private" && !userId) {
        setBuilds([]);
        return;
      }

      const data =
        mode === "private" && userId ? await getUserBuilds(userId, game) : await getPublicBuilds(game);
      setBuilds(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Nao foi possivel carregar as builds.");
    } finally {
      setLoading(false);
    }
  }, [game, mode, userId]);

  useEffect(() => {
    void loadBuilds();
  }, [loadBuilds]);

  return { builds, loading, error, reload: loadBuilds };
}
