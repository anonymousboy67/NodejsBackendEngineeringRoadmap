// src/models/User.js - User Model (In-memory for now)
const bcrypt = require('bcryptjs');

// In-memory user storage (we'll use database tomorrow)
let users = [];
let nextUserId = 1;

class User {
    constructor(userData) {
        this.id = nextUserId++;
        this.name = userData.name;
        this.email = userData.email;
        this.password = userData.password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static async create(userData) {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        
        const user = new User(userData);
        users.push(user);
        return user;
    }

    static findByEmail(email) {
        return users.find(user => user.email === email);
    }

    static findById(id) {
        return users.find(user => user.id === id);
    }

    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }

    toJSON() {
        const userObject = { ...this };
        delete userObject.password;
        return userObject;
    }
}

module.exports = { User, users };