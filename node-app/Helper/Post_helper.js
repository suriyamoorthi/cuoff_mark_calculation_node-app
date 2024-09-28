const Joi = require("joi");
const db = require("../Shared/mongo");

const userSchema = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required(),
  Mathsmark: Joi.number().required(),
  Physicsmark: Joi.number().required(),
  Chemistrymark: Joi.number().required(),
});
const PostHelper = {
  async validate(post) {
    try {
      await userSchema.validateAsync(post);
    } catch (error) {
      const {
        details: [{ message }],
      } = error;
      throw new Error(message);
    }
  },
  create(post) {
    return db.Users.insertOne(post);
  },
  getAllUsers() {
    return db.Users.find().toArray();
  },

  update(user) {
    return db.Users.updateOne({ _id: user._id }, { $set: user });
  },

};

module.exports = PostHelper;
