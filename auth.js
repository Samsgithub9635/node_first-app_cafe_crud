// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; 
import Employee from './models/employees.js'; 

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // console.log('Received credentials:', username, password);
        const user = await Employee.findOne({ username }); // 
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });

        const isPasswordMatch = await user.comparePassword(password); //bcrypt.comapre function used in the Employee=.js file
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

export default passport; 
