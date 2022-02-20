var _ = require("lodash");

const nodemailer = require("nodemailer");

var config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "anujgoyal93120@gmail.com",
        pass: "Anujanuj3"
    }
};

var transporter = nodemailer.createTransport(config)

var defaultMail = {
    from: "anujgoyal93120@gmail.com",
    text: "test test"
}
const send = (to, subject, html) => {
    mail = _.merge({ html }, defaultMail, to);
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        }
        console.log("mail sent ", info.response);
    })
}
module.exports = {
    send
}