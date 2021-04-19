# Social-Network
Création d'un réseau sociale avec le back-end en Node.js et le front-end en React.

## Back-end


### Base de données:
Utilisation du No-sql pour ce project:

#### MongoDB:
Telecharger MongoDB sur votre PC créer un project et récuperer le lien de connexion fournie lors de la création .
Installer le module mongoose (npm) et configurer la connexion.
path : ./config/db.js
##### Création des models (type de donnée DB):
Créer des object bien précie des type de donnée a sauvegarder dans la base de donnée.
path : ./models


### Serveur/Api:

#### Express:
Installer le module Express (npm).

#### Body-parser:

#### jwt:
Ce module me permet de créer un token gràce à une clé privée que je crée moi même et que je stocke dans mon fichier .env. Ainsi en naviguant dans mon site chaque users a un token qui s'expire à x temps.
Je définie moi même la durée x .


#### Cookie-parser:


### Bcrypt :
Ce module me pemet de crypter le mot de passe pour qu'il ne soit pas visible .


### Middleware :
Je met en place une vérification des token (fonction checkUser) qui se déclenche à chaque requete sur l'API (chaque route).
path : ./middleware/auth.middleware.js


### Controllers : 
La base du fonctionnement du Back est codé dans ce dossier contenant l'authentification, les proprietés Utilisateurs, Publication et Téléchargement d'une image.


### Utils : 
Dans ce dossier je traite certaine erreurs avec des fontions spécifique.