export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: `${parseInt(process.env.JWT_EXPIRES_IN, 10) || 36000}s`,
  },
  resetPassword: {
    expiresIn: `${
      parseInt(process.env.RESET_PASSWORD_EXPIRES_IN, 10) || 24 * 60 * 1000
    }s`,
  },
});
