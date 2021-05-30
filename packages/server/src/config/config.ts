//The database object is here
//but I don't know if I can set it up at all

export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  mailchimp: {
    apikey: process.env.MAILCHIMP_APIKEY,
    audienceId: process.env.MAILCHIMP_AUDIENCEID,
  },
  mandrill: {
    apikey: process.env.MANDRILL_APIKEY,
    email: process.env.MANDRILL_EMAIL,
  },
  database: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  },
});
