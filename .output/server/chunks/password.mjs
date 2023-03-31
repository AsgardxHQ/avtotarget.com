import bcrypt from 'bcryptjs';

async function hash(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}
function verify(plainPassword, hash2) {
  return bcrypt.compare(plainPassword, hash2);
}

export { hash as h, verify as v };
//# sourceMappingURL=password.mjs.map
