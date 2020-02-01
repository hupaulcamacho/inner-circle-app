
cat seed.sql | heroku pg:psql

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR UNIQUE,
    loggedIn BOOLEAN
);

CREATE TABLE circles (
    id SERIAL PRIMARY KEY,
    circle_name VARCHAR UNIQUE,
    leader_id INT REFERENCES users (id),
    circle_description VARCHAR
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    circle_id INT REFERENCES circles (id) ON DELETE CASCADE,
    owner_id INT REFERENCES users (id) ON DELETE CASCADE,
    owner_avi VARCHAR REFERENCES users(avatar),
    post_circle VARCHAR REFERENCES circles(circle_name),
    image_url VARCHAR,
    post_body VARCHAR
);
       
CREATE TABLE links (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    circle_ref INT REFERENCES circles (id) ON DELETE CASCADE
  );

INSERT INTO users (username, email, password, avatar, loggedIn)
    VALUES ('narutolover', 'uzumaki56@gmail.com', 'rasengan', 'http://localhost:3030/images/avatar/naruto.png', 'false'),
           ('nenmaster15', 'issacnetero@hotmail.com', 'hunter', 'http://localhost:3030/images/avatar/netero.jpg', 'false'),
           ('cutenavi', 'myonepiece@gmail.com', 'treasure', 'http://localhost:3030/images/avatar/nami.png','false'),
           ('ladiesman47', 'zenitsuagatsuma@gmail.com', 'lightning', 'http://localhost:3030/images/avatar/zenitsu.jpg', 'false'),
           ('noinsidevoice', 'cloverasta@yahoo.com', 'black', 'http://localhost:3030/images/avatar/asta.jpeg', 'false'),
           ('senzueater11', 'songoku@gmail.com', 'dragon', 'http://localhost:3030/images/avatar/goku.jpg', 'false'),
           ('alchemynoob', 'eelric@gmail.com', 'philosopher', 'http://localhost:3030/images/avatar/edward.jpg', 'false'),
           ('therealdemonslayer', 'sango223@gmail.com', 'shippo', 'http://localhost:3030/images/avatar/sango.png', 'false'),
           
           ('doubledribble', 'flopharden@yahoo.com', 'rockets', 'http://localhost:3030/images/avatar/harden.jpg', 'false'),
           ('kingjames', 'lebronclevland45@gmail.com', 'clippers', 'http://localhost:3030/images/avatar/lebron.jpg', 'false'),
           ('nopassing', 'kobeeee@gmail.com', 'lakers', 'http://localhost:3030/images/avatar/kobe.jpg', 'false'),
           ('onlythrees', 'chefcurry@hotmail.com', 'warrior', 'http://localhost:3030/images/avatar/curry.jpg', 'false'),
           ('foreverknicks', 'reddhook@hotmail.com', 'theballer', 'http://localhost:3030/images/avatar/carmelo.jpeg', 'false'),
           ('thunderfan22', 'westbrick@gmail.com', 'thunder', 'http://localhost:3030/images/avatar/westbrook.jpg', 'false'),

           ('rpggamer432', 'chrono34@gmail.com', 'timecross', 'http://localhost:3030/images/avatar/chrono.jpg', 'false'),
           ('theprincess', 'toadstool@gmail.com', 'peach', 'http://localhost:3030/images/avatar/peach.png', 'false'),
           ('masterchief', 'halomaster@gmail.com', 'warthog', 'http://localhost:3030/images/avatar/master_chief.jpg', 'false'),
           ('precursororb4', 'jakanddax55@gmail.com', 'darkjak', 'http://localhost:3030/images/avatar/jak.jpg', 'false'),
           ('tombraider', 'lauracroft94@gmail.com', 'raider', 'http://localhost:3030/images/avatar/laura.jpg', 'false'),
           ('1000hadoukens', 'sfryu@gmail.com', 'hadouken', 'http://localhost:3030/images/avatar/ryu.jpg', 'false'),
           ('whereiszelda', 'triforce45@gmail.com', 'ganonisdead', 'http://localhost:3030/images/avatar/link.jpg', 'false');

INSERT INTO circles (circle_name, leader_id, circle_description)
    VALUES ('Anime Haven', 2, 'A place for all those who enjoy Anime'),
           ('Sports Center', 10, 'A group of elite sports fans'),
           ('Gamers United', 17, 'A band of friendly gamers');


INSERT INTO posts (circle_id, owner_id, owner_avi,  image_url, post_body, post_circle)
    VALUES  
            (1, 1, 'http://localhost:3030/images/avatar/naruto.png', 'http://localhost:3030/images/pictures/naruto_post_1.gif', 'How fast do you guys think naruto can run?', 'Anime Haven'),
            (1, 2, 'http://localhost:3030/images/avatar/netero.jpg', 'http://localhost:3030/images/pictures/netero_post_1.jpg', 'Killa and Gon are almost like siblings to each other', 'Anime Haven'),
            (1, 4, 'http://localhost:3030/images/avatar/zenitsu.jpg',  'http://localhost:3030/images/pictures/zenitsu_post_1.jpg', 'Should I get this figure of Tanjiro?', 'Anime Haven'),
            (1, 1, 'http://localhost:3030/images/avatar/naruto.png', 'http://localhost:3030/images/pictures/naruto_post_2.gif', 'The animation in the boruto movie is super clean', 'Anime Haven'),
            (1, 3, 'http://localhost:3030/images/avatar/nami.png',  'http://localhost:3030/images/pictures/nami_post_1.jpeg', 'Has anyone read the new Chapter?', 'Anime Haven'),
            (1, 6, 'http://localhost:3030/images/avatar/goku.jpg',  'http://localhost:3030/images/pictures/goku_post_1.gif', 'I think im going to try put the Saitama challenge, sounds like alot of fun', 'Anime Haven'),




           (2, 10, 'http://localhost:3030/images/avatar/lebron.jpg',  'http://localhost:3030/images/pictures/lebron_post_1.gif', 'My face when people say lebron is not the GOAT', 'Sports Center'),
           (2, 13, 'http://localhost:3030/images/avatar/carmelo.jpeg',  'http://localhost:3030/images/pictures/carmelo_post_1.jpg', 'I miss carmelo being on the Knicks...', 'Sports Center'),



            (3, 1, 'http://localhost:3030/images/avatar/naruto.png', 'http://localhost:3030/images/pictures/naruto_post_3.gif', 'Jump Force as a game is pretty meh, but the graphics are fire imo', 'Gamers United'),

            (3, 17, 'http://localhost:3030/images/avatar/master_chief.jpg', 'http://localhost:3030/images/pictures/chief_post_1.jpg', 'Who is ready for Halo Infinite?!!', 'Gamers United'),

            (3, 15, 'http://localhost:3030/images/avatar/chrono.jpg',  'http://localhost:3030/images/pictures/chrono_post_1.jpg', 'I NEED a new golden sun game to drop', 'Gamers United'),

            (3, 20, 'http://localhost:3030/images/avatar/ryu.jpg',  'http://localhost:3030/images/pictures/ryu_post_1.jpg', 'Tokido is one of the most impressive Akuma players, he always plays at an insane level', 'Gamers United');




INSERT INTO links (user_id, circle_ref)
    VALUES(1,1), (1,3), (2,1), (3,1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 2), (10, 2),
      (11, 2), (12, 2), (13, 2), (14, 2), (15, 3), (16, 3), (17, 3), (18, 3), (19, 3 ), (20, 3);




           
