# GoCreative Programs — website concept

A responsive React + TypeScript concept for GoCreative Programs, built with Vinext, custom CSS, Lucide icons, and accessible Radix UI controls.

## Run locally

```sh
npm install
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open the local URL printed by the development server. `npm run build` creates a production build.

## Vercel deployment

Public concept: https://gocreative-programs-concept.vercel.app

`vercel.json` configures a native Next.js build for Vercel. Run `npm run build:vercel` to check that build locally, then use `npx vercel --prod` from this directory to publish to the linked Vercel project. Vercel supplies the public `vercel.app` address. The original Vinext development and Sites build commands remain available.

## Content and music

The program descriptions, photos, partner logos, biography, contact information, and awards are sourced from https://gocreativeprograms.com/new-page and its linked program and press pages. The advisory board has been omitted. The full original content is preserved in dedicated pages with the original navigation. All 14 original Trusted by logos appear on the home page. See CONTENT-SOURCES.md for the page inventory and source details.

The music player uses real public Apple Music / iTunes song previews for Mi Amigo Hamlet. These are excerpts, not full recordings. No music autoplays before interaction. Album metadata and streaming URLs live in `app/tracks.json`; replace preview URLs with licensed full recordings when available. The bilingual Guacamole preview uses its single artwork. External previews require an internet connection and have retry and full-song links if unavailable.

The booking buttons open an email draft addressed to the original business contact. They do not send messages automatically. The concept has no booking database or contact-form backend.

Motion honors the system reduced-motion preference and can be paused from the ribbon or footer. The player supports seeking, previous/next, mute, volume, keyboard control, and a selectable playlist.

This is a separate design concept. It does not alter the original website.
