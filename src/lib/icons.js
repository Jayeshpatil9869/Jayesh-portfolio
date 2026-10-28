import { Icon, addCollection } from "@iconify/react/offline";

// Icons are bundled so the site makes no runtime requests to api.iconify.design
// (needed for a strict Content-Security-Policy and for privacy).
addCollection({
  prefix: "lucide",
  width: 24,
  height: 24,
  icons: {
    "arrow-up-right": {
      body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"/>',
    },
  },
});

addCollection({
  prefix: "mdi",
  width: 24,
  height: 24,
  icons: {
    "star-four-points": {
      body: '<path fill="currentColor" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z"/>',
    },
  },
});

addCollection({
  prefix: "material-symbols-light",
  width: 24,
  height: 24,
  icons: {
    square: {
      body: '<path fill="currentColor" d="M4 20V4h16v16z"/>',
    },
  },
});

export { Icon };
