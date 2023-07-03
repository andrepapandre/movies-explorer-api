const { DATABASE_ADRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env
const { PORT = 3000 } = process.env;

module.exports = { DATABASE_ADRESS , PORT }
