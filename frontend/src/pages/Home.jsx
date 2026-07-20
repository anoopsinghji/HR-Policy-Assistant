import { useCallback, useEffect, useMemo, useState } from "react";

import ChatContainer from "../components/Chat/ChatContainer";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import SettingsPanel from "../components/Settings/SettingsPanel";
import { listUploads } from "../api/uploadApi";
import {
    loadUserSettings,
    saveUserSettings
} from "../services/openRouterSettings";

const VIEW_LABELS = {
    home: "Home",
    knowledge: "Knowledge Base",
    settings: "Settings"
};

function Home() {

    const [activeView, setActiveView] = useState("home");
    const [uploadProcessing, setUploadProcessing] = useState(false);
    const [uploads, setUploads] = useState([]);
    const [uploadsLoading, setUploadsLoading] = useState(false);
    const [uploadsError, setUploadsError] = useState("");
    const [libraryOpen, setLibraryOpen] = useState(false);
    const [libraryCollapsed, setLibraryCollapsed] = useState(false);
    const [userSettings, setUserSettings] = useState(() => loadUserSettings());

    const apiKeyMissing = useMemo(
        () => !userSettings.apiKey?.trim(),
        [userSettings.apiKey]
    );

    const refreshKnowledgeBase = useCallback(async () => {

        setUploadsLoading(true);
        setUploadsError("");

        try {

            const response = await listUploads();

            setUploads(response.files ?? []);

        } catch (error) {

            setUploadsError("Unable to load uploaded PDFs.");

        } finally {

            setUploadsLoading(false);

        }

    }, []);

    useEffect(() => {

        refreshKnowledgeBase();

    }, [refreshKnowledgeBase]);

    const handleNavigate = (view) => {

        setActiveView(view);

        if (view !== "knowledge") {
            setLibraryOpen(false);
        }

    };

    const handleSaveSettings = (settings) => {

        saveUserSettings(settings);
        setUserSettings(settings);

    };

    return (

        <div className="h-[100dvh] overflow-hidden bg-[#f4f6f8] text-[#24211f]">

            {libraryOpen && (

                <button
                    type="button"
                    aria-label="Close sidebar"
                    className="fixed inset-0 z-30 bg-[#24211f]/30 lg:hidden"
                    onClick={() => setLibraryOpen(false)}
                />

            )}

            <div className="flex h-full min-h-0">

                <Sidebar
                    activeView={activeView}
                    open={libraryOpen}
                    collapsed={libraryCollapsed}
                    uploads={uploads}
                    uploadsLoading={uploadsLoading}
                    uploadsError={uploadsError}
                    uploadProcessing={uploadProcessing}
                    apiKey={userSettings.apiKey}
                    apiKeyMissing={apiKeyMissing}
                    onClose={() => setLibraryOpen(false)}
                    onToggleCollapse={() => setLibraryCollapsed((current) => !current)}
                    onNavigate={handleNavigate}
                    onProcessingChange={setUploadProcessing}
                    onRefresh={refreshKnowledgeBase}
                    onRebuild={refreshKnowledgeBase}
                />

                <div className="flex min-h-0 min-w-0 flex-1 flex-col">

                    <Header
                        viewLabel={VIEW_LABELS[activeView] ?? "Home"}
                        onToggleLibrary={() => setLibraryOpen(true)}
                    />

                    {activeView === "settings" ? (

                        <SettingsPanel
                            apiKey={userSettings.apiKey}
                            selectedModel={userSettings.selectedModel}
                            onSave={handleSaveSettings}
                        />

                    ) : (

                        <ChatContainer
                            apiKey={userSettings.apiKey}
                            selectedModel={userSettings.selectedModel}
                            apiKeyMissing={apiKeyMissing}
                            inputDisabled={uploadProcessing}
                        />

                    )}

                </div>

            </div>

        </div>

    );

}

export default Home;
