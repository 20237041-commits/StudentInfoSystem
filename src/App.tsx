import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './links/Navbar'
import StudentList from './links/StudentList'
import StudentForm from './links/StudentForm'
import StudentDetail from './links/StudentDetail'
import Dashboard from './links/Dashboard'

type Student = {
  studentId: string
  fullName: string
  course: string
  yearLevel: 1 | 2 | 3 | 4
  email: string
  status: 'enrolled' | 'inactive'
}

const BASE_URL = 'https://finalsproject-production-94b5.up.railway.app'

function App() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // GET all students on mount
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${BASE_URL}/api/students`)
        const data = await res.json()
        // map _id to studentId
        const mapped = data.map((s: any) => ({
          studentId: s._id,
          fullName: s.fullName,
          course: s.course,
          yearLevel: s.yearLevel,
          email: s.email,
          status: s.status
        }))
        setStudents(mapped)
      } catch (err) {
        setError('Failed to fetch students')
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  // POST create student
  const addStudent = async (student: Omit<Student, 'studentId'>) => {
    try {
      const res = await fetch(`${BASE_URL}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      })
      const data = await res.json()
      const newStudent: Student = {
        studentId: data._id,
        fullName: data.fullName,
        course: data.course,
        yearLevel: data.yearLevel,
        email: data.email,
        status: data.status
      }
      setStudents([...students, newStudent])
    } catch (err) {
      setError('Failed to create student')
    }
  }

  // PUT update student
  const updateStudent = async (updated: Student) => {
    try {
      const res = await fetch(`${BASE_URL}/api/students/${updated.studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: updated.fullName,
          course: updated.course,
          yearLevel: updated.yearLevel,
          email: updated.email,
          status: updated.status
        })
      })
      const data = await res.json()
      const updatedStudent: Student = {
        studentId: data._id,
        fullName: data.fullName,
        course: data.course,
        yearLevel: data.yearLevel,
        email: data.email,
        status: data.status
      }
      setStudents(students.map(s =>
        s.studentId === updated.studentId ? updatedStudent : s
      ))
    } catch (err) {
      setError('Failed to update student')
    }
  }

  // DELETE student
  const deleteStudent = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/api/students/${id}`, {
        method: 'DELETE'
      })
      setStudents(students.filter(s => s.studentId !== id))
    } catch (err) {
      setError('Failed to delete student')
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        {loading && (
          <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2">Loading students...</p>
          </div>
        )}
        {error && (
          <div className="container mt-5">
            <div className="alert alert-danger">{error}</div>
          </div>
        )}
        {!loading && !error && (
          <Routes>
            <Route path="/dashboard" element={<Dashboard students={students} />} />
            <Route path="/" element={
              <StudentList
                students={students}
                deleteStudent={deleteStudent}
              />}
            />
            <Route path="/student/new" element={
              <StudentForm addStudent={addStudent} />}
            />
            <Route path="/student/:id" element={
              <StudentDetail
                students={students}
                updateStudent={updateStudent}
                deleteStudent={deleteStudent}
              />}
            />
          </Routes>
        )}
      </main>
    </BrowserRouter>
  )
}

export default App
