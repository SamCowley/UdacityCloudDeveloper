export const config = {
  "dev": {
    "username": process.env.dev_username,
    "password": process.env.dev_password,
    "database": process.env.dev_database,
    "host": process.env.dev_host,
    "dialect": "postgres",
    "aws_region": process.env.dev_region,
    "aws_profile": process.env.dev_profile,
    "aws_media_bucket": process.env.dev_media_bucket
  },
  "prod": {
    "username": process.env.prod_username,
    "password": process.env.prod_password,
    "database": process.env.prod_database,
    "host": process.env.prod_host,
    "dialect": "postgres",
    "aws_region": process.env.prod_region,
    "aws_profile": process.env.prod_profile,
    "aws_media_bucket": process.env.prod_media_bucket
  },
  "jwt": {
    "secret": process.env.jwt_secret
  }
}
