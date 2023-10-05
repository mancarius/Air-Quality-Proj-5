const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('./airqualityController')


// Middleware per l'autenticazione dell'utente
exports.authenticate = async (req, res, next) => {
  try {
    // Verifica se c'è un token nell'header della richiesta
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Accesso non autorizzato' });
    }

    // Verifica del token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Trova l'utente nel database in base all'ID estratto dal token
    const user = await User.findById(decoded.userId);

    // Verifica se l'utente esiste
    if (!user) {
      return res.status(401).json({ message: 'Utente non autorizzato' });
    }

    // Aggiungi l'utente alla richiesta per l'uso successivo
    req.user = user;
    next();
  } catch (error) {
    console.error('Errore durante l\'autenticazione:', error);
    res.status(401).json({ message: 'Accesso non autorizzato' });
  }
};

// Funzione per aggiungere una città preferita a un utente
exports.addFavorite = async (req, res) => {
  try {
    const { city } = req.body;


    const userId = req.user.userId;

    // Verifica se l'utente esiste
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    // Aggiunge la città preferita all'array favoriteCities dell'utente
    user.favoriteCities.push(city);

    // Salva le modifiche
    await user.save();

    res.status(200).json({ message: 'Città preferita aggiunta con successo' });
  } catch (error) {
    console.error('Errore durante l\'aggiunta della città preferita:', error);
    res.status(500).json({ message: 'Errore durante l\'aggiunta della città preferita' });
  }
};

