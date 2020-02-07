interface OutboundUser {
  email: string;
  phone: string;
}

export interface User extends OutboundUser {
  password: string;
}

interface UserCache {
  [key: string]: User;
}

const PHONE_REGEX = /^\d{3}-\d{3}-\d{4}$/;
let cache: UserCache = {};

export const set = (u: User): OutboundUser => {
  const existingUser = cache[u.email];
  const user = { ...existingUser, ...u };

  cache[user.email] = user;

  // Remove the password for returning
  const { password, ...outbound } = user;
  return outbound;
};

export const isValid = (user: User): boolean => {
  if (!user.email) {
    // required
    throw new Error('email is required');
  }
  if (!user.password) {
    // required
    throw new Error('password is required');
  }
  if (user.phone && !PHONE_REGEX.test(user.phone)) {
    // optional, but must match format
    throw new Error('phone must match XXX-XXX-XXXX');
  }
  return true;
};

// Internal functions for testing purposes
/* eslint-disable-next-line no-underscore-dangle */
export const _clearCache = (): void => {
  cache = {};
};
