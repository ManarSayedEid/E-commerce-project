const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')

const AdminBroMongoose = require('@admin-bro/mongoose');

const mongoose = require('mongoose')
AdminBro.registerAdapter(AdminBroMongoose)



const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
    logo: 'https://pbs.twimg.com/profile_images/595898041929981952/qBVIEatN_400x400.png',
    companyName: 'ShoseHouse',
    softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
  }
})

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;