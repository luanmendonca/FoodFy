const Adm = require ('../models/Adm')


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
            callback(recipes) {

                if(!recipes[0]) {
                    const pagination = {
                        total: Math.ceil(0 / limit) ,
                        page
                    }
                    return res.render('adm/receitasnfadm', {pratos: recipes, pagination, filter})
                } else {
                    const pagination = {
                        total: Math.ceil(recipes[0].total / limit) ,
                        page
                    }
                    return res.render('adm/adm', {pratos: recipes, pagination, filter})
                }

            }
        }

        Adm.paginate(params)


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
            callback(recipes) {

                if(!recipes[0]) {
                    const pagination = {
                        total: Math.ceil(0 / limit) ,
                        page
                    }
                    return res.render('adm/receitasnfadm', {pratos: recipes, pagination, filter})
                } else {
                    const pagination = {
                        total: Math.ceil(recipes[0].total / limit) ,
                        page
                    }
                    return res.render('adm/adm', {pratos: recipes, pagination, filter})
                }

            }
        }

        Adm.paginate(params)
    },
    create(req, res) {
        Adm.chefsSelectOptions(function(options){
            return res.render('adm/create', {chefOptions: options})
            
        })
    },
    post(req, res) {
        
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if(req.body[key] == "") {
                return res.send("Favor preencher todos os campos!")
            }
        }
        
        Adm.create(req.body, function(recipe){
            return res.redirect(`/adm/${recipe.id}`)
        })

    },
    show(req, res) {
        Adm.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Recipe not found!")

            return res.render("adm/show", {recipe})
        })
    },
    edit(req, res) {
        
        Adm.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Recipe not found!")

            Adm.chefsSelectOptions(function(options){
                return res.render('adm/edit', {recipe,chefOptions: options})  
            })
        })
        
    },
    put(req, res) {
        
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if(req.body[key] == "") {
                return res.send("Favor preencher todos os campos!")
            }
        }
        
        Adm.update(req.body, function(){
            return res.redirect(`/adm/${req.body.id}`)
        })
    },
    delete(req, res) {
        Adm.delete(req.body.id, function(){
            return res.redirect(`/adm`)
        })
    }
}
