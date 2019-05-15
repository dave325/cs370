var passport = require('passport');
var  passportJWT = require("passport-jwt");
var  LocalStrategy = require('passport-local').Strategy;
var  JWTStrategy = passportJWT.Strategy;
var  ExtractJWT = passportJWT.ExtractJwt;


passport.use(new LocalStrategy({
	usernameField: 'email'
},
	function (username, password, done) {

		/**
		 * Run query or api endpoint to check if user exists here
		 */
	})
);
passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
	jsonWebTokenOptions:{  exp: Math.floor(Date.now() / 1000) + (60 * 60)}
},
// Check if user token is valid
	function (jwtPayload, cb) {
		if (!jwtPayload) {
			return cb(null, false, jwtPayload);
		}
		//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
		return cb(null, jwtPayload);
	}
));