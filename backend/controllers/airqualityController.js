const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Funzione per registrare un nuovo utente
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica se l'utente esiste già
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Utente già registrato' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creazione del nuovo utente
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Salvataggio dell'utente nel database
    await newUser.save();

    res.status(201).json({ message: 'Utente registrato con successo' });
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
};

// Funzione per l'accesso dell'utente
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se l'utente esiste
    const user = await User.findOne({ username: email });
    if (!user) {
      return res.status(401).json({ message: 'Email non valida' });
    }

    // Verifica della password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    // Genera un token JWT per l'utente
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Salva il token nel modello User
    user.token = token;
    await user.save();

    res.status(200).json({ token });
  } catch (error) {
    console.error('Errore durante l\'accesso:', error);
    res.status(500).json({ message: 'Errore durante l\'accesso' });
  }
};




