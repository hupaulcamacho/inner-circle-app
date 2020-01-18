const express = require('express');

let router = express.Router();

const db= require('../db');



router.get('/getAllCircles', async (req, res) => {
	try{
		let response = await db.any(`SELECT * FROM circles`);
		console.log(response);
		res.json({message: response});
	}
	catch(err){
		console.log('this broker');
		res.json({err: err});
	}
});

//Get all circles that belong to a user

router.get('/getUserCircles/:userId', async (req, res) => {
	try{
		let response = await db.any(`SELECT * FROM links WHERE user_id = ${req.params.userId}`);
		let script = `SELECT * FROM circles WHERE id = $1`;
		let temp;
		let allNames = [];
		for(let i = 0; i < response.length; i++){
			temp = await db.one(script, [response[i].circle_ref]);
			allNames.push(temp);
		};
		console.log(allNames);
			res.json({payload: allNames});
	}
	catch(err){
		console.log('no user for you');
		res.json({err: err});
	};
});

// SELECT * FROM users INNER JOIN links ON users.id = links.user_id INNER JOIN circles ON links.circle_ref = circles.id WHERE circle_ref = 1;
// Get Circle and members
router.get('/getCircleAndMembersByCircleName/:circleName', async (req, res) => {
	let query = `SELECT username, avatar, circle_name FROM users INNER JOIN links ON users.id = links.user_id INNER JOIN circles ON links.circle_ref = circles.id WHERE circle_name LIKE $1;`
	try {
		let data = await db.any(query, [`%${req.params.circleName}%`]);
		res.json({
			message: 'Request Sucessful.',
			data: data
		});
	}
	catch (err) {
		console.log(err);
		res.json({err: err});
	}
});


router.get('/getCircleByName/:circleName', async (req, res) => {

	try {
		let data = await db.any(`SELECT * FROM circles WHERE circle_name LIKE $1`, [`%${req.params.circleName}%`]);
		res.json({
			message: 'Request Sucessful.',
			data: data
		});
	}
	catch (err) {
		console.log(err);
		res.json({err: err});
	}
});

//get circle stuff by id
router.get('/getCircleById/:circleId', async (req, res) => {
	try {
		let response = await db.any(`SELECT * FROM circles WHERE id = $1`, [`${req.params.circleId}`]);
		res.json({message: response});
	}
	catch (err) {
		console.log(err);
		res.json({err: err});
	}
});


router.get('/:circle_id', async (req, res) => {
	let response;
	let circle_id = parseInt(req.params.circle_id);
	try{
		response = await db.any(`SELECT user_id FROM links WHERE circle_ref = ${circle_id}`);
			console.log('lol');
		res.send(response);
	}
	catch(err){
		console.log('lol wrong sub');
		res.json({err: err});
	}
});



router.post('/register', async (req, res) => {
	console.log(req.body)
	try{
		let response = await db.none('INSERT INTO circles(circle_name, leader_id, circle_description) VALUES($1, $2, $3)', [req.body.circle_name, req.body.leader_id, req.body.circle_description]);
		// let tempCircle = await db.one(`SELECT id FROM circles ORDER BY id DESC LIMIT 1 `);
		// console.log(tempCircle);
		// tempCircle = parseInt(tempCircle.id);
		// let linkString = '';
		// for(let i = 0; i < req.body.members.length; i++){
		// 	linkString += `(${req.body.members[i]}, ${tempCircle}),`;
		// }
		// linkString = linkString.slice(0, -1);
		// console.log(linkString);
		// let allLinks = await db.any(`INSERT INTO links(user_id, circle_ref) VALUES ${linkString}`);
		res.json({
			message: 'Circle Created.'
		})
	}
	catch(err){
		console.log(err);
	}
	// res.json({message: 'added the user and all links',
	// 			circleID: tempCircle});
});
//add a part that checks to see whether a duplicate user is trying to be added
router.patch('/addUser', async (req, res) => {
	try{
		let isThereSpace = await db.one(`SELECT COUNT(id) FROM links WHERE circle_ref = ${req.body.circle_ref}`);
		console.log(isThereSpace);
		if(isThereSpace.count >= 8){
			res.json({message: 'Sorry, but this circle is at capacity, delete a user before adding another'});
		}
		else{
			let addUser = await db.none('INSERT INTO links(user_id, circle_ref) VALUES($1, $2)', [req.body.user_id, req.body.circle_ref]);
		}
	}
	catch(err){
		res.send(err);
	}
	res.send('lol');
});

router.delete('/deleteUserFromCircle', async(req, res) => {
	try{
		let deleteUserIfExists = await db.any(`DELETE FROM links WHERE user_id = ${req.body.user_id} AND circle_ref = ${req.body.circle_ref}`);	
	}
	catch(err){
		res.send(err);
	}
	res.json({message: 'User deleted from circle'});
});

router.delete('/deleteCircle', async (req, res) => {
	try{
		let deleteCircle = await db.any(`DELETE FROM circles WHERE id = ${req.body.id}`);
	}
	catch(err){
		res.send(err);
	}
	res.json({message: 'Circle deleted'});
});


module.exports = router;
