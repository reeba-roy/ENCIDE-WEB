/**
 * Cloudinary unsigned upload utility.
 *
 * Uses the REST upload endpoint — no SDK required.
 * Images are organized into per-event folders so each image
 * is traceable back to its event.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Slugify a string for use as a Cloudinary folder segment.
 * e.g. "Hackathon 2026!" → "hackathon-2026"
 */
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Upload a single image file to Cloudinary.
 *
 * @param {File}   file       - The File object from an <input> or drop event.
 * @param {string} folder     - Cloudinary folder path, e.g. "encide/events/hackathon-2026".
 * @param {string} publicId   - Public ID (filename) for the asset, e.g. "poster" or "payment-qr".
 * @param {(progress: number) => void} [onProgress] - Optional 0-100 progress callback.
 * @returns {Promise<string>} - Resolves to the secure URL of the uploaded image.
 */
export const uploadToCloudinary = (file, folder, publicId, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      reject(
        new Error(
          "Cloudinary credentials missing. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env"
        )
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    // Combine folder + publicId into a single public_id path.
    // This is more reliable than the separate "folder" param,
    // which unsigned presets can override.
    const fullPublicId = publicId ? `${folder}/${publicId}` : folder;
    formData.append("public_id", fullPublicId);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", UPLOAD_URL);

    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
    }

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data.secure_url);
        } catch {
          reject(new Error("Failed to parse Cloudinary response"));
        }
      } else {
        reject(
          new Error(`Cloudinary upload failed with status ${xhr.status}: ${xhr.responseText}`)
        );
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
    xhr.addEventListener("abort", () => reject(new Error("Upload aborted")));

    xhr.send(formData);
  });
};

/**
 * Build the Cloudinary folder path for a given event.
 * @param {string} eventTitle - The event's title.
 * @returns {string} Folder path, e.g. "encide/events/hackathon-2026"
 */
export const getEventFolder = (eventTitle) =>
  `encide/events/${slugify(eventTitle || "untitled")}`;
