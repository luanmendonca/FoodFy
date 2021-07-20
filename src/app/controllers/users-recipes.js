const User = require ('../models/User-recipes')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 9
        let offset = limit * (page - 1)
        
        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {

                if(!recipes[0]) {
                    const pagination = {
                        total: Math.ceil(0 / limit) ,
                        page
                    }
                    return res.render('receitasnf', {pratos: recipes, pagination, filter})
                } else {
                    const pagination = {
                        total: Math.ceil(recipes[0].total / limit) ,
                        page
                    }
                    return res.render('receitas', {pratos: recipes, pagination, filter})
                }

            }
        }

        User.paginate(params)

        
    },
    error(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 9
        let offset = limit * (page - 1)
        
        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {

                if(!recipes[0]) {
                    const pagination = {
                        total: Math.ceil(0 / limit) ,
                        page
                    }
                    return res.render('receitasnf', {pratos: recipes, pagination, filter})
                } else {
                    const pagination = {
                        total: Math.ceil(recipes[0].total / limit) ,
                        page
                    }
                    return res.render('receitas', {pratos: recipes, pagination, filter})
                }

            }
        }

        User.paginate(params)
    },
    show(req, res) {
        User.find(req.params.id, function(receita){
            if(!receita) throw `Recipe not found! ${err}`

            res.render('receita', {receita})
        })
    }
}