const db = require('../../config/db')

module.exports = {
    allrecipes(callback){
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            `, function(err, results){
                if(err) throw`Database Error!${err}`

                callback(results.rows)
            })
    },
    findBy(filter, callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'
            `, function(err, results){
                if(err) throw`Database Error!${err}`

                callback(results.rows)
            })
    }
}