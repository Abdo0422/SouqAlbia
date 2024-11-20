# Souq_Albia : Plateforme d'enchères en ligne  

**Souq_Albia** est une plateforme d'enchères en ligne complète conçue pour faciliter la mise en vente et les enchères de produits. Le projet repose sur un **frontend développé avec Angular** et un **backend basé sur PHP**, offrant une expérience utilisateur fluide et dynamique.  

## Structure du projet  

### Frontend (Angular)  
Situé dans le répertoire `Souq_Albia`, l'application Angular fournit une interface conviviale pour naviguer, enchérir et gérer les enchères. Les principales fonctionnalités incluent :  

- **Panneau d'administration** (`src/app/admin`) :  
  Permet la gestion des utilisateurs, des enchères et des catégories.  

- **Authentification** (`src/app/authentication`) :  
  Gère la connexion, l'inscription et l'authentification des utilisateurs.  

- **Espace utilisateur** (`src/app/EspaceUser`) :  
  Permet aux utilisateurs de consulter et gérer leurs enchères, leurs offres et leurs listes de suivi.  

- **Popup de liste de suivi** (`src/app/watchlist-popup`) :  
  Permet de suivre les produits favoris.  

- **Services partagés** (`src/app/services`) :  
  Fournit des services réutilisables pour la gestion des données et la communication avec le backend.  

### Backend (PHP)  
Situé dans le répertoire `Souq_AlbiaBackend`, le backend prend en charge les fonctionnalités suivantes :  

- **Gestion des utilisateurs** :  
  Inscription, connexion, mise à jour des informations et authentification sécurisée.  

- **Gestion des enchères** :  
  Création, mise à jour, suppression et affichage des enchères.  

- **Paiements** :  
  Intégration des paiements via PayPal et Stripe pour sécuriser les transactions.  

- **Services API REST** :  
  Fournit des points d'accès pour interagir avec la base de données et gérer les données des utilisateurs, produits, catégories, et enchères.  

## Installation et utilisation  

1. **Cloner le dépôt** :  
   ```bash
   git clone <url-du-dépôt>

2. **Frontend** :
- Naviguer vers le répertoire Souq_Albia.
- Installer les dépendances Angular:
   ```bash
   npm install
- Lancer l'application :
   ```bash
   ng serve

3. **Backend** :
- Configurer la base de données en important le fichier db.sql dans votre serveur MySQL.
- Mettre à jour les informations de connexion dans connexion.php.
- Héberger les fichiers PHP sur un serveur local (par exemple, XAMPP ou WAMP).

### Fonctionnalités principales

- Parcourir les catégories et produits.
- Créer et gérer des enchères.
- Suivre les enchères en temps réel.
- Effectuer des paiements sécurisés via PayPal ou Stripe.

### Contributions

Les contributions sont les bienvenues ! Veuillez soumettre vos pull requests ou signaler des problèmes pour améliorer le projet.

### Licence
Ce projet est sous licence MIT.