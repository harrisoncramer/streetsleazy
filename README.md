# StreetSleazy

We are looking for an apartment and it's hard.

This is to help us find one quickly!

# How?

The web scraper is inside of the real-estate-scraper directory.

It's using <a href="https://www.scraperapi.com/">scraperapi</a>, a wonderful little service, to help us get the data.

We're using Firestore to store the data and the real-time functions to watch for new record creations. This is the funcitons repo.

We send a Twilio text whenever a new record is created. There are dotfiles for both repositories that hold my secrets.

# Deployment

Deploy the function to firebase:

```
$ cd functions
$ firebase deploy --only functions
```

And set the scraper on a cronjob, or another sort of timer.
