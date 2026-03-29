import {API_ENDPOINTS} from "./api-endpoints";
import {normalizeImageUrl} from "./normalize-image-url";

const { VITE_CLOUDINARY_UPLOAD_PRESET } = import.meta.env;

const CLOUDINARY_UPLOAD_PRESET = VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadProfileImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(API_ENDPOINTS.CLOUDINARY.UPLOAD, {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type") || "";

    const json = contentType.includes("application/json")
      ? await response.json().catch(() => null)
      : null; // if content type is JSON, parse it; otherwise set JSON to null

    if (!response.ok) {
      /*
       * try to get error message from JSON; if not available, use status text; if still not available,
       * use generic HTTP status message.
      */
      const message = (json && json.error && json.error.message) ||
        response.statusText || `HTTP ${response.status}`;

      return { ok: false, error: message, status: response.status, body: json };
    }

    /*
     * if JSON parsing succeeded, use it;
     * otherwise try to parse again (in case content type was incorrect) or return null if parsing failed.
    */
    const data = json ?? (await response.json().catch(() => null));

    return { ok: true, url: normalizeImageUrl(data?.secure_url ?? data?.url), body: data };
  } catch (error) {
    console.error("error uploading image:", error);
    throw error;
  }
}

export default uploadProfileImage;