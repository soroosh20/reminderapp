let database = require("../database");

let remindersController = {
    // Show a list of reminders
    list: (req, res) => {
        res.render('reminder/index', { reminders: database.cindy.reminders })
    },

    // Show a Create Reminder Page
    new: (req, res) => {
        res.render('reminder/create')
    },

    // Show the details of a Single Reminder
    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database.cindy.reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        })
        if (searchResult != undefined) {
            res.render('reminder/single-reminder', { reminderItem: searchResult })
        } else {
            res.render('reminder/index', { reminders: database.cindy.reminders })
        }
    },

    // Create a reminder
    // ⚠️ TODO: Currently hardcoded to always create a reminder for Cindy only. You need to make this dynamic. 
    create: (req, res) => {
        let reminder = {
            id: database.cindy.reminders.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false
        }
        database.cindy.reminders.push(reminder);
        res.redirect('/reminders');
    },

    // Show the Edit Reminder Page
    edit: (req, res) => {
        // ⭐️ your implementation here ⭐️
        let reminderToFind = req.params.id;
        let searchResult = database.cindy.reminders.find(function(reminder) {
            return reminder.id == reminderToFind
        })
        if (searchResult != undefined) {


            res.render('reminder/edit', { reminderItem: searchResult })

        } else
            res.render('reminder/index', { reminders: database.cindy.reminders })

    },

    // Edit the Reminder
    update: (req, res) => {
        // ⭐️ your implementation here ⭐️

       let reminderToFind = req.params.id;

        for (var i in database.cindy.reminders) {

            if (database.cindy.reminders[i].id == reminderToFind) {

                database.cindy.reminders[i].title = req.body.title,
                database.cindy.reminders[i].description = req.body.description;

                res.render('reminder/single-reminder', { reminderItem: database.cindy.reminders[i] });
            }

        }

    },

    // Delete the Reminder
    delete: (req, res) => {
        // ⭐️ your implementation here ⭐️
        let reminderToFind = req.params.id;
        let itemToDelete = database.cindy.reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        })
        console.log(itemToDelete)
        database.cindy.reminders = database.cindy.reminders.filter(item => item !== itemToDelete);
        res.redirect('/reminders');

    }
}

module.exports = remindersController;
