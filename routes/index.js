const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  let body = ''

  if (req.session.email){
    body += `<p>Bonjour, ${req.session.email}!</p>`;
  }  else {
    body += `
      <form action="/connexion" method="POST">
        <label for="email">Adresse mail:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required>
        
        <button type="submit">Se connecter</button>
      </form>
    `;
  }

  res.send(body);

});

module.exports = router;
