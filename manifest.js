// you can copy the base structure of manifest object.
export const manifestForPlugIn = {
    registerType: "prompt",
    includeAssests: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
    manifest: {
      name: "Vansly",
      short_name: "Vansly",
      description: "Aplicação para passgeiros e motoristas de universidades",
      icons: [
        {
          src: "/android-chrome-192x192.jpg",
          sizes: "192x192",
          type: "image/png",
          purpose: "any", // Alterado para 'any'
        },
        {
          src: "/android-chrome-512x512.jpg",
          sizes: "512x512",
          type: "image/png",
          purpose: "any", // Alterado para 'any'
        },
        {
          src: "/apple-touch-icon.jpg",
          sizes: "192x192",
          type: "image/png",
          purpose: "any", // Alterado para 'any'
        },
        {
          src: "/maskable_icon.jpg",
          sizes: "512x512",
          type: "image/png",
          purpose: "any", // Alterado para 'any'
        },
      ],
      theme_color: "#000000",
      background_color: "#000000",
      display: "standalone",
      scope: "/",
      start_url: "/",
      orientation: "portrait",
    },
  };