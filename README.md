# Social-Network
Création d'un réseau sociale avec le back-end en Node.js et le front-end en React.

![Alt text](img/socialNetwork.jpg "my-project")

## Back-end

## Techno:

- NodeJs : v10.19.0
- axios : v0.24.0
- bcrypt : v5.0.1
- body-parser : v1.19.0
- cookie-parser : v1.4.5
- cors : v2.8.5
- dotenv : v8.2.0
- express : v4.17.1
- jsonwebtoken : v8.5.1
- mongoose : v5.12.3
- nodemon : v2.0.7
- validator : v13.5.2

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
Mon API est construis avec ce module très simple à utiliser.
Pour visualiser les requetes et vérifier le bon fonctionnement de mon API j'utilise POSTMAN.

#### Body-parser:
J'utilise ce Middleware afin de lire le corp de la requête HTTP. Celui-ci me permet d'accéder à req.body et de manipuler et traiter les données qu'elle contient.

#### jwt:
Ce module me permet de créer un token gràce à une clé privée que je crée moi même et que je stocke dans mon fichier .env. Ainsi en naviguant dans mon site chaque users a un token qui s'expire à x temps.
Je définie moi même la durée x .


#### Cookie-parser:
J'utilise ce Middleware pour analyser les cookies.

### Bcrypt :
Ce module me pemet de crypter le mot de passe pour qu'il ne soit pas visible .


### Middleware :
Je met en place une vérification des token (fonction checkUser) qui se déclenche à chaque requete sur l'API (chaque route).
path : ./middleware/auth.middleware.js


### Controllers : 
La base du fonctionnement du Back est codé dans ce dossier contenant l'authentification, les proprietés Utilisateurs, Publication et Téléchargement d'une image.


### Utils : 
Dans ce dossier je traite certaine erreurs avec des fonctions spécifique.


## Frond-end

## Techno:

- js-cookie : v2.2.1
- node-sass : v4.14.1
- react : v17.0.2
- react-dom : v17.0.2
- react-redux : v7.2.4
- react-router-dom : v5.2.0
- react-scripts : 4.0.3
- reactjs-popup : v2.0.5
- redux : v4.1.0
- redux-devtools-extension : v2.13.9

### React:
Pour la partie front-end j'ai décidé de la réaliser avec React JS .

#### Les Hooks :

##### UseEffect :
Cette fonctionnalité de React nous permet d'actualiser des donnée après chaque mis à jour du DOM.
Ainsi nous pouvons lui spécifier de rappeler certaine fonction qui necessite d'être rechargé à chaque mis à jour ou actualisation.

##### UseState :
Cette fonctionnalité de React nous permet de générer un etat local d'un composant de fonction et de le mettre à jour lorsqu'on le souhaite.

##### UseSelector :
Cette fonctionnalité nous permet d'extraire des données de l'état du magasin Redux, à l'aide d'une fonction de sélection.
Les fonctions de sélection sont stocké dans le dossier Reducers: ./client/src/reducers

### Redux :
J'utilise Redux afin de stocker les résultats de mes requêtes sur l'API back-end dans des store et ensuite piocher les données dont j'ai besoin dans ces stores.

Redux est une implémentation dérivée de Flux. Ça permet de créer un Store qui contient un état, réagit à des actions dispatchées, et auquel on peut souscrire pour être notifié des changements. 
