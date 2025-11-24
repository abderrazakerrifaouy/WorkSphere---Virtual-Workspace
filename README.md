# WorkSphere---Virtual-Workspace 
Application web interactive pour la gestion visuelle du personnel dans un espace de travail.


## 📌 Contexte du projet  
L’entreprise **WorkSphere** souhaite disposer d’une application web innovante dédiée à la **gestion visuelle et interactive du personnel** au sein de ses espaces de travail.

L’objectif principal est de faciliter l’organisation et la répartition des employés sur un **plan d’étage en temps réel**, tout en respectant les règles métier liées aux rôles et zones autorisées.


## 🎯 Objectifs généraux  
- Permettre l’ajout, le déplacement et la suppression d’employés directement depuis une interface graphique.  
- Assurer le respect des règles métier : chaque employé ne peut occuper que les zones compatibles avec son rôle.  
- Offrir une interface fluide, intuitive et responsive (Desktop, Mobile, Tablette).  
- Centraliser la gestion du personnel dans une plateforme unique et visuelle.


  ## 👥 User Stories

  ### 🔹 Développement Front-End  
- Créer la structure HTML avec une sidebar contenant la liste “Unassigned Staff” et un bouton “Add New Worker”.  
- Développer la modale d’ajout d’employé avec :  
  - Nom  
  - Rôle  
  - Photo (URL)  
  - Email  
  - Téléphone  
  - Expériences professionnelles (liste dynamique).  
- Implémenter la prévisualisation de la photo.  
- Valider les informations via **REGEX**.  
- Valider que la date de début d’expérience < date de fin.


### 🔹 Plan d’étage & Règles d’accès  
Afficher un plan comprenant 6 zones :  
1. Salle de conférence  
2. Réception  
3. Salle des serveurs  
4. Salle de sécurité  
5. Salle du personnel  
6. Salle d’archives


#### ⚠️ Restrictions selon les rôles  
| Zone | Rôles autorisés |
|------|-----------------|
| Réception | Réceptionnistes uniquement |
| Salle des serveurs | Techniciens IT uniquement |
| Salle de sécurité | Agents de sécurité uniquement |
| Manager | Accès à toutes les zones |
| Nettoyage | Toutes sauf Salle d’archives |
| Autres | Accès libre sauf zones restreintes |

### 🔹 Interactions utilisateur  
- Ajouter un bouton **X** sur chaque employé pour le retirer d’une zone.  
- Afficher un **profil détaillé** lors du clic (photo, infos, expériences, localisation).  
- Ajouter un bouton **+** dans chaque zone pour assigner un employé compatible.  
- Mettre en évidence les zones obligatoires vides en **rouge pâle**.  
- Limiter le **nombre d’employés par zone**.  
- Assurer un design responsive et animations CSS fluides.  
- Valider le HTML & CSS via **W3C Validator**.

### 🔹 Gestion de projet (Scrum Master)  
- Utiliser Jira  pour gérer les User Stories.  
- Organiser les branches Git (optionnel).  
- Présenter le projet final avec démonstration des fonctionnalités dynamiques. 
- Publier le projet sur **GitHub Pages ou Vercel**.

## 🧱 Technologies utilisées  
- **HTML5**, **CSS3**, **JavaScript**, **TypeScript**  
- **Flexbox**, **CSS Grid**, animations CSS  
- **LocalStorage** pour la persistance  
- **GitHub Pages / Vercel** pour le déploiement  
