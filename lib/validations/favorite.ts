import { z } from "zod/v4";

export const toggleFavoriteSchema = z.object({
  stationId: z.uuid("有効な道の駅IDを指定してください"),
});
