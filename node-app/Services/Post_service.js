const nodemailer = require("nodemailer");
const PostHelper = require("../Helper/Post_helper");

const PostService = {
  async CutoffMarksCalulation(req, res) {
    const { Mathsmark, Physicsmark, Chemistrymark, Email } = req.body;
    console.log(Email, "Email");
    console.log(process.env.EMAIL_USER, "process.env.EMAIL_USER");

    function MarksCalculation(maths, physics, chemistry) {
      const marks = maths / 2 + physics / 4 + chemistry / 4;
      return marks;
    }

    try {
      const dataErrorValidation = await PostHelper.validate(req.body);
      if (!dataErrorValidation) {
        const Marks = MarksCalculation(Mathsmark, Physicsmark, Chemistrymark);
        req.body.Cutoffmark = Marks;

        // Insert new user data into the database
        const insertedData = await PostHelper.create(req.body);

        // Fetch existing user data
        const existingUsers = await PostHelper.getAllUsers();

        // Add the new user data to the list
        existingUsers.push(insertedData);

        // Sort users by cutoff marks
        existingUsers.sort((a, b) => b.Cutoffmark - a.Cutoffmark);

        // Assign ranks, handling ties

        let currentRank = 1;
        for (let i = 0; i < existingUsers.length; i++) {
          if (
            i > 0 &&
            existingUsers[i].Cutoffmark === existingUsers[i - 1].Cutoffmark
          ) {
            existingUsers[i].rank = existingUsers[i - 1].rank;
          } else {
            existingUsers[i].rank = currentRank;
            currentRank++;
          }
        }
        // Save updated data
        await Promise.all(existingUsers.map((user) => PostHelper.update(user)));

        // Send email with cutoff marks
        const transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: "suriyamoorthie12@gmail.com",
          to: Email,
          date: new Date(),
          subject: "Your Cutoff Marks",
          text: `Your calculated cutoff marks are: ${Marks}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Email send error:", error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res
          .status(200)
          .send({
            message:
              "Success! Cutoff marks calculated, ranks updated, and email sent.",
            Marks,
          });
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
};

module.exports = PostService;
