const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const subjectsDir = path.join(process.cwd(), 'Subjects');
    const subjects = {};

    try {
        fs.readdirSync(subjectsDir).forEach((subject) => {
            const subjectPath = path.join(subjectsDir, subject);
            if (fs.statSync(subjectPath).isDirectory()) {
                subjects[subject] = [];
                fs.readdirSync(subjectPath).forEach((file) => {
                    if (file.endsWith('.pdf')) {
                        subjects[subject].push(file);
                    }
                });
            }
        });

        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error reading subjects directory:', error);
        res.status(500).json({ error: 'Failed to load subjects and papers.' });
    }
}
