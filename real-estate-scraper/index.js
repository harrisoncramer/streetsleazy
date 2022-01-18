import fetch from "node-fetch";
import cheerio from "cheerio";
import dotenv from "dotenv";
import { getDatabase, ref, goOffline, set } from "firebase/database";
import crypto from "crypto";
import { initializeApp } from "firebase/app";

const hashingFunc = (str) =>
  crypto.createHash("sha256").update(str, "utf8").digest("hex");

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "street-easy-scraper.firebaseapp.com",
  databaseURL: "https://street-easy-scraper-default-rtdb.firebaseio.com",
  projectId: "street-easy-scraper",
  storageBucket: "street-easy-scraper.appspot.com",
  messagingSenderId: "1026774728634",
  appId: "1:1026774728634:web:d76a3326fb26a9e376a783",
};

initializeApp(firebaseConfig);

const res = await fetch(
  `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=https://streeteasy.com/2-bedroom-apartments-for-sale/nyc/price:500000-900000%7Carea:364,325,346,304,319,326,329,324?sort_by=listed_desc`,
  {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "if-none-match": 'W/"943f318ddb2f69712388409fd13a5d5f"',
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie:
        "g_state=; _se_t=3bae1d5a-49e3-49db-aa6b-b2e9b3e89dd7; se_lsa=2022-01-17+16%3A34%3A37+-0500; ezab_fossa_bam_agent_card=both_bam_cards; ezab=%7B%22fossa_bam_agent_card%22%3A%22both_bam_cards%22%7D; last_search_tab=sales; se_rs=202703632; recent_searches=%5B%22202703632%7C1642455277%22%5D; _gcl_au=1.1.1893250194.1642455278; KruxPixel=true; pxcts=45bc2a40-77dd-11ec-87a8-65b482088f51; _pxvid=45bbce6b-77dd-11ec-b994-6a7374716841; _ga=GA1.2.1750515521.1642455278; _gid=GA1.2.898421907.1642455278; _ses=S2RDQWZ2MlNPcXJ6a3lHeDFMY1R3RlVZdmxZRWRweVRJUjhBd205eVVibUFLRWI0SzZicGUxKzNRc0k5K0FSSmtvMmlHeEUzeHFZSjJsa1pTZlZpMkF2NkZaNCtCM3dtRmRKNjR3azBrcnpHSUFTVm85MlMzMWNnTkJSemZQQjJtemNoaDhZZEdZZlYycFYvYzZzTFNWV2tqVTVQWXdIZWMwT21iRklPcURiMm5LV2F4TGtvMW1EMmhXZE0xRU9mb1lqN29WbUZUWmRjOFFrTWlSa1l5YThCQVpvSWFXU2UzVm1UcXVCSzFSVEQrbnloclllS2pCZW9VQWc0ek9Gd20rbnFDZmVobmdjOWFQNnZJczI1NDRuZ1hqUE44RU1GNXhkbjM5WWpBNXdGbXN6MS9rcGtwOU1qK2FiTStiRnhSOTRGSlV1MVh0aFIxWWR1Q3A2TnJoNS94MXh6Q0twZFZKUXZwWkd2UTVsakU0UVJiRVlBT0lNMlQwallKL3MvQWVTTHdRRVI5M2Y3NDBDeEE1L2lKMkZEbHZsa2FmR0tVa1czMVhIQnoxeFcvRkFxdHNkUnpGdzBPRzVIUnhaVDNncWEwWTVqaTlqNVZ0dCtFc1ByVXRsdkgvZURWczJNN3pLRWNWK1BGTWZoZ285d1pnMzlVemtwNXAwTVhtODI2QTlrTTFZakxJbjNsd2ZKWi8xRDNWSHVQajJSMjNGYnZKWHBRUWpzZ3NOVVFSb1ZHNDFkOVFCT1RJWDlrTGdRQnRBYkVOMnZmaUVlYmFEVklGUDZGd1NsclpBbjVnYzE1WlV1dmlCYTA3dz0tLS83THJNVmM2NGEyeHZqcGszVGJEb1E9PQ%3D%3D--992bfffbef9ec303e55fd53869239bb95e8e50c3; _dc_gtm_UA-122241-1=1; _gat_UA-122241-1=1; __gads=ID=28a4571862bef012-22b9e777877b0012:T=1642455278:S=ALNI_MbKeFB1VJ8-6_Rh-u9qw9n99XsYBA; zjs_user_id=null; zjs_anonymous_id=%223bae1d5a-49e3-49db-aa6b-b2e9b3e89dd7%22; ki_t=1642455278855%3B1642455278855%3B1642455278855%3B1%3B1; google_one_tap=0; _px3=30089700921ef2515aea21ef4aedb70fd3926ff6ca79485b97a63d7b0dc9fe3c:a5QgoImZj9lxZEdlAMCdMqcXTtq6EqUHDOIpQgxc5ovupoPUAPHhB/Pug5iXHiUwU5l/+rLAQPzwch3AIZ+dPQ==:1000:RIyeUEoMjvMNGfUEpF/y+60vxTvgH3OT4GGrKAf0dKH1Oa3W1lJENuYI1qhw63GiYT3ZuPPTJHuVCKrjAjQWPDgOFatQi/iebutkIfCBI4KkVL7vj9FmfCtTThLwPDRU7ElkTuTN0yf4NvLQ/bkPKNzkdrj+8xRSHGH5yqSxV9q4rKjGmOhruINCbIcTgA65Pwy3rbFvlY+x7jocJlWUkg==",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
  }
);

const body = await res.text();

const db = getDatabase();

async function storeApt(id, apt) {
  console.log(`Saving ${id}`);
  const reference = ref(db, "apartments/" + id);
  await set(reference, apt);
}

const $ = cheerio.load(body);
const properties = Array.from($("li.searchCardList--listItem"));

const data = properties.reduce((agg, property) => {
  let text = $(property).find("span.u-displayNone").text();
  const words = text.split(" ");

  const type = words[0];
  const address = $(property).find("address").text().trim();

  const link =
    $(property).find(".listingCard-globalLink").attr("href") || "no link found";

  const neighborhood = words
    .reduce(
      (agg, word) => {
        if (agg.addMe && word !== "at") agg.val += ` ${word}`;
        if (word === "in") agg.addMe = true;
        if (word === "at") agg.addMe = false;
        return agg;
      },
      { addMe: false, val: "" }
    )
    .val.trim();

  const hash = hashingFunc(address);
  const price = $(property).find(".listingCard-priceMargin").text();
  const res = { address, type, neighborhood, price, hash, link };

  agg.push(res);
  return agg;
}, []);

const promises = data.map(({ hash, ...rest }) => storeApt(hash, rest));

await Promise.all(promises);

goOffline(db);
