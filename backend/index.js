// const sgMail = require('@sendgrid/mail');

import sgMail from '@sendgrid/mail';

async function sendCardAction(params) {
    // if (!params.key || !params.from || !params.to || !params.subject || !params.content) {
    if (!params.key) {
        return {error: "Insufficient number of arguments"}
    }

    sgMail.setApiKey(params.key);
    const msg = {
        to: 'recipient@example.org',
        from: 'sender@example.org',
        subject: 'Hello world',
        text: 'Hello plain world!',
        html: '<p>Hello HTML world!</p>',
    };
    msg.mailSettings = {
        sandboxMode: {
            enable: true
        }
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        //Log friendly error
        console.error(error.toString());

        //Extract error msg
        const { message, code, response } = error;

        //Extract response msg
        const { headers, body } = response;

        return { error: 'Bother', headers, body, message, code };
    }

    return { success: 'Postcard sent!'};
}

// function myAction(params) {
//     const lines = params.lines || [];
//     return { padded: lines.map(l => leftPad(l, 30, ".")) }
// }

// export const main = sendCardAction;

// exports.main = sendCardAction;

global.main = sendCardAction;
