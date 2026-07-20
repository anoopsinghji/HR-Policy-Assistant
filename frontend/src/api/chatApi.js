import api from "../services/api";
import { buildAuthorizationHeader } from "../services/openRouterSettings";

export async function askQuestion(question, apiKey, model, history = []) {

    const response = await api.post(

        "/chat",

        {
            question,
            history,
            api_key: apiKey,
            model
        },

        {
            headers: buildAuthorizationHeader(apiKey)
        }

    );

    return response.data;

}
