import { defineEventHandler, useBody, createError, setCookie } from 'h3';
import { a as getUserByEmail, s as serialize, b as sign, u as useRuntimeConfig } from './nitro/node-server.mjs';
import { v as verify } from './password.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'cookie-signature';
import '@prisma/client';
import 'bcryptjs';

const login_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const {
    email,
    password,
    rememberMe
  } = body;
  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: "Email address and password are required"
    });
  }
  const userWithPassword = await getUserByEmail(email);
  if (!userWithPassword) {
    return createError({
      statusCode: 401,
      message: "Bad credentials"
    });
  }
  const verified = await verify(password, userWithPassword.password);
  if (!verified) {
    return createError({
      statusCode: 401,
      message: "Bad credentials"
    });
  }
  const config = useRuntimeConfig();
  const session = serialize({ userId: userWithPassword.id });
  const signedSession = sign(session, config.cookieSecret);
  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
    expires: rememberMe ? new Date(Date.now() + config.cookieRememberMeExpires) : new Date(Date.now() + config.cookieExpires)
  });
  const { password: _password, ...userWithoutPassword } = userWithPassword;
  return {
    user: userWithoutPassword
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
