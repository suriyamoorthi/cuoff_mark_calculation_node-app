const nodemailer = require('nodemailer');
const PostHelper = require("../Helper/Post_helper");

const PostService = {
    async CutoffMarksCalulation(req, res) {
        console.log(req.body, "ffef");
        const { Mathsmark, Physicsmark, Chemistrymark, Email } = req.body;
console.log(Email,"email")
        function CalculationCutoffMarks(maths, physics, chemistry) {
            const marks = maths / 2 + physics / 4 + chemistry / 4;
            return marks;
        }

        try {
            const registerUser = await PostHelper.validate(req.body);

            if (!registerUser) {
                console.log("post method");
                const cutoffMarks = CalculationCutoffMarks(Mathsmark, Physicsmark, Chemistrymark);
                console.log(cutoffMarks, "cutoffMarks");
                req.body.CutoffMark = cutoffMarks;

                const { inserteddata } = await PostHelper.create(req.body);

                // Send email with cutoff marks
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'suriyamoorthie12@gmail.com',
                        pass: 'rbmx afen zaer zjqk'
                    }
                });

                const mailOptions = {
                    from: 'suriyamoorthie12@gmail.com',
                    to: Email,
                    subject: 'Your Cutoff Marks',
                    text: `Your calculated cutoff marks are: ${cutoffMarks}`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Email send error:", error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.send( {inserteddata,cutoffMarks} );
            }
        } catch (err) {
            console.log("post error message");
            res.status(400).send({ error: err.message });
        }
    }
};

module.exports = PostService;
