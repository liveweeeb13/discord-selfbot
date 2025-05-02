# Discord CobaBot - SelfBot 
v1.0.0


## 🔰 Introduction

CobaBot est un selfbot développé en **Node.js**, avec un système de **préfixe personnalisable**, un **système de logs** complet, et bien d'autres fonctionnalités utiles .

### ⛔ ATTENTION
L'utilisation d’un selfbot est strictement interdite par les conditions d'utilisation (TOS) de Discord.
En l’utilisant, vous vous exposez à un <u>**bannissement définitif**</u> de votre compte.
Utilisez ce projet à vos propres risques.

---

## ⚙️ Installation

1. **Clonez le dépôt**

```bash
git clone https://github.com/liveweeeb13/discord-selfbot.git
```

2. **Accédez au dossier**

```bash
cd discord-selfbot
```

3. **Installation des dépendances**

* Sur **Windows** : il vous suffit d’exécuter le fichier `start.bat` (il installera automatiquement les dépendances).

* Sur **Linux/macOS** :

```bash
npm install
```

4. **Lancement du bot**

* Sur **Windows** : relancez simplement `start.bat`.

* Sur **Linux/macOS** :

```bash
node main.js
```

ou

```bash
npm run start
```

---

## 🛠️ Configuration

Voici le fichier `config.json` :

```json
{
    "token": "TOKEN",              // Votre token Discord
    "prefix": "!",                 // Préfixe des commandes
    "wt": "1000",                  // Temps d'attente avant l'exécution d'une commande (en ms)
    "just_usable_by_me": false,   // Si true, seul l’utilisateur avec l’ID défini peut utiliser le bot
    "my_id": "ID"                 // L’ID Discord autorisé (si just_usable_by_me est true)
}
```

---

## 🧯 Dépannage

Si vous rencontrez un problème :

1. Vérifiez les messages affichés dans la console
2. Assurez-vous que **Node.js** est bien installé
3. Vérifiez que le fichier `config.json` est correctement rempli
4. Si le problème persiste, ouvrez une [issue ici](https://github.com/liveweeeb13/discord-selfbot/issues)

---

## ❗ Clause de non-responsabilité
Ce projet a été développé à des fins éducatives uniquement.
Je ne cautionne en aucun cas les usages abusifs.
<u>L'utilisateur est entièrement responsable de ses actions et de l'utilisation qu’il fait de ce selfbot.</u>

Bien sûr ! Voici un paragraphe de conclusion adapté à ton README, avec un ton humain, clair, et respectueux :

---

## 🙏 Remerciements et conclusion

Merci à **[Clovis S.](https://exoo-cloud.fr/)** pour l’idée de ce projet.
Ce selfbot reste un projet à but **éducatif** et **personnel**, à utiliser avec précaution.

📩 Une suggestion ?
🐞 Un bug ?
❓ Une question ?
➡️ N’hésitez pas à ouvrir une [issue](https://github.com/liveweeeb13/discord-selfbot/issues), votre retour est toujours le bienvenu.

Merci d’avoir lu jusqu’ici et bonne utilisation à vous ! 🚀

