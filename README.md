# Maveloa Café — Local Development

This is a standalone Vite + React + TypeScript project for running the Maveloa Café website locally on macOS. It does not require Replit, a backend server, or VS Code Live Server.

## Requirements

- macOS
- Node.js 22 LTS (22.12 or newer) and npm
- Visual Studio Code

## Run in VS Code

1. Unzip the downloaded project.
2. In VS Code, choose **File → Open Folder…** and open the `maveloa-cafe-local` folder.
3. Choose **Terminal → New Terminal**.
4. Run:

   ```sh
   npm install
   npm run dev
   ```

Vite opens the local website in your browser. If it does not, open the URL printed in the terminal, usually `http://localhost:5173`.

Stop the development server with **Control+C** in the terminal.

## Build and preview

```sh
npm run build
npm run preview
```

The production build is written to `dist/`. Vite prints a local preview URL when the preview server starts.

## Project notes

- All page source, menu and testimonial data, styles, images, favicon, and font files are included.
- DM Sans and Playfair Display are served from local files in `public/fonts`; the site does not fetch its fonts from Google while running.
- The enquiry form is a front-end demo. It does not save or send messages, and the contact details shown on the page are placeholders.
- No API server is needed for this website.
