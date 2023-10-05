CREATE DATABASE IF NOT EXISTS MyRadio;

USE MyRadio;

CREATE TABLE IF NOT EXISTS User(
	User_id INT AUTO_INCREMENT PRIMARY KEY,
    User_name VARCHAR(30) NOT NULL,
    User_email VARCHAR(50) NOT NULL,
    UNIQUE (User_name),
    UNIQUE (User_email)
);

CREATE TABLE IF NOT EXISTS Genre(
	Genre_id INT AUTO_INCREMENT PRIMARY KEY,
    Genre_name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Artist(
	Artist_id INT AUTO_INCREMENT PRIMARY KEY,
    Artist_name VARCHAR(30) NOT NULL,
    Artist_debut VARCHAR(4) NOT NULL,
    UNIQUE (Artist_name)
);

CREATE TABLE IF NOT EXISTS Album(
	Album_id INT AUTO_INCREMENT PRIMARY KEY,
    Album_name VARCHAR(50) NOT NULL,
    Album_release VARCHAR(4) NOT NULL,
    Artist_id INT NOT NULL,
    Genre_id INT NOT NULL,
    FOREIGN KEY (Artist_id) REFERENCES Artist (Artist_id),
    FOREIGN KEY (Genre_id) REFERENCES Genre (Genre_id)
);

CREATE TABLE IF NOT EXISTS Music(
	Music_id INT AUTO_INCREMENT PRIMARY KEY,
    Music_name VARCHAR(30) NOT NULL,
    Album_id INT NOT NULL,
    Artist_id INT NOT NULL,
    FOREIGN KEY (Album_id) REFERENCES Album (Album_id),
    FOREIGN KEY (Artist_id) REFERENCES Artist (Artist_id)
);

CREATE TABLE IF NOT EXISTS User_album(
    User_id INT NOT NULL,
    Album_id INT NOT NULL,
    CONSTRAINT PRIMARY KEY(User_id, Album_id),
    FOREIGN KEY (User_id) REFERENCES User (User_id),
    FOREIGN KEY (Album_id) REFERENCES Album (Album_id)
);

INSERT INTO User(User_name, User_email)
	VALUES('caio-cmc', 'caiocsr@mock.com'),
	('fulano123', 'fulano@mock.com'),
    ('ciclanoTren', 'anabolinho@mock.com'),
    ('Testovaldo-Rex', 'testovaldosilva@mock.com'),
    ('RegisTadeu', 'eiregisvtncopo@mock.com');
    
INSERT INTO Genre(Genre_name)
	VALUES('Heavy Metal'),
    ('Power Metal'),
    ('Pop'),
    ('MPB'),
    ('Samba'),
    ('Pagode'),
    ('Rock'),
    ('Rap');
    
INSERT INTO Artist(Artist_name, Artist_debut)
	VALUES('Seu Jorge', '1998'),
    ('Wind Rose', '2009'),
    ('Iron Maiden', '1975'),
    ('Caetano Veloso', '1965'),
    ('Zeca Pagodinho', '1977'),
    ('Kanye West', '1996'),
    ('Lady Gaga', '2005'),
    ('Ke$ha', '2009'),
    ('Sabaton', '1999'),
    ('Blind Guardian', '1987'),
    ('Manowar', '1980'),
    ('Journey', '1973'),
    ('Queen', '1970'),
    ('The Beatles', '1960');
    
INSERT INTO Album(Album_name, Album_release, Artist_id, Genre_id)
	VALUES('Heroes', '2014', 9, 2),    
    ('The Number of the Beast', '1982', 3, 1),
    ('The Beatles (White Album)', '1968', 14, 7),
    ('Imaginations from the Other Side', '1995', 10, 2),
    ('Músicas para Churrasco, Vol. 1', '2011', 1, 4),
    ('Powerslave', '1984', 3, 1),
    ('Animal', '2010', 8, 3),
    ('Battalions of Fear', '1988', 10, 2),
    ('Born This Way', '2011', 7, 3),
    ('Escape', '1981', 12, 7),
    ('News of the World', '1977', 13, 7),
    ('Watch the Throne', '2011', 6, 8),
    ('Fighting the World', '1987', 11, 1),
    ('Wintersaga', '2019', 2, 2),
    ('Abbey Road', '1969', 14, 7),
    ('The Great War', '2019', 9, 2),
    ('A Night at the Opera', '1975', 13, 7),
    ('Prenda Minha', '1998', 4, 4),
    ('Frontiers', '1983', 12, 7),
    ('Kings of Metal', '1988', 11, 1),
    ('Acústico MTV: Zeca Pagodinho', '2003', 5, 5),
    ('The Fame Monster', '2009', 7, 3);
    
INSERT INTO Music(Music_name, Album_id, Artist_id)
	VALUES('Night Witches', 1, 9),
    ('To Hell and Back', 1, 9),
    ('Children of the Damned', 2, 3),
    ('Hallowed Be Thy Name', 2, 3),
    ('Back in the U.S.S.R.', 3, 14),
    ('While My Guitar Gently Weeps', 3, 14),
    ("I'm Alive", 4, 10),
    ('The Script for My Requiem', 4, 10),
    ('Amiga da Minha Mulher', 5, 1),
    ('Japonesa', 5, 1),
    ('Rime of the Ancient Mariner', 6, 3),
    ('Aces High', 6, 3),
    ('Tik Tok', 7, 8),
    ('Your Love Is My Drug', 7, 8),
    ('Majesty', 8, 10),
    ('Battalions of Fear', 8, 10),
    ('Judas', 9, 7),
    ('Born This Way', 9, 7),
    ("Don't Stop Believin'", 10, 12),
    ('Open Arms', 10, 12),
    ('Sheer Heart Attack', 11, 13),
    ('We Are the Champions', 11, 13),
    ('Lift Off', 12, 6),
    ('Niggas in Paris', 12, 6),
    ('Defender', 13, 11),
    ('Black Wind, Fire and Steel', 13, 11),
    ('Diggy Diggy Hole', 14, 2),
    ('Mine Mine Mine!', 14, 2),
    ('Come Together', 15, 14),
    ('Here Comes the Sun', 15, 14),
    ('The Red Baron', 16, 9),
    ('Fields of Verdun', 16, 9),
    ('Bohemian Rhapsody', 17, 13),
    ('Love Of My Life', 17, 13	),
    ('Odara', 18, 4),
    ('Sozinho', 18, 4),
    ('Faithfully', 19, 12),
    ('Separate Ways (Worlds Apart)', 19, 12),
    ('Hail and Kill', 20, 11),
    ('Kingdom Come', 20, 11),
    ('O Penetra', 21, 5),
    ('Maneco Telecoteco', 21, 5),
    ('Alejandro', 22, 7),
    ('Bad Romance', 22, 7);
    
INSERT INTO User_album(User_id, Album_id)
	VALUES(1, 1),
    (1, 2),
    (1, 4),
    (1, 5),
    (1, 6),
    (2, 5),
    (2, 9),
    (2, 18),
    (2, 22),
    (3, 8),
    (3, 14),
    (3, 21),
    (4, 11),
    (4, 12),
    (4, 15),
    (4, 21),
    (5, 13),
    (5, 20);