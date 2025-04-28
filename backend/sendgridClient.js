require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send an email when a new workout is added
const sendWorkoutEmail = async (workout) => {
    const msg = {
      to: process.env.VERIFIED_SENDER_EMAIL,
      from: process.env.VERIFIED_SENDER_EMAIL,
      subject: "New Workout Added!",
      html: `<strong>User:</strong> ${workout.user_name}<br>
             <strong>Workout Type:</strong> ${workout.workout_type}<br>
             <strong>Notes:</strong> ${workout.notes || "None"}<br>
             <strong>Workout added successfully!</strong>`,
      tracking_settings: {
        open_tracking: {
          enable: true,
          substitution_tag: '%open_tracking%'
        }
      }
    };
  
    try {
      await sgMail.send(msg);
      console.log(`Email sent for workout: ${workout.workout_type}`);
    } catch (error) {
      console.error("Error sending email:", error.response ? error.response.body : error.message);
    }
  };
  

module.exports = { sendWorkoutEmail };
