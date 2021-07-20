const db = require ('../../config/db')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM chefs`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    find(id, callback) {
        db.query(`
            SELECT chefs.*, COUNT(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
            `, [id], function(err, results){
                if(err) throw `Chef not found!${err}`

                callback(results.rows[0])
            })
    },
    getRecipe(callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            `, function(err, results) {
                if(err) throw`Database Error!${err}`

                callback(results.rows)
            })
    },
    findBy(filter, callback)  {
        db.query(`
            SELECT * 
            FROM chefs
            WHERE chefs.name ILIKE '%${filter}%'
            `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
        filterQuery = "",
        totalQuery = `(
            SELECT count(*) FROM chefs
        ) AS total`

        
        if ( filter ) {
 
            filterQuery = `
            WHERE chefs.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM chefs
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT chefs.*, ${totalQuery} 
        FROM chefs
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database Error!${err}`

            callback(results.rows)
        })
    }
}