# OctoFit Frontend

This frontend uses React 19, Vite, Bootstrap, and `react-router-dom` to display:

- Users
- Teams
- Activities
- Leaderboard
- Workouts

## Environment Variable

Define `VITE_CODESPACE_NAME` (for example in `.env.local`) when running in Codespaces.

Example `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API calls use:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to localhost:

`http://localhost:8000/api/[component]/`

This prevents invalid URLs such as `https://undefined-8000...`.
