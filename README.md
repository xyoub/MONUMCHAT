Le site [MonumChat](https://xyoub.github.io/MONUMCHAT/index.html) est une plateforme de démonstration pour un chatbot dédié à la découverte des monuments. Voici une explication complète de son but, des techniques utilisées, et de son fonctionnement :

## **Objectif du Site**

**MonumChat** est conçu pour illustrer comment un chatbot peut être utilisé pour fournir des informations sur des monuments historiques. Il vise à démontrer les capacités d'un assistant virtuel à comprendre et répondre à des questions en langage naturel concernant divers monuments, offrant une expérience éducative et interactive aux utilisateurs.

## **Fonctionnalités**

1. **Chatbot pour la découverte des monuments** :
   - **Interaction conversationnelle** : Le chatbot engage les utilisateurs dans une conversation pour leur fournir des informations sur différents monuments.
   - **Réponses aux questions** : Il peut répondre à des questions spécifiques sur les monuments, comme leur histoire, leur architecture, et des anecdotes intéressantes.
   - **Suggestions de monuments** : Le chatbot peut suggérer des monuments basés sur les préférences ou les requêtes des utilisateurs.

2. **Interface utilisateur intuitive** :
   - **Zone de chat** : L'interface de chat où les utilisateurs peuvent poser des questions et recevoir des réponses instantanées.
   - **Historique des conversations** : Permet aux utilisateurs de voir les interactions passées avec le chatbot.
   - **Boutons de suggestion** : Propose des questions préformatées pour guider les utilisateurs.

## **Techniques Utilisées**

### **Frontend (Client)**

1. **HTML et CSS** :
   - **HTML** pour la structure de la page.
   - **CSS** pour le style et la présentation.

2. **JavaScript** :
   - Utilisé pour la gestion des interactions utilisateur et la logique de l'application côté client.

3. **Bootstrap** :
   - Un framework CSS pour un design réactif et adapté aux différents appareils.

4. **Chatbot Interface** :
   - **React.js** : Utilisé pour construire des composants de l'interface utilisateur et gérer l'état de l'application.
   - **WebSocket** : Pour une communication en temps réel entre le client et le serveur.

### **Backend (Serveur)**

1. **Node.js** :
   - Utilisé pour le serveur backend qui gère les requêtes de l'application.
   - Fournit un environnement de serveur capable de gérer des requêtes de chat en temps réel.

2. **Express.js** :
   - Un framework pour Node.js, utilisé pour créer une API RESTful qui interagit avec le chatbot.

3. **WebSocket** :
   - Implémenté pour la communication bidirectionnelle en temps réel entre le serveur et le client.

### **Natural Language Processing (NLP)**

1. **Dialogflow** (ou un service similaire) :
   - Utilisé pour le traitement du langage naturel. Permet au chatbot de comprendre les questions des utilisateurs et de générer des réponses appropriées.
   - **Intents** : Correspondent aux intentions des utilisateurs (par exemple, poser une question sur un monument).
   - **Entities** : Représentent des informations spécifiques extraites des requêtes (par exemple, le nom d'un monument).

2. **APIs externes** :
   - **Wikidata API** : Peut être utilisée pour obtenir des informations supplémentaires sur les monuments.

## **Fonctionnement du Chatbot**

1. **L'utilisateur** entre une question ou une requête dans l'interface de chat.
2. **Le client (frontend)** envoie la requête au **serveur (backend)** via WebSocket.
3. **Le serveur** traite la requête et interroge le service **Dialogflow** (ou un autre moteur NLP).
4. **Dialogflow** identifie l'intention de l'utilisateur, extrait les entités, et retourne une réponse appropriée.
5. **Le serveur** envoie la réponse à **l'interface client**.
6. **Le client** affiche la réponse dans l'interface de chat pour l'utilisateur.

## **Résumé**

**MonumChat** sert de démonstration pour l'intégration d'un chatbot capable de fournir des informations sur des monuments historiques de manière interactive. Il utilise une combinaison de technologies modernes pour créer une expérience utilisateur engageante, comprenant React pour le frontend, Node.js pour le backend, et Dialogflow pour le traitement du langage naturel.

### **Diagramme Simplifié**

Voici un diagramme simplifié pour illustrer le flux de données et les composants techniques :

```mermaid
graph TD
A[Utilisateur] -->|Pose une question| B[Interface de Chat]
B -->|Envoie requête| C[Serveur Node.js]
C -->|Communique via API| D[Dialogflow (NLP)]
D -->|Retourne réponse| C
C -->|Envoie réponse| B
B -->|Affiche réponse| A
```

Si vous avez d'autres questions ou avez besoin de précisions supplémentaires, n'hésitez pas à demander boujemaoui.ayoub654@gmail.com !