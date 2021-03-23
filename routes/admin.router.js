const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')

const AdminBroMongoose = require('@admin-bro/mongoose');

const mongoose = require('mongoose')
AdminBro.registerAdapter(AdminBroMongoose)



const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
    logo: 'https://i.imgur.com/RzODopn.jpeg',
    companyName: 'ShoseHouse',
    softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
  }
})

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;