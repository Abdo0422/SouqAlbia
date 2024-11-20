CREATE DATABASE Souq_Albia;
USE Souq_Albia;

CREATE TABLE Utilisateur (
    id_utilisateur INT PRIMARY KEY,
    nom VARCHAR(255),
    email VARCHAR(255),
    mot_de_passe VARCHAR(255)
);

CREATE TABLE Produit (
    id_produit INT PRIMARY KEY,
    nom VARCHAR(255),
    description TEXT,
    prix_initial FLOAT,
    etat VARCHAR(255)
);

CREATE TABLE Enchere (
    id_enchere INT PRIMARY KEY,
    id_produit INT,
    id_vendeur INT,
    prix_actuel FLOAT,
    date_fin DATE,
    etat VARCHAR(255),
    FOREIGN KEY (id_produit) REFERENCES Produit(id_produit),
    FOREIGN KEY (id_vendeur) REFERENCES Utilisateur(id_utilisateur)
);
