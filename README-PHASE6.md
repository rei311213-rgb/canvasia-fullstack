# Canvasia Phase 6 — Production Release

## Final release hardening

### Before deployment
1. Set `DATABASE_URL` to the production Neon PostgreSQL connection string.
2. Set a strong production authentication/session secret.
3. Configure production object storage credentials for uploads.
4. Run Prisma migrations:
   `npx prisma migrate deploy`
5. Seed only the required production templates/assets.
6. Set the production application URL.
7. Build:
   `npm run build`
8. Start:
   `npm run start`

### GitHub
```bash
git add .
git commit -m "Canvasia production release"
git push origin main
```

### Vercel
Connect the GitHub repository and configure all production environment variables.

### Neon
Use the production database URL and run migrations during deployment.

## Release checklist

- Authentication tested
- Protected routes tested
- Project ownership tested
- Templates tested
- Asset uploads tested
- Export tested
- Autosave tested
- Version restore tested
- Public sharing tested
- Collaboration permissions tested
- Mobile layout reviewed
- Production environment variables configured
- Database migrations applied

## Phase 7 — Personal Professional Library
- Curated template and element library
- Filterable borders, shapes, icons, church, school and certificate components
- Reusable template starters in the editor
- Personal-use workflow; no subscription/billing layer added
