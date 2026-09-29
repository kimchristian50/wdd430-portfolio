import bcrypt from 'bcryptjs';

const password = 'sherman';
const hash = '$2b$12$MSZBaZky2n3da.AJWR0iDetdF1.kkmeQF2WsbKaNHWs6hj0be5Rei';

console.log('Email env:', process.env.OWNER_EMAIL);
console.log('Hash env:', process.env.OWNER_PASSWORD_HASH);
console.log('Hash starts with:', hash.substring(0, 7));

const match = await bcrypt.compare(password, hash);
console.log('Password matches:', match);

// Also generate a fresh hash to compare
const freshHash = await bcrypt.hash(password, 12);
console.log('Fresh hash:', freshHash);