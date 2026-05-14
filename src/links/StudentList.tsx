import { useState } from 'react'
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
  deleteStudent: (id: string) => void
}

function StudentList({ students, deleteStudent }: Props) {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [courseFilter, setCourseFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Get unique courses for the dropdown
  const uniqueCourses = ['All', ...new Set(students.map(s => s.course))]

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this student record?')) {
      deleteStudent(id)
    }
  }

  // Combined Filtering Logic
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = courseFilter === 'All' || s.course === courseFilter
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter

    return matchesSearch && matchesCourse && matchesStatus
  })

  return (
    <div className="container mt-4" style={{ maxWidth: '860px' }}>

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold mb-0">Student Records</h4>
        <button
          className="btn btn-dark btn-sm shadow-sm px-3"
          style={{ backgroundColor: '#111827', border: 'none', fontSize: '13px' }}
          onClick={() => navigate('/student/new')}
        >
          + Add Student
        </button>
      </div>

      {/* Filter Controls Section */}
      <div className="row g-2 mb-4">
        {/* Search by Name */}
        <div className="col-md-5">
          <input
            type="text"
            className="form-control form-control-sm shadow-sm"
            placeholder="Search student..."
            style={{ borderColor: '#e5e7eb', padding: '8px 12px', fontSize: '14px', borderRadius: '6px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter by Course */}
        <div className="col-6 col-md-4">
          <select
            className="form-select form-select-sm shadow-sm"
            style={{ borderColor: '#e5e7eb', fontSize: '14px', borderRadius: '6px' }}
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="All">All Courses</option>
            {uniqueCourses.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Filter by Status */}
        <div className="col-6 col-md-3">
          <select
            className="form-select form-select-sm shadow-sm"
            style={{ borderColor: '#e5e7eb', fontSize: '14px', borderRadius: '6px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="enrolled">Enrolled</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="card border text-center py-5" style={{ borderColor: '#e5e7eb' }}>
          <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
            No matching students found.
          </p>
        </div>
      ) : (
        <div className="card border shadow-sm" style={{ borderColor: '#e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <table className="table table-hover mb-0" style={{ fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th className="fw-normal text-muted border-bottom px-4 py-2" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Full Name</th>
                <th className="fw-normal text-muted border-bottom px-3 py-2" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Course</th>
                <th className="fw-normal text-muted border-bottom px-3 py-2 text-center" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Year</th>
                <th className="fw-normal text-muted border-bottom px-3 py-2 text-center" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                <th className="fw-normal text-muted border-bottom px-4 py-2 text-end" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.studentId} style={{ borderColor: '#f3f4f6' }}>
                  <td className="px-4 py-3 fw-medium">{s.fullName}</td>
                  <td className="px-3 py-3 text-muted">{s.course}</td>
                  <td className="px-3 py-3 text-center text-muted">Year {s.yearLevel}</td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className="badge fw-normal"
                      style={{
                        backgroundColor: s.status === 'enrolled' ? '#d1fae5' : '#fee2e2',
                        color: s.status === 'enrolled' ? '#065f46' : '#991b1b',
                        fontSize: '11px',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <div className="d-flex justify-content-end gap-3">
                      <button
                        className="btn btn-link p-0 text-decoration-none fw-medium"
                        style={{ fontSize: '13px', color: '#2563eb' }}
                        onClick={() => navigate(`/student/${s.studentId}`)}
                      >
                        View
                      </button>
                      <div style={{ width: '1px', height: '14px', backgroundColor: '#e5e7eb', alignSelf: 'center' }}></div>
                      <button
                        className="btn btn-link p-0 text-decoration-none fw-medium"
                        style={{ fontSize: '13px', color: '#dc2626' }}
                        onClick={() => handleDelete(s.studentId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default StudentList
