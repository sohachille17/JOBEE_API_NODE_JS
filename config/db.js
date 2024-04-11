const mongoose = require("mongoose");
class DatabaseConnection{
    constructor(url_string){
        this.url_string = url_string;
       
    }

    onConnectToMongodb(){
        this.url_string = mongoose.connect(this.url_string)
        return this.url_string;
    }
}

module.exports = DatabaseConnection;