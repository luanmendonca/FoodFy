const Index = require('../models/Index')

module.exports = {
    all(req,res){
        const { filter } = req.query

        if (filter) {
            Index.findBy(filter, function(recipes){
                if (recipes == "") {
                    return res.render('receitasnf', {pratos: recipes, filter})
                } else {
                    return res.render('receitas', {pratos: recipes, filter})
                }})
        } else {
            Index.allrecipes(function(pratos){
               return res.render('index', {pratos})
            })
        }

        
    }
}