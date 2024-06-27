# **MonumChat**

Bienvenue sur **MonumChat**, une plateforme de démonstration pour un chatbot dédié à la découverte des monuments historiques.

## **Objectif du Site**

**MonumChat** est conçu pour illustrer l'utilisation d'un chatbot dans la fourniture d'informations sur des monuments historiques. Le but est de démontrer comment un assistant virtuel peut comprendre et répondre à des questions en langage naturel concernant divers monuments, offrant ainsi une expérience éducative et interactive aux utilisateurs.

## **Fonctionnalités**

### 1. **Chatbot pour la découverte des monuments**
- **Interaction conversationnelle** : Engage les utilisateurs dans une conversation pour fournir des informations sur différents monuments.
- **Réponses aux questions** : Capable de répondre à des questions spécifiques sur l'histoire, l'architecture et des anecdotes intéressantes concernant les monuments.
- **Suggestions de monuments** : Propose des monuments basés sur les préférences ou les requêtes des utilisateurs.

### 2. **Interface utilisateur intuitive**
- **Zone de chat** : Permet aux utilisateurs de poser des questions et de recevoir des réponses instantanément.
- **Historique des conversations** : Affiche les interactions passées avec le chatbot.
- **Boutons de suggestion** : Propose des questions préformatées pour guider les utilisateurs.

## **Techniques Utilisées**

### **Frontend (Client)**
- **HTML et CSS** : Utilisés pour la structure de la page et le style.
- **JavaScript** : Gère les interactions utilisateur et la logique de l'application côté client.
- **Bootstrap** : Framework CSS pour un design réactif adapté à différents appareils.
- **React.js** : Construction des composants de l'interface utilisateur et gestion de l'état de l'application.
- **WebSocket** : Communication en temps réel entre le client et le serveur.

### **Backend (Serveur)**
- **Node.js** : Serveur backend qui gère les requêtes de l'application et prend en charge les interactions de chat en temps réel.
- **Express.js** : Framework pour Node.js utilisé pour créer une API RESTful interagissant avec le chatbot.
- **WebSocket** : Implémenté pour la communication bidirectionnelle en temps réel entre le serveur et le client.

### **Natural Language Processing (NLP)**
- **Dialogflow** (ou un service similaire) : Utilisé pour le traitement du langage naturel, permettant au chatbot de comprendre et de répondre aux questions des utilisateurs.
  - **Intents** : Représentent les intentions des utilisateurs (par exemple, poser une question sur un monument).
  - **Entities** : Informations spécifiques extraites des requêtes (par exemple, le nom d'un monument).
- **APIs externes** : Utilisation possible de la **Wikidata API** pour obtenir des informations supplémentaires sur les monuments.

## **Fonctionnement du Chatbot**

1. **L'utilisateur** entre une question ou une requête dans l'interface de chat.
2. **Le client (frontend)** envoie la requête au **serveur (backend)** via WebSocket.
3. **Le serveur** traite la requête et interroge le service **Dialogflow** (ou un autre moteur NLP).
4. **Dialogflow** identifie l'intention de l'utilisateur, extrait les entités, et retourne une réponse appropriée.
5. **Le serveur** envoie la réponse à **l'interface client**.
6. **Le client** affiche la réponse dans l'interface de chat pour l'utilisateur.

## **Résumé**

**MonumChat** sert de démonstration pour l'intégration d'un chatbot capable de fournir des informations sur des monuments historiques de manière interactive. Il utilise une combinaison de technologies modernes pour créer une expérience utilisateur engageante, comprenant React pour le frontend, Node.js pour le backend, et Dialogflow pour le traitement du langage naturel.

## **Diagramme Simplifié**

```mermaid
graph TD
  A[Utilisateur] -->|Pose une question| B[Interface de Chat]
  B -->|Envoie requête| C[Serveur Node.js]
  C -->|Communique via API| D[Dialogflow (NLP)]
  D -->|Retourne réponse| C
  C -->|Envoie réponse| B
  B -->|Affiche réponse| A
```

Pour toute question ou besoin de précisions supplémentaires, n'hésitez pas à me contacter à [Boujemaoui.Ayoub654@gmail.com](mailto:Boujemaoui.Ayoub654@gmail.com).


