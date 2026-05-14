const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://20237041_db_user:20237041@cluster0.vmfoxeo.mongodb.net/Final_Project?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Successfully Connected to MongoDB"))
    .catch(console.error);

// ─── Student Schema ────────────────────────────────────────────────────────────
const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    course: { type: String, required: true },
    yearLevel: { type: Number, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["enrolled", "inactive"], default: "enrolled" },
    createdAt: { type: Date, default: Date.now }
});
const Student = mongoose.model("Student", studentSchema, "Students");

// ═══════════════════════════════════════════════════════════════════════════════
// STUDENT ROUTES
// ═══════════════════════════════════════════════════════════════════════════════

app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

app.get("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch student" });
    }
});

app.post("/api/students", async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ error: "Failed to create student" });
    }
});

app.put("/api/students/:id", async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Student not found" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update student" });
    }
});

app.delete("/api/students/:id", async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Student not found" });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete student" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
