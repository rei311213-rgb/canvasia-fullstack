# Canvasia Full Stack — Phase 3

Canvasia now has a database-backed template and asset library in addition to the persistent editor from Phase 2.

## Stack
- Next.js + TypeScript
- Prisma + PostgreSQL/Neon
- Secure cookie sessions
- Zod validation

## Phase 3
- Template API with category/search support
- Seeded reusable templates
- Asset API scoped to the signed-in user plus public assets
- Editor template browser
- Editor asset browser
- Apply a template directly to the current design
- Add image assets to the canvas
- Expanded element properties

## Setup
1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to your Neon connection string.
3. Set a long random `AUTH_SECRET`.
4. Run `npm install`.
5. Run `npx prisma db push`.
6. Run `npx prisma db seed`.
7. Run `npm run dev`.

## Asset upload note
The Phase 3 API accepts an image URL or a data-image payload so the feature can be tested immediately. For production-scale image storage, connect the `imageUrl` field to an object-storage provider such as S3-compatible storage or Cloudinary rather than storing large data URLs in PostgreSQL.

## Phase 4 additions
- Browser image upload into the authenticated user's asset library.
- Project thumbnails generated from the editor state.
- PNG/JPG export from the editor canvas.
- PDF export using jsPDF.
- Autosave after changes settle for 2.5 seconds.
- Project version snapshots and version restore.

### Storage note
This phase uses database-backed data URLs for uploaded images to keep the starter self-contained. For production at scale, replace this upload route with S3, Cloudinary, or another object-storage provider and store only the resulting URL in `Asset.imageUrl`.


## Phase 5 features
- Public view-only share links at `/share/[token]`.
- Disable public sharing from the editor.
- Duplicate projects.
- Owner-managed project members with VIEWER/EDITOR roles.
- Security headers via `next.config.ts`.
- For production, use a managed object store for uploaded images rather than database data URLs.

## Production checklist
1. Set `DATABASE_URL` to the Neon pooled connection string.
2. Set a long random `AUTH_SECRET`.
3. Run `npx prisma migrate deploy` during deployment.
4. Configure object storage/CDN for uploads.
5. Deploy from GitHub to Vercel and set the same environment variables.
6. Use HTTPS and a custom domain in production.
