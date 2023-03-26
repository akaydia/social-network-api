const { User, Thought } = require('../models');

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }, // getThoughtById

  // create thought
  async createThought(req, res) {
    Thought.create(req.body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: _id } },
        { new: true }
      );
    })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    })
    .catch((err) => res.json(err));


  }, // createThought

  // update thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }, // updateThought

  // delete thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      const user = await User.findOneAndUpdate(
        { _id: thought.userId },
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }, // deleteThought

  // add reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }, // addReaction

  // delete reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }, // deleteReaction
}; // module.exports
