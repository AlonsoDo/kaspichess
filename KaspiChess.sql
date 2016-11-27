
CREATE TABLE IF NOT EXISTS `autentificacion` (
  `User` varchar(20) NOT NULL,
  `PassWord` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `DateSignUp` date NOT NULL,
  `Elo` smallint(5) unsigned NOT NULL DEFAULT '1800',
  `Games` int(10) unsigned NOT NULL DEFAULT '0',
  `Wins` int(10) unsigned NOT NULL DEFAULT '0',
  `Losts` int(10) unsigned NOT NULL DEFAULT '0',
  `Draws` int(10) unsigned NOT NULL DEFAULT '0',
  `Highlight` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `Promote` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `Sound` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `MinElo` smallint(10) unsigned NOT NULL DEFAULT '1600',
  `MaxElo` smallint(10) unsigned NOT NULL DEFAULT '2800',
  `Rated` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `Ron` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `Color` varchar(6) NOT NULL DEFAULT 'Random',
  `Minutes` smallint(5) unsigned NOT NULL DEFAULT '5',
  `Seconds` smallint(5) unsigned NOT NULL DEFAULT '0',
  `Welcome` varchar(100) NOT NULL,
  `Country` varchar(2) NOT NULL,
  `Alt` varchar(50) NOT NULL,
  `Coordenadas` tinyint(1) unsigned NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `games` (
  `number` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cuando` datetime DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `mostrar` varchar(1) DEFAULT NULL,
  `whitename` varchar(20) DEFAULT NULL,
  `blackname` varchar(20) DEFAULT NULL,
  `whiteelo` smallint(5) unsigned DEFAULT NULL,
  `blackelo` smallint(5) unsigned DEFAULT NULL,
  `whiteid` varchar(40) DEFAULT NULL,
  `blackid` varchar(40) DEFAULT NULL,
  `timing` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`number`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `logfile` (
  `User` varchar(20) NOT NULL,
  `Moment` datetime NOT NULL,
  `Event` varchar(20) NOT NULL,
  `Games` int(11) NOT NULL,
  `SaveMode` varchar(12) NOT NULL,
  KEY `index_moment` (`Moment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
