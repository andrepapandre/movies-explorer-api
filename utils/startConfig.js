require('dotenv').config();

const { DATABASE_ADRESS = 'mongodb://127.0.0.1/bitfilmsdb' } = process.env
const { PORT = 3000 } = process.env;

module.exports = { DATABASE_ADRESS, PORT }
