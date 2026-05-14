import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
  updateStudent: (updated: Student) => Promise<void>
  deleteStudent: (id: string) => Promise<void>
}

function StudentDetail({ students, updateStudent, deleteStudent }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()

  const student = students.find(s => s.studentId === id)

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Student | null>(student || null)

  if (!student || !formData) {
    return (
      <div className="container mt-4">
        <p className="text-danger">Student not found.</p>
      </div>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'yearLevel'
        ? Number(e.target.value)
        : e.target.value
    })
  }

  const handleSave = async () => {
    if (!formData.fullName || !formData.course || !formData.email) {
      alert('Please fill in all fields.')
      return
    }

    await updateStudent({
      ...formData,
      yearLevel: formData.yearLevel as 1 | 2 | 3 | 4
    })

    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this student record?')) {
      await deleteStudent(student.studentId)
      navigate('/')
    }
  }

  const handleCancel = () => {
    setFormData(student)
    setIsEditing(false)
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4">
            {isEditing ? 'Edit Student' : 'Student Profile'}
          </h4>

          {isEditing ? (
            <div>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Course</label>
                <input
                  type="text"
                  className="form-control"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Year Level</label>
                <select
                  className="form-select"
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleChange}
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="enrolled">Enrolled</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p><strong>Full Name:</strong> {student.fullName}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <p><strong>Year Level:</strong> Year {student.yearLevel}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className="badge fw-normal"
                  style={{
                    backgroundColor: student.status === 'enrolled' ? '#d1fae5' : '#fee2e2',
                    color: student.status === 'enrolled' ? '#065f46' : '#991b1b',
                    fontSize: '12px'
                  }}
                >
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </p>

              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                  Back
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default StudentDetail
