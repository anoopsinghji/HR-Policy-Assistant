export const OPENROUTER_API_KEY_STORAGE_KEY = "OPENROUTER_API_KEY";
export const SELECTED_MODEL_STORAGE_KEY = "SELECTED_MODEL";
export const DEFAULT_CHAT_MODEL = "google/gemini-2.5-flash";
export const DEFAULT_EMBEDDING_MODEL = "openai/text-embedding-3-small";
export const DEFAULT_EMBEDDING_LABEL = "OpenAI Text Embedding 3 Small";

export const CHAT_MODEL_OPTIONS = [
    { label: "Google Gemini 2.5 Flash", value: "google/gemini-2.5-flash" },
    { label: "DeepSeek Chat", value: "deepseek/deepseek-chat" },
    { label: "Anthropic Claude Sonnet 4", value: "anthropic/claude-sonnet-4" },
    { label: "OpenAI GPT-4.1 Mini", value: "openai/gpt-4.1-mini" },
    { label: "Qwen 3 235B", value: "qwen/qwen3-235b" }
];

export function loadUserSettings() {
    if (typeof window === "undefined") {
        return {
            apiKey: "",
            selectedModel: DEFAULT_CHAT_MODEL
        };
    }

    return {
        apiKey: window.localStorage.getItem(OPENROUTER_API_KEY_STORAGE_KEY) || "",
        selectedModel: window.localStorage.getItem(SELECTED_MODEL_STORAGE_KEY) || DEFAULT_CHAT_MODEL
    };
}

export function saveUserSettings(settings) {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(
        OPENROUTER_API_KEY_STORAGE_KEY,
        settings.apiKey || ""
    );

    window.localStorage.setItem(
        SELECTED_MODEL_STORAGE_KEY,
        settings.selectedModel || DEFAULT_CHAT_MODEL
    );
}

export function buildAuthorizationHeader(apiKey) {
    if (!apiKey) {
        return {};
    }

    return {
        Authorization: `Bearer ${apiKey}`
    };
}