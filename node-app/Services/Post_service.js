const nodemailer = require("nodemailer");
const PostHelper = require("../Helper/Post_helper");

const PostService = {
  async CutoffMarksCalulation(req, res) {
    const { Mathsmark, Physicsmark, Chemistrymark, Email } = req.body; 
    function MarksCalculation(maths, physics, chemistry) {
      const marks = maths / 2 + physics / 4 + chemistry / 4;
      return marks;
    }

    try {
      const dataErrorValidation = await PostHelper.validate(req.body);
      if (!dataErrorValidation) {
        const Marks = MarksCalculation(
          Mathsmark,
          Physicsmark,
          Chemistrymark
        );
        req.body.Cutoffmark = Marks;

        const inserteddata = await PostHelper.create(req.body);
        const transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          subject: "Your Cutoff Marks",
          auth: {
            user: process.env.EMAIL_USER,  
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: "suriyamoorthie12@gmail.com",
          to: Email,
          date:new Date(),
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

        res.status(200).send({ message: "Success! Cutoff marks calculated and email sent.", inserteddata, Marks });
    }
    
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },
};

module.exports = PostService;
