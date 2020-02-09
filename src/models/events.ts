import cuid from 'cuid';

export interface InboundEvent {
  type: string;
  userId: string;
}

export interface Event extends InboundEvent {
  id: string;
  created: Date;
}

interface EventCache {
  [key: string]: Event;
}

let cache: EventCache = {};

export const get = (
  userId: string | undefined = undefined,
  start: number | string = 0,
  end: number | string = Date.now()
): Event[] => {
  const result: Event[] = [];
  const startDate = new Date(start);
  const endDate = new Date(end);
  Object.values(cache).forEach(event => {
    if (event.created >= startDate && event.created <= endDate) {
      if (!userId || event.userId === userId) {
        result.push(event);
      }
    }
  });
  return result;
};

export const set = (e: InboundEvent): Event => {
  const event: Event = { ...e, id: cuid(), created: new Date() };
  cache[event.id] = event;
  return event;
};

export const isValid = (event: InboundEvent): boolean => {
  if (!event.type) {
    // required
    throw new Error('type is required');
  }
  return true;
};

// Internal functions for testing purposes
/* eslint-disable-next-line no-underscore-dangle */
export const _clearCache = (): void => {
  cache = {};
};

/* eslint-disable-next-line no-underscore-dangle */
export const _getCache = (): EventCache => cache;

/* eslint-disable-next-line no-underscore-dangle */
export const _setCache = (updated: EventCache): void => {
  cache = updated;
};
