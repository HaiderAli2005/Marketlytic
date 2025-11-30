"use client";

import { useEffect } from "react";

export default function RemoveExtensionAttributes() {
  useEffect(() => {
    const attrsToRemove = [
      "cz-shortcut-listen",  // Added by shortcut/keyboard extensions
      "data-gramm",          // Grammarly
      "data-new-gr-c-s-check-loaded",
      "data-new-gr-c-s-loaded"
    ];

    attrsToRemove.forEach((attr) => {
      if (document.body.hasAttribute(attr)) {
        document.body.removeAttribute(attr);
      }
    });
  }, []);

  return null;
}
