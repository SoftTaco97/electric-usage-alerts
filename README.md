# Electricity Usage Alerts

The purpose of this project was to automate an annoyance of my life. 

Recently I moved apartments and in doing so needed to sign up for an electric account with [Portland General Electric](https://www.portlandgeneral.com/).

After making an account and signing in, the fist thing I noticed was that at the bottom of their dashboard, there is an energy tracker that allows you to see the current dollar amount you've used during this point in your billing cycle. 

Since I found out of about this, I have been checking once a day to see what my energy usage is.

This got me thinking; ***is there a way to automate this?***

Turns out **yes!** It just requires a headless chrome, a couple of google API credentials, and some caffeine!

## Overview

This script will start a headless instance of chrome on your machine, go to the login page for the Portland General Electric online dashboard, and login using the information you supplied in the set up. 

Once logged in, the script will monitor the requests being preformed on the page until it finds the request for the "energy tracker" section.

Once the request for the "energy tracker" section has received a response from the server, the script will take the response information supplied from the server and use it to send an email to the recipient email provided during set up from the email provided during set up. (see the set up section below for more information).

Once the email is sent the chrome instance will be shut down and the script will stop running. 

Example of the data that the script will send to you via email: 


```
Current Usage: 18.39,
Next Bill Projection: 32.53
Maximum projected bill amount: 48.795
Billing cycle: Day 14 of 33
Number of days left in current period: 19
```

## A brief word on privacy and security

##### Privacy

I'll be straight to the point on this one; 

None of the information you put in is in ***anyway, shape, or form*** sent back to me, or anyone else.

This scripts only functionality is to open a headless chrome browser on your local machine, sign into your PGE account, monitor the requests taking place on the PGE web page, and then send an email from your gmail account. 

This is all happening on your local machine, not on any external servers (besides the gmail ones for the email functionality). 

Additionally, no logs or reporting currently exists in the project.

##### Security

All of this script's functionality is taking place solely on your local machine, so as long as the machine you are running the script on is secure, then you shouldn't need to worry security.

With that being said, the security of your data is ultimately your responsibility.

If you are planning on hosting this script some where for it to run automatically, then please ensure you take precautions with the file permissions and ownerships on that machine.


## Set up

#### Requirements

1. Node.js
2. Node Package Manager (npm)
3. A Portland General Electric online account
4. A Google Mail (gmail) account
5. A Google OAuth 2 client Id, secret, and refresh token that is associated with the gmail account you would like to send the email from. (with the proper scope permissions set up)
   - [Check out this sick link for more info (up to step 5)](https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1, "this link is super cool")

### Installation / Setting up

1. Clone the repository on your local machine
2. Run `npm i` to install the packages
3. Use the `.env.example` to create a `.env` file at the root of the project
4. Fill out the `.env` file's variables
    - Explanation of variables listed below

### Running / Deployment

To run the project, you simply need to run `node app.js` in the root of the project's directory.

This will run the script and send an email with some tasty information (if you set everything up correctly that is)

However, if you are passionate about automating various aspects of your life, you should set up something that will run the script on an interval of time. 

For my purposes I am deploying this on a unix server and setting up a cron job to run the script once a day using crontab.

### Env Variables

To help clarify the variables you will need to set up, I figured it would be good to add a simple overview of the variables and what they do

```
USERNAME=
```

This is the username for your PGE account - this is needed because it will allow the script to log in as you.

```
PASSWORD=
```

This is the password for your PGE account - this is needed because it will allow the script to log in as you.

```
EMAIL=
```

This is the email that you want the alert to be sent **from**.

```
CLIENT_ID=
```

This is the client id for the google api project that you set up in the requirements phase. 
It is needed to be able to send an email from your email account.

```
SECRET=
```

This is the client secret for the google api project that you set up in the requirements phase.
It is needed to be able to send an email from your email account.

```
TOKEN=
```

This is the refresh token for your email account.
It is needed so the mailing portion of the script can request a new access token for your account, which will allow it to send an email form your account.

```
RECIPIENT=
```

This is who you want the email to be sent **to**.
