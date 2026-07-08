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

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const baseApiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : 'http://localhost:8000/api'

    return `${baseApiUrl}/activities/`
  }, [])

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true)
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Failed to load activities (${response.status})`)
        }

        const payload = await response.json()
        setActivities(normalizeListResponse(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [endpoint])

  return (
    <section className="container py-4">
      <h2 className="mb-3">Activities</h2>
      <p className="text-body-secondary small mb-3">Endpoint: {endpoint}</p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Team</th>
                <th>Duration (min)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.activityDate}`}>
                  <td>{activity.type}</td>
                  <td>{activity.user?.name ?? 'N/A'}</td>
                  <td>{activity.team?.name ?? 'N/A'}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.caloriesBurned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
