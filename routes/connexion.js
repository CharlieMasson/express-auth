const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = require('../config/users.json');

router.post('/', async (req, res, next) => {

    const { email, password } = req.body;
    const DefaultErrorText = 'Email ou mot de passe invalide.';
  
    // recherche de l'utilisateur
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: DefaultErrorText });
    }
  
    // Vérification du mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: DefaultErrorText });
    }
  
    // Génération JWT
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    // stockage du jeton et de l'email de l'utilisateur en session
    req.session.token = token;
    req.session.email = user.email;
  
    res.send('Authentification réussie <a href="/">Retour à l\'accueil</a>');
  });

module.exports = router;
