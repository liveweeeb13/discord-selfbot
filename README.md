# Discord CobaBot - SelfBot 
v1.1.0

## 🔰 Introduction

CobaBot est un selfbot développé en **Node.js**, avec un système de **préfixe personnalisable**, un **système de logs** complet, et bien d'autres fonctionnalités utiles.

### ⛔ ATTENTION

L'utilisation d’un selfbot est strictement interdite par les conditions d'utilisation (TOS) de Discord.
En l’utilisant, vous vous exposez à un <u>**bannissement définitif**</u> de votre compte.
Utilisez ce projet à vos propres risques.

---

## ⚙️ Installation

### 1. **Clonez le dépôt**

```bash
git clone https://github.com/liveweeeb13/discord-selfbot.git
```

### 2. **Accédez au dossier**

```bash
cd discord-selfbot
```

<<<<<<< HEAD
Puis renommer `example.config.json` en `config.json`
=======
### 3. **Installation des dépendances**
>>>>>>> 5dc64a402053c37dfa797ce7be5550c1ba61b251

Sur **Linux/macOS** faite simplement: `mv example.config.json config.json`, pour modifier vous pouvez aussi faire `nano config.json` dans le terminal.

### 3. **Installation des dépendances**

<<<<<<< HEAD
* Sur **Windows** : Il vous suffit d’exécuter le fichier `start.bat` (il installera automatiquement les dépendances).

* Sur **Linux/macOS** : Vous devriez faire `chmod +x ./start.sh` (faire que ça soit exécutable) puis `./start.sh` (il installera automatiquement les dépendances).

### 4. **Configuration**

Voici le fichier `config.json` :

```json
{
    "prefix": "!",                  // Préfixe des commandes
    "wt": "1000",                  // Temps d'attente avant l'exécution d'une commande (en ms)
    "just_usable_by_me": false,   // Si true, seuls les utilisateurs avec les ID définis pourront utiliser le bot
    "authorized_id": [""],       // Liste d'’ID Discord autorisé (si just_usable_by_me est true)
    "admin_id": [""]            // Liste des administrateurs autorisés à utiliser les commandes critiques
}
```

Et voici le fichier `sensibles.json` :

```json
{
    "token": "TOKEN"       // Le token de votre compte
}
```

**🎫 Comment récupérer votre token Discord**

> ⚠️ **Avertissement :** Le token de votre compte Discord est une **information sensible**. **Ne le partagez jamais** avec qui que ce soit. L'utilisation d'un token dans un selfbot enfreint les [Conditions d'utilisation de Discord](https://discord.com/terms) et peut entraîner un bannissement définitif de votre compte.

**Étapes pour récupérer votre token :**

1. Ouvrez Discord.
2. Appuyez sur `CTRL + SHIFT + I` pour ouvrir les outils développeur.
3. Cliquez sur l’onglet **Console**.
4. Copiez-collez le code suivant dans la console et appuyez sur **Entrée** :

```js
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    if (!req.c) return;
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
```

### 5. **Lancement du bot**

* Sur **Windows** : Relancez simplement `start.bat`.

* Sur **Linux/macOS** : Relancez simplement `start.sh`.

=======
```bash
npm install
```  


### 4. **Configuration**

Voici le fichier `config.json` :

```json
{
    "prefix": "!",                  // Préfixe des commandes
    "wt": "1000",                  // Temps d'attente avant l'exécution d'une commande (en ms)
    "just_usable_by_me": false,   // Si true, seul l’utilisateur avec l’ID défini peut utiliser le bot
    "authorized_id": [""],       // Liste d'’ID Discord autorisé (si just_usable_by_me est true)
    "admin_id": [""]            // Liste des administrateurs autorisés à utiliser les commandes critiques
}
```
Et voici le fichier `sensibles.json` :
```json
{
    "token": "TOKEN"       // Le token de votre compte
}
```

**🎫 Comment récupérer votre token Discord**

> ⚠️ **Avertissement :** Le token de votre compte Discord est une **information sensible**. Ne le partagez **jamais** avec qui que ce soit. L'utilisation d'un token dans un selfbot enfreint les [Conditions d'utilisation de Discord](https://discord.com/terms) et peut entraîner un bannissement permanent de votre compte.

**Étapes pour récupérer votre token :**

1. Ouvrez Discord.
2. Appuyez sur `CTRL + SHIFT + I` pour ouvrir les outils développeur.
3. Cliquez sur l’onglet **Console**.
4. Copiez-collez le code suivant dans la console et appuyez sur **Entrée** :
```js
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    if (!req.c) return;
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
```

### 5. **Lancement du bot**

* Sur **Windows** : relancez simplement `start.bat`.

* Sur **Linux/macOS** :

```bash
node main.js
```

ou

```bash
npm run start
```
>>>>>>> 5dc64a402053c37dfa797ce7be5550c1ba61b251
---

## 🧯 Dépannage

Si vous rencontrez un problème :

1. Vérifiez les messages affichés dans la console
2. Assurez-vous que **Node.js** est bien installé
3. Vérifiez que le fichier `config.json` et `sensibles.json` sont correctement remplis
4. Si le problème persiste, [ouvrez une issue ici](https://github.com/liveweeeb13/discord-selfbot/issues/new)

---

## ❗ Clause de non-responsabilité
Ce projet a été développé à des fins éducatives uniquement.
Je ne cautionne en aucun cas les usages abusifs.
<u>L'utilisateur est entièrement responsable de ses actions et de l'utilisation qu’il fait de ce selfbot.</u>

---

## 🙏 Remerciements et conclusion

Merci à **[Clovis S.](https://exoo-cloud.fr/)** pour l’idée de ce projet.

Merci a **[BefAci](https://github.com/befaci03)** pour son aide au développement

<br>Ce selfbot reste un projet à but **éducatif** et **personnel**, à utiliser avec précaution.

📩 Une suggestion ?

🐞 Un bug ?

❓ Une question ?

➡️ N’hésitez pas à [ouvrir une issue](https://github.com/liveweeeb13/discord-selfbot/issues), votre retour est toujours le bienvenu.

<br><br>Merci d’avoir lu jusqu’ici et bonne utilisation à vous ! 🚀
