const nodemailer = require('nodemailer');

/**
 * Function for sending an email with the current electric information
 * 
 * @param { Object } information 
 * @return { Promise<String> }
 */
const sendMail = (information) => new Promise((resolve, reject) => {
    const mailer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            scope: 'https://www.googleapis.com/auth/gmail.send',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.SECRET,
            refreshToken: process.env.TOKEN
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECIPIENT,
        subject: 'Electric Bill Daily Update',
        text: `
            Current Usage: ${information.currentUsage},
            Next Bill Projection: ${information.projectedAmount}
            Maximum projected bill amount: ${information.maxProjectedAmount}
            Billing cycle: Day ${information.currentCycleDay} of ${information.numberOfBillingDays}
            Number of days left in current period: ${information.numberOfBillingDays - information.currentCycleDay}
        `
    };

    mailer.sendMail(mailOptions, (err, info) => {
        if(err) return reject(err);
        return resolve(info.response);
    });
});

module.exports = {
    sendMail
}
