export default () => ({
  database: {
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    encryption: process.env.MAIL_ENCRYPTION,
    fromAddress: process.env.MAIL_FROM_ADDRESS,
    mailer: process.env.MAIL_MAILER,
    fromName: process.env.MAIL_FROM_NAME,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  next: {
    resetPasswordUrl: process.env.NEXT_RESET_PASSWORD_URL,
  },
});
