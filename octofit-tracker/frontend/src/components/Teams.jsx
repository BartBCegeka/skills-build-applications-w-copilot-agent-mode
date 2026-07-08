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

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const codespacesEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    const localhostEndpoint = 'http://localhost:8000/api/teams/'

    return codespaceName ? codespacesEndpoint : localhostEndpoint
  }, [])

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true)
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Failed to load teams (${response.status})`)
        }

        const payload = await response.json()
        setTeams(normalizeListResponse(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [endpoint])

  return (
    <section className="container py-4">
      <h2 className="mb-3">Teams</h2>
      <p className="text-body-secondary small mb-3">Endpoint: {endpoint}</p>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-12 col-md-6" key={team._id ?? team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="mb-1">
                    <strong>Coach:</strong> {team.coach?.name ?? 'N/A'}
                  </p>
                  <p className="mb-0">
                    <strong>Members:</strong> {team.members?.length ?? 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
