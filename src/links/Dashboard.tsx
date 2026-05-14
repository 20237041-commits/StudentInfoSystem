import { useNavigate } from 'react-router-dom'

type Student = {
  studentId: string
  fullName: string
  course: string
  yearLevel: 1 | 2 | 3 | 4
  email: string
  status: 'enrolled' | 'inactive'
}

type Props = {
  students: Student[]
}

function Dashboard({ students }: Props) {
  const navigate = useNavigate()

  const total = students.length
  const enrolled = students.filter(s => s.status === 'enrolled').length
  const inactive = students.filter(s => s.status === 'inactive').length
  const uniqueCourses = [...new Set(students.map(s => s.course))]

  const courseStats = uniqueCourses.map(name => {
    const cs = students.filter(s => s.course === name)
    const enrolledCount = cs.filter(s => s.status === 'enrolled').length
    return { name, total: cs.length, enrolledCount }
  }).sort((a, b) => b.total - a.total)

  const yearDist = [1, 2, 3, 4].map(y => ({
    year: y,
    label: ['', '1st Year', '2nd Year', '3rd Year', '4th Year'][y],
    count: students.filter(s => s.yearLevel === y).length,
    percent: total
      ? Math.round((students.filter(s => s.yearLevel === y).length / total) * 100)
      : 0
  }))

  if (total === 0) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-muted mb-3">No student records yet.</p>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/student/new')}>
          Add Student
        </button>
      </div>
    )
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '860px' }}>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Students', value: total },
          { label: 'Enrolled', value: enrolled },
          { label: 'Inactive', value: inactive },
          { label: 'Courses', value: uniqueCourses.length },
        ].map(stat => (
          <div className="col-6 col-md-3" key={stat.label}>
            <div className="card border h-100" style={{ borderColor: '#e5e7eb' }}>
              <div className="card-body py-3 px-3">
                <p className="text-muted mb-1" style={{ fontSize: '12px' }}>{stat.label}</p>
                <h5 className="fw-semibold mb-0">{stat.value}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-4">

        {/* Year Level Distribution */}
        <div className="col-md-6">
          <div className="card border h-100" style={{ borderColor: '#e5e7eb' }}>
            <div className="card-body">
              <p className="text-muted mb-3" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Year Level Breakdown
              </p>
              {yearDist.map(({ year, label, count, percent }) => (
                <div key={year} className="mb-2">
                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-muted">{label}</small>
                    <small className="text-muted">{count}</small>
                  </div>
                  <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#f3f4f6' }}>
                    <div
                      className="progress-bar bg-dark"
                      style={{ width: `${percent}%`, borderRadius: '2px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="col-md-6">
          <div className="card border h-100" style={{ borderColor: '#e5e7eb' }}>
            <div className="card-body">
              <p className="text-muted mb-3" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Highlights
              </p>

              <div className="mb-4">
                <p className="text-muted mb-1" style={{ fontSize: '11px' }}>LARGEST COURSE</p>
                <p className="fw-semibold mb-0">{courseStats[0]?.name}</p>
                <small className="text-muted">
                  {courseStats[0]?.total} student(s) &middot; {courseStats[0]?.enrolledCount} enrolled
                </small>
              </div>

              <div>
                <p className="text-muted mb-1" style={{ fontSize: '11px' }}>ENROLLMENT RATE</p>
                <p className="fw-semibold mb-0">
                  {total ? Math.round((enrolled / total) * 100) : 0}%
                </p>
                <small className="text-muted">
                  {enrolled} enrolled out of {total} students
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Table */}
      <div className="card border" style={{ borderColor: '#e5e7eb' }}>
        <div className="card-body p-0">
          <table className="table table-hover mb-0" style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th className="fw-normal text-muted border-bottom px-3 py-2">#</th>
                <th className="fw-normal text-muted border-bottom px-3 py-2">Course</th>
                <th className="fw-normal text-muted border-bottom px-3 py-2">Total</th>
                <th className="fw-normal text-muted border-bottom px-3 py-2">Enrolled</th>
                <th className="fw-normal text-muted border-bottom px-3 py-2">Inactive</th>
              </tr>
            </thead>
            <tbody>
              {courseStats.map((c, i) => (
                <tr key={c.name}>
                  <td className="px-3 py-2 text-muted">{i + 1}</td>
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2 text-muted">{c.total}</td>
                  <td className="px-3 py-2">
                    <span
                      className="badge fw-normal"
                      style={{
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        fontSize: '12px'
                      }}
                    >
                      {c.enrolledCount}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className="badge fw-normal"
                      style={{
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        fontSize: '12px'
                      }}
                    >
                      {c.total - c.enrolledCount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
