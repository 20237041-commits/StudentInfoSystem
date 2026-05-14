import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button, FloatingLabel } from 'react-bootstrap'

type Student = {
  studentId: string
  fullName: string
  course: string
  yearLevel: 1 | 2 | 3 | 4
  email: string
  status: 'enrolled' | 'inactive'
}

type Props = {
  addStudent: (student: Omit<Student, 'studentId'>) => Promise<void>
}

function StudentForm({ addStudent }: Props) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    course: '',
    yearLevel: 1,
    email: '',
    status: 'enrolled'
  })
  const [errors, setErrors] = useState({
    fullName: '',
    course: '',
    email: ''
  })
  const [saving, setSaving] = useState(false)

  const validate = () => {
    const newErrors = { fullName: '', course: '', email: '' }
    let valid = true

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
      valid = false
    }
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required.'
      valid = false
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    await addStudent({
      ...formData,
      yearLevel: formData.yearLevel as 1 | 2 | 3 | 4,
      status: formData.status as 'enrolled' | 'inactive'
    })
    setSaving(false)
    navigate('/')
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Card.Title className="fw-bold mb-4">Add Student</Card.Title>

          <Form onSubmit={handleSubmit}>
            <FloatingLabel label="Full Name" className="mb-1">
              <Form.Control
                type="text"
                placeholder="Name"
                value={formData.fullName}
                isInvalid={!!errors.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </FloatingLabel>
            {errors.fullName && (
              <div className="text-danger small mb-3">{errors.fullName}</div>
            )}

            <FloatingLabel label="Course" className="mb-1">
              <Form.Control
                type="text"
                placeholder="Course"
                value={formData.course}
                isInvalid={!!errors.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              />
            </FloatingLabel>
            {errors.course && (
              <div className="text-danger small mb-3">{errors.course}</div>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">YEAR LEVEL</Form.Label>
              <Form.Select
                value={formData.yearLevel}
                onChange={(e) => setFormData({ ...formData, yearLevel: Number(e.target.value) })}
              >
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
                <option value={4}>4th Year</option>
              </Form.Select>
            </Form.Group>

            <FloatingLabel label="Email" className="mb-1">
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email}
                isInvalid={!!errors.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FloatingLabel>
            {errors.email && (
              <div className="text-danger small mb-3">{errors.email}</div>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">STATUS</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="enrolled">Enrolled</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid gap-2 mt-3">
              <Button
                variant="primary"
                type="submit"
                className="py-2 fw-bold"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Add Student'}
              </Button>
              <Button variant="link" className="text-muted" onClick={() => navigate('/')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default StudentForm
