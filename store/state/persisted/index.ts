import EventEmitter from "eventemitter3";

import BroadcastChannel from "@/lib/broadcast/stub";
import { logger } from "@/lib/logger";
import * as store from "@/store/state/persisted/store";
import { Schema } from "./schema";

const broadcast = new BroadcastChannel("POOP_BROADCAST_CHANNEL");
const UPDATE_EVENT = "POOP_UPDATE";

const defaults: Schema = {
  session: {
    user: null,
    profile: null,
    token: null,
  },
};

let _state: Schema = defaults;
const _emitter = new EventEmitter();

export async function init() {
  logger.debug("persisted state: initializing");

  broadcast.onmessage = onBroadcastMessage;

  try {
    const stored = await store.read();
    if (!stored) {
      logger.debug("persisted state: initializing default storage");
      await store.write(defaults);
    }
    _state = stored || defaults;
    logger.debug("persisted state: initialized");
  } catch (e) {
    logger.error("persisted state: failed to load root state from storage", {
      message: e,
    });

    return defaults;
  }
}

export function get<K extends keyof Schema>(key: K): Schema[K] {
  return _state[key];
}

export async function write<K extends keyof Schema>(
  key: K,
  value: Schema[K]
): Promise<void> {
  try {
    _state[key] = value;
    await store.write(_state);
    setTimeout(() => broadcast.postMessage({ event: UPDATE_EVENT }), 0);
    logger.debug(`persisted state: wrote root state to storage`, {
      updatedKey: key,
    });
  } catch (e) {
    logger.error(`persisted state: failed writing root state to storage`, {
      message: e,
    });
  }
}

export function onUpdate(cb: () => void): () => void {
  _emitter.addListener("update", cb);
  return () => _emitter.removeListener("update", cb);
}

async function onBroadcastMessage({ data }: MessageEvent) {
  // validate event
  if (typeof data === "object" && data.event === UPDATE_EVENT) {
    try {
      // read next state, possibly updated by another tab
      const next = await store.read();

      if (next) {
        logger.debug(`persisted state: handling update from broadcast channel`);
        _state = next;
        _emitter.emit("update");
      } else {
        logger.error(
          `persisted state: handled update update from broadcast channel, but found no data`
        );
      }
    } catch (e) {
      logger.error(
        `persisted state: failed handling update from broadcast channel`,
        {
          message: e,
        }
      );
    }
  }
}
