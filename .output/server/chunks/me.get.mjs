import { defineEventHandler } from 'h3';

const me_get = defineEventHandler(async (event) => {
  const userWithPassword = event.context.user;
  if (!userWithPassword) {
    return {
      user: null
    };
  }
  const { password: _password, ...userWithoutPassword } = userWithPassword;
  return {
    user: userWithoutPassword
  };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
