import api from "../services/api";
import { buildAuthorizationHeader } from "../services/openRouterSettings";

export async function streamChat(question, apiKey, model, history = []) {

    return await fetch(

        `${api.defaults.baseURL}/chat/stream`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json",
                ...buildAuthorizationHeader(apiKey)

            },

            body: JSON.stringify({

                question,
                history,
                api_key: apiKey,
                model

            })

        }

    );

}
