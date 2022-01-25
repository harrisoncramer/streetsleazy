import * as functions from "firebase-functions";
import twilio from "twilio";
import axios from "axios";
import cheerio from "cheerio";
import { getDatabase, ref, goOffline, set } from "firebase/database";
import init from './init'
import { hashingFunc } from "./utils"

init();

export const getPosts = functions.pubsub
.schedule("every 5 minutes")
.onRun(async () => {
  const date = new Date().toISOString();
  console.log(`Getting posts at ${date}....`);

  const { data } = await axios.get("https://harrisoncramer.me/blog");

  const db = getDatabase();

  async function storePost(id: string, link: string) {
    console.log(`Saving ${link}`);
    const reference = ref(db, "posts/" + id);
    try {
      await set(reference, { link });
    } catch (err) {
      console.log(`There was an error saving the ${link}`);
      console.error(err);
    }
  }

  const $ = cheerio.load(data);
  const links = Array.from($("h2")).map(el => $(el).text())

  const saves = links.map(link => {
    const hash = hashingFunc(link)
    return storePost(hash, link)
  })

  try {
    await Promise.all(saves)
    console.log("Posts saved!");
  } catch (err) {
    console.log("Posts could not be saved");
    console.error(err);
  }

  goOffline(db);

  console.log("Done!");
});

export const onCreatedPost = functions.database
.ref("/posts/{id}")
.onCreate(async (snapshot, context) => {
  const id = context.params.id;

  console.log(`${id} was created.`);

  const { link } = snapshot.val();

  const { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, TWILIO_PHONE, PHONE } = process.env;

  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  await client.messages.create({
    body: `New link posted: ${link}`,
    from: `${TWILIO_PHONE}`,
    to: `${PHONE}`,
  });

  console.log(`Messages sent at ${new Date().toISOString()}!`);
});
