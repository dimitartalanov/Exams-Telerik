function solve() {
    var Course = {
        init: function (title, presentations) {
            //title-js oop, presentation-[lec1,lec2,lec3]
            validateTitle(title);
            validatePresentations(presentations);

            this.title = title;
            this.presentations = presentations;
            this.students = [];
//
            return this;
        },
        addStudent: function (name) {//console.log(arguments[1]);
            if (!name) {
                throw 'addStudent can not name be empty'
            }
            if(name.split(' ').length>2){
                throw 'name length can not be >2'
            }
            let firstName = name.split(' ')[0];
            let lastName = name.split(' ')[1];
            validateName(firstName);
            validateName(lastName);
            let id = this.students.length + 1;
            let student = {
                firstName: firstName,
                lastName: lastName,
                id: id,
                homeworks: [],
                examScore: 0,//if studentsIDs not listed get 0 points
                finalScore: 0
            };
            this.students.push(student);

            return id;
        },
        getAllStudents: function () {//console.log(arguments);
            return this.students.map(s => {
                return {
                    firstname: s.firstName,
                    lastname: s.lastName,
                    id: s.id
                };
            });
        },
        submitHomework: function (studentID, homeworkID) {//console.log(arguments);
            if (+studentID < 1 || +studentID > this.students.length) {
                throw 'Invalid student ID!';
            }

            if (+homeworkID < 1 || +homeworkID > this.presentations.length) {
                throw 'Invalid homework ID!';
            }
            let currStudent = this.students[studentID - 1];

            if (currStudent.homeworks.indexOf(homeworkID) === -1) {
                currStudent.homeworks.push(homeworkID);//push in orig students bec is ref
            }
            return this;
        },
        pushExamResults: function (results) {//console.log(arguments);
            if (!results || !Array.isArray(results)) {
                throw 'Exam results must be passed as an array!';
            }

            for (let i = 0, len = results.length; i < len; i += 1) {
                let currStudentID = results[i].StudentID,
                    currStudentScore = results[i].score;
                if (!Number(currStudentScore) && !isFinite(currStudentScore)) {
                    throw 'Student score must be a valid number!';
                }
                currStudentID = +currStudentID;
                currStudentScore = +currStudentScore;

                if (currStudentID < 1 || currStudentID > this.students.length) {
                    throw 'Invalid student ID!';
                }
                if (this.students[currStudentID - 1].examScore !== 0) {
                    throw 'This student already has a score!';
                }
                this.students[currStudentID - 1].examScore = currStudentScore;//add prop examScore for topStudents
            }
            return this
        },
        getTopStudents: function () {//console.log(arguments);
            this.students.forEach(student => {
                let hwScore = student.homeworks.length / this.presentations.length;
                student.finalScore = (0.75 * student.examScore) + (0.25 * hwScore);
            });

            this.students.sort((st1, st2) => {
                return st2.finalScore - st1.finalScore;
            });
            let topStudentsCount = 10,
                topTenStudents = [];

            if (this.students.length < 10) {
                topStudentsCount = this.students.length;
            }

            for (let i = 0; i < topStudentsCount; i += 1) {
                let topStudent = {
                    firstName: this.students[i].firstName,
                    lastName: this.students[i].lastName,
                    id: this.students[i].id
                };

                topTenStudents.push(topStudent);
            }

            return topTenStudents;
        }
    };

    function validateTitle(t) {
        //if(t[0]===' '||t[t.length-1]===' '||t.includes('  ')){
        //check whitespace at both ends: ^(?!\s|.*\s$)
        if (!(/^(?!\s|.*\s$)/.test(t))) {//||t.includes('  ')||t.length===0){
            throw 'Name title can not start nad end with whitespace'
        }
        if (t.includes('  ')) {
            throw 'Name title can not consucutive whiteSpace'
        }
        if (!t || typeof t !== 'string') {
            throw 'Title must be a non-empty string!';
        }
    }

    function validatePresentations(p) {
        if (!p || p.length === 0 || !Array.isArray(p)) {
            //console.log(p.length,Array.isArray(p));
            throw 'invalid presentaion parameters'
        }
        for (let i = 0; i < p.length; i += 1) {
            validateTitle(p[i]);
        }
    }
    function validateName(n) {
        if (typeof n !== 'string') {
            throw 'Name must be a string'
        }
        if(n.length>1){
        if (!(/^[A-Z]/.test(n[0]))) {
            throw 'Name must begin capital letters'
        }
        }
        if(n.length>1) {
            if (!(/^[a-z]/.test(n.slice(1)))) {
                throw 'other symbols in the name (if any) are lowercase letters'
            }
        }
    }

    return Course;
}
