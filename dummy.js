const { config } = require("dotenv");
const twilio = require("twilio");
config();

const TWILIO_ACCOUNT_SID = "AC9cb1ea300a8358c4490e5f8d218a047f";
const SCRAPER_API_KEY = "c965f324432e3b55a713a34c45293671";
const TWILIO_AUTH_TOKEN = "5c9743ad1a174b511f733d468e48fb92";
const TWILIO_PHONE = "+19205365499";

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const run = async () => {
  await client.messages.create({
    body: "Hi Masami!",
    from: `${TWILIO_PHONE}`,
    to: "2064506783",
  });

  console.log("Message sent!");
};

run();
