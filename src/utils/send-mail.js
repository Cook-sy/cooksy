var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;

var templatePath = function(templateName) {
  return path.join(__dirname, '../views/emails/' + templateName + '.html');
};

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

  var templateContentUser = fs.readFileSync(templatePath('purchases-user'), { encoding: 'utf8' });
  var templateContentChef = fs.readFileSync(templatePath('purchases-chef'), { encoding: 'utf8' });
  var compiledUser = _.template(templateContentUser);
  var compiledChef = _.template(templateContentChef);

  var data = {
    username: purchase.user.username,
    chefUsername: purchase.meal.chef.username,
    dateOrdered: purchase.createdAt,
    mealName: purchase.meal.name,
    quantity: purchase.num,
    individualPrice: purchase.individualPrice,
    amount: +purchase.num * +purchase.individualPrice,
    totalAmount: +purchase.num * +purchase.individualPrice,
    deliveryDateTime: purchase.meal.deliveryDateTime,
    address: purchase.meal.address,
    city: purchase.meal.city,
    state: purchase.meal.state,
    zipcode: purchase.meal.zipcode
  };

  var mailOptionsUser = {
    from: process.env.MAIL_USER,
    to: purchase.user.email,
    subject: subject,
    html: compiledUser(data)
  };
  var mailOptionsChef = {
    from: process.env.MAIL_USER,
    to: purchase.meal.chef.email,
    subject: subject,
    html: compiledChef(data)
  };

  transporter.sendMail(mailOptionsUser, function(error, info) {
    if (error) { return console.log(error); }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  transporter.sendMail(mailOptionsChef, function(error, info) {
    if (error) { return console.log(error); }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

mail.sendRequest = function(req) {
  var subject = req.user.username + ' just requested ' + req.num + ' of ' + req.request.meal.name;

  var templateContentUser = fs.readFileSync(templatePath('requests-user'), { encoding: 'utf8' });
  var templateContentChef = fs.readFileSync(templatePath('requests-chef'), { encoding: 'utf8' });
  var compiledUser = _.template(templateContentUser);
  var compiledChef = _.template(templateContentChef);

  var data = {
    username: req.user.username,
    chefUsername: req.request.meal.chef.username,
    dateRequested: req.createdAt,
    mealName: req.request.meal.name,
    quantity: req.num,
    deadline: req.request.deadline
  };

  var mailOptionsUser = {
    from: process.env.MAIL_USER,
    to: req.user.email,
    subject: subject,
    html: compiledUser(data)
  };
  var mailOptionsChef = {
    from: process.env.MAIL_USER,
    to: req.request.meal.chef.email,
    subject: subject,
    html: compiledChef(data)
  };

  transporter.sendMail(mailOptionsUser, function(error, info) {
    if (error) { return console.log(error); }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  transporter.sendMail(mailOptionsChef, function(error, info) {
    if (error) { return console.log(error); }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};


module.exports = mail;
