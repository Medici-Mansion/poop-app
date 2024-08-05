import { logger } from "../logger";
import { TrackPropertiesMap } from "./types";

export const track = async <E extends keyof TrackPropertiesMap>(
  event: E,
  properties?: TrackPropertiesMap[E],
) => {
  logger.info(event, properties);
};
