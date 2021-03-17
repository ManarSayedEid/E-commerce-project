const bcrypt = require('bcrypt');

const AdminUsers = [
    {
        email: "admin@admin.com",
        password: bcrypt.hashSync("password", 5),
        username: "admin",
        gender: "male",
        isAdmin: true
    }
]

module.exports = AdminUsers;
