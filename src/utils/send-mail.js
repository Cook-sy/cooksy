var nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'oauth2',
    user: process.env.MAIL_USER,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN
  }
});

transporter.use('compile', htmlToText());

module.exports = function(bcc, subject, message) {
  var mailOptions = {
    from: process.env.MAIL_USER,
    bcc: bcc,
    subject: subject,
    html: message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};
