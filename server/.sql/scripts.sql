CREATE DATABASE dDB

CREATE TABLE Country((
	[id] [int] NOT NULL,
	[name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)))

CREATE TABLE Manager(
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Manager] PRIMARY KEY CLUSTERED 
(
	[id] ASC
))

CREATE TABLE Crypto(
	[id] [int] IDENTITY(1,1) NOT NULL,
	[symbol] [nvarchar](max) NOT NULL,
	[name] [nvarchar](max) NOT NULL,
	[value] [money] NOT NULL,
 CONSTRAINT [PK_Crypto] PRIMARY KEY CLUSTERED 
(
	[id] ASC
))

CREATE TABLE User(
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](max) NOT NULL,
	[country_id] [int] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
))

ALTER TABLE User  WITH CHECK ADD  CONSTRAINT [FK_UserCountry] FOREIGN KEY([country_id])
REFERENCES Country ([id])

ALTER TABLE User CHECK CONSTRAINT [FK_UserCountry]


CREATE TABLE  [UserCrypto](
	[user_id] [int] NOT NULL,
	[crypto_id] [int] NOT NULL
)

ALTER TABLE  [UserCrypto]  WITH CHECK ADD  CONSTRAINT [FK_Crypto] FOREIGN KEY([crypto_id])
REFERENCES  [Crypto] ([id])

ALTER TABLE  [UserCrypto] CHECK CONSTRAINT [FK_Crypto]

ALTER TABLE  [UserCrypto]  WITH CHECK ADD  CONSTRAINT [FK_User] FOREIGN KEY([user_id])
REFERENCES  [User] ([id])

ALTER TABLE  [UserCrypto] CHECK CONSTRAINT [FK_User]

CREATE TABLE  [CountryCurrency](
	[country_id] [int] NOT NULL,
	[crypto_id] [int] NOT NULL
)
ALTER TABLE  [CountryCurrency]  WITH CHECK ADD  CONSTRAINT [FK_Country] FOREIGN KEY([country_id])
REFERENCES  [Country] ([id])

ALTER TABLE  [CountryCurrency] CHECK CONSTRAINT [FK_Country]

ALTER TABLE  [CountryCurrency]  WITH CHECK ADD  CONSTRAINT [FK_Currency] FOREIGN KEY([crypto_id])
REFERENCES  [Crypto] ([id])

ALTER TABLE  [CountryCurrency] CHECK CONSTRAINT [FK_Currency]

CREATE TABLE  [CryptoManager](
	[manager_id] [int] NOT NULL,
	[crypto_id] [int] NOT NULL
)

ALTER TABLE  [CryptoManager]  WITH CHECK ADD  CONSTRAINT [FK_CryptoM] FOREIGN KEY([crypto_id])
REFERENCES  [Crypto] ([id])

ALTER TABLE  [CryptoManager] CHECK CONSTRAINT [FK_CryptoM]

ALTER TABLE  [CryptoManager]  WITH CHECK ADD  CONSTRAINT [FK_Manager] FOREIGN KEY([manager_id])
REFERENCES  [Manager] ([id])

ALTER TABLE  [CryptoManager] CHECK CONSTRAINT [FK_Manager]


CREATE TABLE  [CountryManager](
	[manager_id] [int] NOT NULL,
	[country_id] [int] NOT NULL
)

ALTER TABLE  [CountryManager]  WITH CHECK ADD  CONSTRAINT [FK_CountryManager] FOREIGN KEY([country_id])
REFERENCES  [Country] ([id])

ALTER TABLE  [CountryManager] CHECK CONSTRAINT [FK_CountryManager]

ALTER TABLE  [CountryManager]  WITH CHECK ADD  CONSTRAINT [FK_ManagerCountry] FOREIGN KEY([manager_id])
REFERENCES  [Manager] ([id])   

ALTER TABLE  [CountryManager] CHECK CONSTRAINT [FK_ManagerCountry]


CREATE VIEW  [CryptosFromUsers]
AS
SELECT DISTINCT dbo.[User].id AS user_id, dbo.Crypto.id, dbo.Crypto.symbol, dbo.Crypto.name, dbo.Crypto.value
FROM     dbo.[User] INNER JOIN
                  dbo.UserCrypto ON dbo.[User].id = dbo.UserCrypto.user_id INNER JOIN
                  dbo.Crypto ON dbo.UserCrypto.crypto_id = dbo.Crypto.id

CREATE VIEW  [AllowedCryptosCountry]
AS
SELECT DISTINCT TOP (100) PERCENT dbo.Crypto.id, dbo.Crypto.symbol, dbo.Crypto.name, dbo.Crypto.value, dbo.Country.id AS countryid
FROM     dbo.Country INNER JOIN
                  dbo.CountryCurrency ON dbo.Country.id = dbo.CountryCurrency.country_id INNER JOIN
                  dbo.Crypto ON dbo.CountryCurrency.crypto_id = dbo.Crypto.id