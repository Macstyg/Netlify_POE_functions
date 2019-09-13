import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import axios from "axios";

import { PoePayload, PoeEventNames, LanguageNames } from "../../types";

const germanExportHook = "https://api.poeditor.com/webhooks/bf2989f3a8";
const japaneseExportHook = "https://api.poeditor.com/webhooks/2e9d47ace8";

export const handler: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const payloadString = event.body.split("=")[1];
    const normilizedPayloadString = decodeURI(payloadString)
      .replace(/\+/g, " ")
      .replace(/%3A/g, ": ");
    console.log('normilizedPayloadString', normilizedPayloadString);

    const payload: PoePayload = JSON.parse(normilizedPayloadString);
    const { name } = payload.event;
    console.log("parsed payload", payload);
    console.log("name", name);
    if (name === PoeEventNames.COMPLETED) {
      const languageName = payload.language.name;
      if (languageName === LanguageNames.GERMAN) {
        const response = await axios.post(germanExportHook);
        return {
          statusCode: 200,
          body: JSON.stringify({ response })
        };
      } else if (languageName === LanguageNames.JAPANESE) {
        const response = await axios.post(japaneseExportHook);
        return {
          statusCode: 200,
          body: JSON.stringify({ response })
        };
      }
    }
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
