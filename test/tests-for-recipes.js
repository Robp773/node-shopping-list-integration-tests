const chai =  require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {app, runServer, closeServer} = require('../server');

const should = chai.should();


describe('Recipes', function(){
	before(function(){
		return runServer();
	})

	after(function(){
		return closeServer();
	})

	it('should list items on GET', function(){
		// why do we have to use return? wouldn't chai.request(app).get('/recipes') work?
		return chai.request(app).get('/recipes')

		.then (function(res){
		res.body.length.should.be.at.least(1);
        res.should.be.json;
        res.body.should.be.a('array');
        console.log(res.body)
		})
		
	})

	it('should successfully add items on POST', function(){
		const addedItem = {'name': 'bacon', "ingredients": ["diabetes", 'grease', 'sat fat']}
		return chai.request(app)
		.post('/recipes')
		.send(addedItem)

		.then(function(res){
			// could I also use addedItemItem.id = req.body.id and then use addedItem by itself instead of using object.assign?
			res.body.should.deep.equal(Object.assign(addedItem, {'id': res.body.id}));
		})
	})

	it('should successfully delete items on DELETE', function(){
		return chai.request(app).get('/recipes')
		.then(function(res){
			const testId = res.body[0].id;
			return chai.request(app).delete(`/recipes/${testId}`)
			.then(function(res){
				res.status.should.equal(204)
			})
		})
	})

	it('should successfully update items on PUT', function(){
		return chai.request(app).get('/recipes')
		.then(function (res) {
			const updateId = res.body[0].id		
		})
		return chai.request(app).put(`/recipes/${updateId}`)
		const data =  {'name': 'pizza', 'ingredients': ['tomatoes', 'cheese', 'bread']}
		.send(data)
		.then(function(res){
			 res.body.should.deep.equal(data);
		})
            
		
		})
	})

