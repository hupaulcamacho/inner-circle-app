DROP DATABASE IF EXISTS inner_circle_db;

CREATE DATABASE inner_circle_db;

\c inner_circle_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    avatar VARCHAR
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
    post_circle VARCHAR REFERENCES circles (circle_name),
    owner_id INT REFERENCES users (id) ON DELETE CASCADE,
    image_url VARCHAR,
    post_body VARCHAR
);
       
CREATE TABLE links (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    circle_ref INT REFERENCES circles (id) ON DELETE CASCADE
  );

INSERT INTO users (username, email, avatar)
    VALUES ('narutolover', 'uzumaki56@gmail.com', 'http://localhost:3030/images/avatar/naruto.png'),
           ('nenmaster15', 'issacnetero@hotmail.com', 'http://localhost:3030/images/avatar/netero.jpg'),
           ('cutenavi', 'myonepiece@gmail.com', 'http://localhost:3030/images/avatar/nami.png'),
           ('ladiesman47', 'zenitsuagatsuma@gmail.com', 'http://localhost:3030/images/avatar/zenitsu.jpg'),
           ('noinsidevoice', 'cloverasta@yahoo.com', 'http://localhost:3030/images/avatar/asta.jpeg'),
           ('senzueater11', 'songoku@gmail.com', 'http://localhost:3030/images/avatar/goku.jpg'),
           ('alchemynoob', 'eelric@gmail.com', 'http://localhost:3030/images/avatar/edward.jpg'),
           ('therealdemonslayer', 'sango223@gmail.com', 'http://localhost:3030/images/avatar/sango.png'),
           
           ('doubledribble', 'flopharden@yahoo.com', 'http://localhost:3030/images/avatar/harden.jpg'),
           ('kingjames', 'lebronclevland45@gmail.com', 'http://localhost:3030/images/avatar/lebron.jpg'),
           ('nopassing', 'kobeeee@gmail.com', 'http://localhost:3030/images/avatar/kobe.jpg'),
           ('onlythrees', 'chefcurry@hotmail.com', 'http://localhost:3030/images/avatar/curry.jpg'),
           ('foreverknicks', 'reddhook@hotmail.com', 'http://localhost:3030/images/avatar/carmelo.jpeg'),
           ('thunderfan22', 'westbrick@gmail.com', 'http://localhost:3030/images/avatar/westbrook.jpg'),

           ('rpggamer432', 'chrono34@gmail.com', 'http://localhost:3030/images/avatar/chrono.jpg'),
           ('theprincess', 'toadstool@gmail.com', 'http://localhost:3030/images/avatar/peach.png'),
           ('masterchief', 'halomaster@gmail.com', 'http://localhost:3030/images/avatar/master_chief.jpg'),
           ('precursororb4', 'jakanddax55@gmail.com', 'http://localhost:3030/images/avatar/jak.jpg'),
           ('tombraider', 'lauracroft94@gmail.com', 'http://localhost:3030/images/avatar/laura.jpg'),
           ('1000hadoukens', 'sfryu@gmail.com', 'http://localhost:3030/images/avatar/ryu.jpg'),
           ('whereiszelda', 'triforce45@gmail.com', 'http://localhost:3030/images/avatar/link.jpg');

INSERT INTO circles (circle_name, leader_id, circle_description)
    VALUES ('Anime Haven', 2, 'A place for all those who enjoy Anime'),
           ('Sports Center', 10, 'A group of elite sports fans'),
           ('Gamers United', 17, 'A band of friendly gamers');

INSERT INTO posts (circle_id, owner_id, image_url, post_body, post_circle)
    VALUES (1, 1, './public/images/pictures/naruto_post_1.gif', 'How fast do you guys think naruto can run?', 'Anime Haven'),
           (1, 2, './public/images/pictures/netero_post_1.jpg', 'Killa and Gon are almost like siblings to each other', 'Anime Haven'),
           (1, 4, './public/images/pictures/zenitsu_post_1.jpg', 'Should I get this figure of Tanjiro?', 'Anime Haven'),

           (2, 10, './public/images/pictures/lebron_post_1.gif', 'My face when people say lebron is not the GOAT', 'Sports Center'),
           (2, 13, './public/images/pictures/carmelo_post_1.jpg', 'I miss carmelo being on the Knicks...', 'Sports Center'),

           (3, 17, './public/images/pictures/chief_post_1.jpg', 'Who is ready for Halo Infinite?!!', 'Gamers United'),
           (3, 15, './public/images/pictures/chrono_post_1.jpg', 'I NEED a new golden sun game to drop', 'Gamers United'),
           (3, 20, './public/images/pictures/ryu_post_1.jpg', 'Tokido is one of the most impressive Akuma players, he always plays at an insane level', 'Gamers United');

INSERT INTO links (user_id, circle_ref)
    VALUES(1,1), (2,1), (3,1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 2), (10, 2),
      (11, 2), (12, 2), (13, 2), (14, 2), (15, 3), (16, 3), (17, 3), (18, 3), (19, 3 ), (20, 3);



             
           
