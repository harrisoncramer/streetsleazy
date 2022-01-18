import * as functions from "firebase-functions";
import { config } from "dotenv";
import twilio from "twilio";

config();

export const onCreatedApt = functions.database
  .ref("/apartments/{apartmentId}")
  .onCreate(async (snapshot, context) => {
    const id = context.params.apartmentId;
    console.log(`${id} was created.`);
    const { address, type, neighborhood, price, link } = snapshot.val();
    const message = `
      New ${type} just listed!
      ${address} in ${neighborhood}\n
      Big-Ones: ${price}\n
      Link: ${link}\n

      Go get that 🏠! 
    `;

    const { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, TWILIO_PHONE, PHONE } =
      process.env;
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    await client.messages.create({
      body: message,
      from: `${TWILIO_PHONE}`,
      to: `${PHONE}`,
    });

    console.log("Message sent!");
  });
