const Chef = require ('../models/Chef.js')

module.exports = {
    index(req,res) {
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
                    return res.render('adm/chefsnfadm', {chefs, pagination, filter})
                } else {
                    const pagination = {
                        total: Math.ceil(chefs[0].total / limit) ,
                        page
                    }
                    return res.render('adm/chefs', {chefs, pagination, filter})
                }

            } 
        }

        Chef.paginate(params)


    },
    error(req,res){
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
                    return res.render('adm/chefsnfadm', {chefs, pagination, filter})
                } else {
                    const pagination = {
                        total: Math.ceil(chefs[0].total / limit) ,
                        page
                    }
                    return res.render('adm/chefs', {chefs, pagination, filter})
                }

            } 
        }

        Chef.paginate(params)
    },
    post(req, res) {
        
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if(req.body[key] == "") {
                return res.send("Favor preencher todos os campos!")
            }
        }
        
        Chef.create(req.body, function(recipe){
            return res.redirect(`/adm/chefs/${recipe.id}`)
        })

    },
    show(req, res) {
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef not found!")

            Chef.getRecipes(function(recipes){
                
                Chef.countRecipes(function(count){

                    return res.render("adm/show-chef", {chef, recipes, count})
                })

            })       
        })
    },
    edit(req, res) {
        
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef not found!")

            return res.render("adm/edit-chef", {chef})
        })
        
    },
    put(req, res) {
        
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if(req.body[key] == "") {
                return res.send("Favor preencher todos os campos!")
            }
        }
        
        Chef.update(req.body, function(){
            return res.redirect(`/adm/chefs/${req.body.id}`)
        })
    },
    delete(req, res) {
        Chef.delete(req.body.id, function(){
            return res.redirect(`/adm/chefs`)
        })
    }
}
