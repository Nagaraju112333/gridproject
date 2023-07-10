const mongoose=require('mongoose')



function makeNewConnection(uri) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db.on("error", function (error) {
    // console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection ${this.name}`)
    );
  });
  db.on("connected", function () {
    console.log(`MongoDB :: connected ${this.name}`);
  });
  return db;
}
mongoose.db1 = makeNewConnection(
  "mongodb://mongo:27017/gridDb"
);
module.exports = mongoose;
