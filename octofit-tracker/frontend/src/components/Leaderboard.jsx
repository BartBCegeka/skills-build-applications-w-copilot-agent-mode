import { useEffect, useMemo, useState } from 'react'

function normalizeListResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}

function Leaderboard() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const baseApiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : 'http://localhost:8000/api'

    return `${baseApiUrl}/leaderboard/`
  }, [])

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true)
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Failed to load leaderboard (${response.status})`)
        }

        const payload = await response.json()
        setRows(normalizeListResponse(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [endpoint])

  return (
    <section className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      <p className="text-body-secondary small mb-3">Endpoint: {endpoint}</p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
                <th>Weekly Minutes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id ?? `${row.rank}-${row.user?.name}`}>
                  <td>{row.rank}</td>
                  <td>{row.user?.name ?? 'N/A'}</td>
                  <td>{row.team?.name ?? 'N/A'}</td>
                  <td>{row.points}</td>
                  <td>{row.weeklyMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
