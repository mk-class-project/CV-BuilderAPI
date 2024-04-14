import mongoose from 'mongoose';

const { Schema } = mongoose;

// Définir un schéma pour les entrées de tableau (utilisé dans les sections d'informations)
const TableSchema = new Schema({
    class: { type: String, required: true },
    label: [String],  // Tableau d'étiquettes
    content: [String] // Tableau correspondant de contenu
});

// Définir un schéma pour les entrées de bloc unique et de liste
const EntrySchema = new Schema({
    date: String,
    location: String,
    position: String,
    description: String
});

// Définir un schéma pour les sections qui peuvent être de plusieurs types
const SectionSchema = new Schema({
    type: { type: String, required: true, enum: ['info', 'single-block', 'listing', 'three-column'] },
    title: String, // Utilisé dans les sections de bloc unique, de liste et de trois colonnes
    name: String, // Utilisé dans les sections d'informations
    table1: TableSchema,
    table2: TableSchema,
    list: [String], // Utilisé dans les sections de bloc unique et de trois colonnes pour les listes simples
    entries: [EntrySchema] // Utilisé dans les sections de liste pour les entrées détaillées
});

// Définir le schéma principal qui inclut un tableau de sections
const CVSchema = new Schema({
    sections: [SectionSchema]
});

// Créer le modèle
const CVModel = mongoose.model('CV', CVSchema);

module.exports = CVModel;
