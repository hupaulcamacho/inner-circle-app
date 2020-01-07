const express = require('express');

let router = express.Router();

const db= require('../db');
//Get users that belong to a circle


router.get('/:circle_id', async (req, res) => {
	let response;
	let circle_id = parseInt(req.params.circle_id);
	try{
		response = await db.any(`SELECT user_id FROM links WHERE circle_ref = ${circle_id}`);
			console.log('lol');
		res.send(response);
	}
	catch(err){
		console.log('this broke');
		res.json({err: err});
	}
});

router.post('/register', async (req, res) => {
	let response;
	try{
		response = await db.none('INSERT INTO circles(circle_name, leader_id) VALUES($1, $2)', [req.body.circle_name, req.body.leader_id]);
		let tempCircle = await db.one(`SELECT id FROM circles ORDER BY id DESC LIMIT 1 `);
		console.log(tempCircle);
		tempCircle = parseInt(tempCircle.id);
		let linkString = '';
		for(let i = 0; i < req.body.members.length; i++){
			linkString += `(${req.body.members[i]}, ${tempCircle}),`;
		}
		linkString = linkString.slice(0, -1);
		console.log(linkString);
		let allLinks = await db.any(`INSERT INTO links(user_id, circle_ref) VALUES ${linkString}`);
		
	}
	catch(err){
		console.log(err);
	}
	res.json({message: 'added the user and all links',
				circleID: tempCircle});
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
