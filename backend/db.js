const mongoose = require('mongoose');
const mongourl = 'mongodb+srv://knlmalhotra9999:Password2690@cluster1.mhwgs.mongodb.net/iNotebook?retryWrites=true&w=majority&appName=Cluster1';


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongourl).then(() => {
        console.log("connected to mongoose successfully")
    })
        .catch((err) => {
            console.log("not connected", err)
        })

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = main