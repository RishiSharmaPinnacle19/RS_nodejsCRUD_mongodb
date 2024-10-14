const express = require('express');
const User = require('../model/model'); 
// inport model file, and ensure consistent naming

const router = express.Router();


// post there we gave input to the server
router.post('/api/resource', async(req, res) => {
    const { username, email, password, roles } = req.body; 
    try {
        const newUser = new User({ username, email, password, roles });
        await newUser.save();
        // save new user on database  
        res.status(201).json({ message: 'User created successfully',newUser });

        // res.status(201).json(newUser); // Ensure the status code is passed
    } catch(error) {
        res.status(400).json({ error: error.message });
        // here we are sending the error message to the user
    }
});

// GEt 
router.get('/api/resource', async (req, res) => {
    try {
      const resources = await User.find().exec();
      //  find all users in database 
      res.json(resources);
    } catch (err) {
        // err show 
      console.error(err);
      res.status(500).json({ message: 'Error fetching resources' });
    }
  });

// get a specific user by ID
router.get('/api/resource/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        //  find user by id (findById)
        if (!user) 
            //  if user not found show err
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user); 
        //   if user found show user
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user by ID
router.put('/api/resource/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        //  update user by id (findByIdAndUpdate) and update its operation. unValidators: true check all validation if any change in email or password its check and if there is any err its show err else its update 
        if (!user) return res.status(404).json({ message: 'User not found' });
        // user id not found its show err.
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete user by ID
router.delete('/api/resource/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); 
        // delete user by id (findByIdAndDelete. its delete all the data from particular user..
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
// export router to main file 
