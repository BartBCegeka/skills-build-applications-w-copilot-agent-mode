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

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const codespacesEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    const localhostEndpoint = 'http://localhost:8000/api/workouts/'

    return codespaceName ? codespacesEndpoint : localhostEndpoint
  }, [])

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true)
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Failed to load workouts (${response.status})`)
        }

        const payload = await response.json()
        setWorkouts(normalizeListResponse(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [endpoint])

  return (
    <section className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      <p className="text-body-secondary small mb-3">Endpoint: {endpoint}</p>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-12 col-md-6" key={workout._id ?? workout.title}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p className="mb-1">
                    <strong>Difficulty:</strong> {workout.difficulty}
                  </p>
                  <p className="mb-1">
                    <strong>Duration:</strong> {workout.durationMinutes} min
                  </p>
                  <p className="mb-0">
                    <strong>Focus:</strong> {workout.focusArea}
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

export default Workouts
