const Datastore = require('nedb');

let db;

class DAO {
    constructor(path) {
        if (path) {

            this.db = new Datastore({filename: path, autoload: true});
            console.log("Db Connected: ", path);

            return this.db;
        } else {
            this.db = new Datastore();
        }
    }
}

module.exports = DAO;