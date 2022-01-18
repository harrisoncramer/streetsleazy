# StreetSleazy 🏡

We are looking for an apartment and it's hard. This applicaiton will help us find one quickly!

# How?

This repository checks StreetEasy every 15 minutes and notifies us when there are any listings within our price range, in the neighborhoods we're interested in.

It's using <a href="https://www.scraperapi.com/">ScraperAPI</a> to *assist* with StreetEasy's anti-bot tools, and Firestore to store the data and provide real-time updates when anything is added to our database.

Finally, Twilio sends us a text whenever a new record is created. There are dotfiles that hold our secrets, including cell numbers, and Twilio, Firebase, and ScraperAPI credentials.

# Deployment

Deploy the function to firebase:

```
$ cd functions
$ firebase deploy --only functions
```
