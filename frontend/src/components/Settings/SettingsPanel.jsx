import { useEffect, useState } from "react";
import { KeyRound, Save, ShieldCheck } from "lucide-react";

import {
    CHAT_MODEL_OPTIONS,
    DEFAULT_EMBEDDING_LABEL
} from "../../services/openRouterSettings";

function SettingsPanel({

    apiKey = "",

    selectedModel = CHAT_MODEL_OPTIONS[0].value,

    onSave

}) {

    const [localApiKey, setLocalApiKey] = useState(apiKey);
    const [localModel, setLocalModel] = useState(selectedModel);
    const [saveMessage, setSaveMessage] = useState("Your OpenRouter key stays in this browser only.");

    useEffect(() => {

        setLocalApiKey(apiKey);
        setLocalModel(selectedModel);

    }, [apiKey, selectedModel]);

    const handleSave = async () => {

        await onSave?.({
            apiKey: localApiKey.trim(),
            selectedModel: localModel
        });

        setSaveMessage("Settings saved locally in this browser.");

    };

    return (

        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#f5f6f8] px-3 py-4 md:px-8 md:py-6">

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4">

                <section className="rounded-3xl border border-[#d8dde5] bg-white p-5 shadow-sm md:p-6">

                    <div className="flex items-center gap-2 text-sm font-semibold text-[#24211f]">
                        <ShieldCheck size={16} className="text-emerald-600" />
                        Settings
                    </div>

                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#24211f]">
                        Bring your own OpenRouter key
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                        Your key is stored locally in this browser and used for both chat and document indexing. The embedding model is fixed so the Chroma index stays compatible.
                    </p>

                    <div className="mt-6 grid gap-5">

                        <label className="grid gap-2">
                            <span className="flex items-center gap-2 text-sm font-medium text-[#24211f]">
                                <KeyRound size={15} className="text-[#b25b32]" />
                                OpenRouter API Key
                            </span>
                            <input
                                type="password"
                                value={localApiKey}
                                onChange={(event) => setLocalApiKey(event.target.value)}
                                placeholder="sk-or-..."
                                autoComplete="off"
                                spellCheck="false"
                                className="h-11 rounded-xl border border-[#cfd6df] bg-white px-4 text-[15px] text-[#24211f] outline-none transition placeholder:text-[#9a938a] focus:border-[#b25b32] focus:ring-4 focus:ring-[#b25b32]/10"
                            />
                        </label>

                        <label className="grid gap-2">
                            <span className="text-sm font-medium text-[#24211f]">Preferred Chat Model</span>
                            <select
                                value={localModel}
                                onChange={(event) => setLocalModel(event.target.value)}
                                className="h-11 rounded-xl border border-[#cfd6df] bg-white px-4 text-[15px] text-[#24211f] outline-none transition focus:border-[#b25b32] focus:ring-4 focus:ring-[#b25b32]/10"
                            >
                                {CHAT_MODEL_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="rounded-2xl border border-[#e3e7ee] bg-[#fbfcfd] p-4">
                            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7a8493]">
                                Fixed Embedding Model
                            </div>
                            <div className="mt-2 text-sm font-semibold text-[#24211f]">
                                {DEFAULT_EMBEDDING_LABEL}
                            </div>
                            <p className="mt-1 text-sm leading-6 text-[#667085]">
                                This model does not change after indexing. That keeps every vector in the same space.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="inline-flex h-11 w-fit items-center gap-2 rounded-xl bg-[#24211f] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3a352f]"
                        >
                            <Save size={16} />
                            Save Settings
                        </button>

                    </div>

                </section>

                <div className="rounded-2xl border border-[#d8dde5] bg-white p-4 text-sm text-[#667085] shadow-sm">
                    {saveMessage}
                </div>

            </div>

        </main>

    );

}

export default SettingsPanel;