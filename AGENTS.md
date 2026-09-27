# GoCreative Programs

- Preserve the existing layout, wording, photographs, navigation, and music player unless the user explicitly asks to change them.
- Keep the design friendly, colorful, and appropriate for children's music and art programs.
- After every successful change, check the production build and the affected pages on desktop and mobile, then commit and push to `origin/main` and deploy the existing Vercel app. The user has explicitly requested this workflow; do not ask for confirmation again.
- Check the production build with `npm run build:vercel`.
- Deploy from this directory with `npx --yes vercel@latest deploy --prod --yes --scope leow427s-projects`.
- Production URL: https://gocreative-programs-concept.vercel.app
- GitHub repository: https://github.com/leow427/dads-site
- Use the existing Vercel Hobby project. Do not create a new project, change plans, or switch hosting providers.
- Keep credentials, `.env*`, `.vercel`, and generated build files out of Git.
