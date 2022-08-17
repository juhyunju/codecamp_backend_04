// jwt-refresh.strategy.ts

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '692625706635-ctvl5nbam8c9vruhgivqq6aqb8lt0vtl.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      age: 0,
      hashedPassword: '1234',
    };
  }
}
