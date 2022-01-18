# StreetSleazy

We are looking for an apartment and it's hard.

This is to help us find one quickly!

# How?

This repository checks StreetEasy every 15 minutes and notifies me if there are any listings within my price range in the neighborhoods that I'm interested in.

It's using <a href="https://www.scraperapi.com/">scraperapi</a>, a wonderful little service, to help us get the data.

We're using Firestore to store the data and the real-time functions to watch for new record creations.

Finally, it sends a Twilio text whenever a new record is created. There are dotfiles that hold my secrets, including my cell numbers, twilo and scraperapi credentials.

# Deployment

Deploy the function to firebase:

```
$ cd functions
$ firebase deploy --only functions
```
