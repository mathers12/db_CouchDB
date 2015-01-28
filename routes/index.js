var nano = require('nano')('http://localhost:5984');
var express = require('express');
var router = express.Router();

var db_name = 'users';
var db_data = {
    name: "James",
    lastName: "Bond",
    age: 22
};
var db_id = '1'; // Musime nadefinovat ID (String or number)

//Odstranime databazu, ak uz je vytvorena
nano.db.destroy(db_name,function()
{

//Vytvorenie databazy
    nano.db.create(db_name, function(err) {

        if (!err) {
            //Specifikujeme databazu, s ktorou budeme pracovat
            var database= nano.use(db_name);

            database.insert(db_data, db_id, function(err, body, header) {
                if (err) {
                    console.log("Vyskytla sa chyba pri vkladani!");

                }
                else
                {
                    //SELECT BY ID
                    database.get(db_id,function(err,body)
                    {
                        getHomePage(body);
                    });


                }
            });
        }
        else
            console.log("Vyskytla sa chyba!");
    });
});

function getHomePage(body) {
    router.get('/', function (req, res, next) {

        res.render('index', {user: body});

    });
}
module.exports = router;
