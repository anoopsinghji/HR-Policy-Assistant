import api from "../services/api";
import { buildAuthorizationHeader } from "../services/openRouterSettings";

export async function uploadPdf(file, apiKey) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(

        "/upload",

        formData,

        {
            headers: buildAuthorizationHeader(apiKey)
        }

    );

    return response.data;

}

export async function listUploads() {

    const response = await api.get("/uploads");

    return response.data;

}

export async function deleteUpload(filename, apiKey) {

    const response = await api.delete(

        `/uploads/${encodeURIComponent(filename)}`,

        {
            headers: buildAuthorizationHeader(apiKey)
        }

    );

    return response.data;

}

export async function rebuildIndex(apiKey) {

    const response = await api.post(

        "/uploads/rebuild",

        null,

        {
            headers: buildAuthorizationHeader(apiKey)
        }

    );

    return response.data;

}