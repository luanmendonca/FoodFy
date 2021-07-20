const express = require('express')
const routes = express.Router()
const adms = require('./app/controllers/adms')
const index = require('./app/controllers/index')
const chefs = require('./app/controllers/chefs')
const usersRecipes = require('./app/controllers/users-recipes')
const usersChef = require('./app/controllers/users-chefs')

routes.get('/', function(req, res){
    return res.redirect("/index")
})

routes.get('/index', index.all)

routes.get('/sobre', function(req, res){
    return res.render("sobre")
})

routes.get('/receitas', usersRecipes.index)

routes.get('/receitas/error', usersRecipes.error)

routes.get("/receitas/:id", usersRecipes.show)

routes.get("/chefs", usersChef.index)

routes.get("/chefs/error", usersChef.error)

routes.get("/chefs/:id", usersChef.show)



// Administração de chefs
routes.get('/adm/chefs', chefs.index)

routes.get('/adm/chefs/error', chefs.error)

routes.get('/adm/chefs/create', function(req,res){
     res.render("adm/create-chef")
})

routes.post("/adm/chefs", chefs.post)


routes.get('/adm/chefs/:id', chefs.show)

routes.get('/adm/chefs/:id/edit', chefs.edit)

routes.put('/adm/chefs', chefs.put)

routes.delete('/adm/chefs', chefs.delete)



// Administração de receitas
routes.get('/adm', adms.index)

routes.get('/adm/error', adms.error)

routes.get('/adm/create', adms.create)

routes.get('/adm/:id', adms.show)

routes.get('/adm/:id/edit', adms.edit)

routes.post("/adm", adms.post)

routes.put("/adm", adms.put)

routes.delete("/adm", adms.delete)

module.exports = routes