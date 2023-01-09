// const {OAuth2Client} = require('google-auth-library');
import { OAuth2Client } from 'google-auth-library';

export const getDecodedOAuthJwtGoogle = async (token: any) => {
  const CLIENT_ID_GOOGLE = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  try {
    const client = new OAuth2Client(CLIENT_ID_GOOGLE);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID_GOOGLE,
    });

    return ticket;
  } catch (error) {
    return {status: 500, data: error};
  }
};
