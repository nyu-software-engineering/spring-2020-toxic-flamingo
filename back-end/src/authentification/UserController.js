module.exports = {
    signUp: async (req, res, next) => {
        //email, password, username
        //req.value.body
        console.log('UsersController.signUp() called!');
    },

    logIn: async (req, res, next) => {
        //generate tokens
        console.log('log in called')
    }
}