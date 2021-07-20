const UserChefs = require ('../models/User-chefs')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 8 
        let offset = limit * (page - 1)
        
        const params = {
            filter,
            page,
            limit,
            offset,
            callback(chefs) {


                if (!chefs[0]) {
                    const pagination = {
                        total: Math.ceil(0 / limit) ,
                        page
                    }
                    return res.render('chefsnf', {chefs, pagination, filter})
                } else {
                    const pagination = {
                        total: Math.ceil(chefs[0].total / limit) ,
                        page
                    }
                    return res.render('chefs-usuario', {chefs, pagination, filter})
                }

            } 
        }

        UserChefs.paginate(params)
    },
    error(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 8 
        let offset = limit * (page - 1)
        
        const params = {
            filter,
            page,
            limit,
            offset,
            callback(chefs) {


                if (!chefs[0]) {
                    const pagination = {
                        total: Math.ceil(0 / limit) ,
                        page
                    }
                    return res.render('chefsnf', {chefs, pagination, filter})
                } else {
                    const pagination = {
                        total: Math.ceil(chefs[0].total / limit) ,
                        page
                    }
                    return res.render('chefs-usuario', {chefs, pagination, filter})
                }

            } 
        }

        UserChefs.paginate(params)
    },
    show(req, res) {
        UserChefs.find(req.params.id, function(chef){
            if(!chef) throw `Chef not found!${err}`
            
            UserChefs.getRecipe(function(recipes){
                
                res.render('chef-show-usuario', {chef, receitas: recipes})
            })
            
        })
    }
}