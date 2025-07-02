// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; // ✅ Fix syntax
import Employee from './models/employees.js'; // ✅ Correct model name and .js extension

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // console.log('Received credentials:', username, password);
        const user = await Employee.findOne({ username }); // ✅ use Employee instead of Person
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });

        const isPasswordMatch = await user.comparePassword(password); // ✅ assumes you have comparePassword method
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

export default passport; // ✅ Convert to ES module export
