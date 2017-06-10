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

var mail = {};

mail.send = function(to, subject, message) {
  var mailOptions = {
    from: process.env.MAIL_USER,
    to: to,
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

mail.sendPurchase = function(purchase) {
  var subject = purchase.user.username + ' just bought ' + purchase.num + ' of ' + purchase.meal.name;
  var message = purchase.user.username + ' just bought ' + purchase.num + ' of ' + purchase.meal.name + '.\n';
  message += 'Pickup is on ' + purchase.meal.deliveryDateTime + ' at ';
  message += purchase.meal.address + ' ' + purchase.meal.city + ', ' + purchase.meal.state + ' ' + purchase.meal.zipcode;

  var mailOptions = {
    from: process.env.MAIL_USER,
    bcc: [purchase.user.email, purchase.meal.chef.email],
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

mail.sendRequest = function(req) {
  var subject = req.user.username + ' just requested ' + req.num + ' of ' + req.request.meal.name;
  var message = req.user.username + ' just requested ' + req.num + ' of ' + req.request.meal.name + '.\n';

  var mailOptions = {
    from: process.env.MAIL_USER,
    bcc: [req.user.email, req.request.meal.chef.email],
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


module.exports = mail;
