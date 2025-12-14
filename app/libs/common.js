const FormData = require("form-data");

// libs/common.js
export default async function imgUpload(file) {
  const formData = new FormData();
  formData.append("source", file);

  const res = await fetch("https://skimming.shipgpt.ai/save-source", {
    method: "POST",
    headers: {
      "Gcp-bucket-name": "marketlytics_assets",
    },
    body: formData,
  });

  const json = await res.json();
  return json?.success?.path || null;
}
