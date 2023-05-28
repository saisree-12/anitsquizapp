const express = require('express')
const cors = require('cors')
const connexion = require('./connection')
const app = express()

// Data base imports 

const slogin = require('./Databases/Student')
const StudentDetail = require('./Databases/StudentDetail')
const Classe = require('./Databases/Classes')
const questions  = require('./Databases/Questions')
const HostedQuize = require('./Databases/HostedQuizes')
const OngoingQuiz = require('./Databases/OngoingQuizes')
const Notes = require('./Databases/Notes')
const hostedquestions = require('./Databases/HostedQuestions')
const marks = require('./Databases/StudentMaksDetails')
const fserver = require('./fserver')
const upload = require('./upload')
const StudentMaksDetails = require('./Databases/StudentMaksDetails')
const Subjects = require('./Databases/Subjects')

app.use('/',fserver)
app.use('/',upload)
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.post('/slogin',(req,res) => {
    slogin.findOne({regno:req.body.uname,pwd:req.body.pwd}).then((response) => {
        if(response === null){
            res.send({validation:false})
        }else{
            res.send({validation:true})
        }
    })
})

app.post('sdashupdate',async (req,res) => {
    var l = [];
    var uname;
    await StudentDetail.find({regno:req.body.uname}).then(response => {
        console.log(response);
        uname = response[0].class_id
    })
    await HostedQuize.find({quizdate:req.body.date,quiztime:req.body.time})
    .then(response => {
        response.map((i) => {
            l.push(i.quizid);
        })
    })
    await l.map(i => {
        OngoingQuiz.insertMany({quizid:i,class_id:uname})
        .then(response => {
            console.log(response);
        })
    })
})



app.post('/sdash',async (req,res) => {
    var class_id;
    var fnotes = [];
    var quizids;
    var quizes = [];
    var sub = []
    var cName = []
    var id = []
    var sNames = []
    await StudentDetail.findOne({regno:req.body.uname}).then((response) => {
        class_id = response.class_id;
        student_name = response.student_name
    })
    await HostedQuize.find({class_id:class_id},{_id:0,quizid:1,QuizName:1,SubjectName:1,noqs:1,quizdate:1})
    .then((response) => {
        console.log(response);
        quizes = response;
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
        quizes = quizes.filter((quiz) => quiz.quizdate === formattedToday);
    })
    await Notes.find({classId:class_id},{_id:1,cName:1,subId:1}).then((response) => {
        response.map((item) => {
            id.push(item._id.toString());
            cName.push(item.cName);
            sub.push(item.subId);
        })
    }) 
    for(i in sub){
        await Subjects.find({subid:sub[i]},{_id:0,subName:1}).then((res2) => {
            console.log(res2);
            sNames.push(res2[0].subName);
        })  
    }
    for(let i = 0; i < sNames.length; i++){
        fnotes.push({notesId:id[i],cName:cName[i],subName:sNames[i]})
    }
    res.send({student_name:student_name,quizid:quizids,quizes:quizes,notes:fnotes})    
})





app.post('/quizquestions',async (req,res) => {
    const quizid = req.body.quizid
    var quesids;
    await hostedquestions.find({quizid:quizid},{_id:0})
    .then((response) => {
        console.log(response);
        quesids = response[0].quesids
    })
    await questions.find({quesid:{$in:quesids}},{_id:0,question:1,option1:1,option2:1,option3:1,option4:1,answer:1})
    .then((response) => {
        res.send({questions:response})
    })
})

app.post('/attemptquiz',async (req,res) => {
    var data;
    var subId;
    var time ;
    let stime;
    let etime;
    await HostedQuize.find({quizid:req.body.quizid},{_id:0,quizid:1,QuizName:1,subId:1,SubjectName:1,noqs:1,marks:1,quizdate:1,duration:1,quiztime:1})
    .then(response => {
        data = response;
        console.log(response);
        subId = response[0].subId
        time = response[0].quiztime+":00"
        time = time.toString().split(':')
        let times = new Date()
        let times2 = new Date()
            times.setHours(parseInt(time[0]))
            times.setMinutes(parseInt(time[1]))
            times.setSeconds(parseInt(time[2]))
            stime = times.toLocaleTimeString('en-US')
            times2.setHours(parseInt(time[0]))
            times2.setMinutes(parseInt(time[1])+response[0].duration+5)
            times2.setSeconds(parseInt(time[2]))
            etime = times2.toLocaleTimeString('en-US') 
    })
    var qn = req.body.quizid;
    qn = qn[qn.length-1]
    var flag = true;
    const qid = `m${subId}${qn}`
    await StudentMaksDetails.find({regno:req.body.uname,[qid]:{$gt:-1}},{_id:0,[qid]:1})
    .then(response => {
        if(response.length>0){
            flag = false;
        }
    })
    res.send({data,flag:flag,stime:stime,etime:etime})
})

app.post('/select-ques',(req,res) => {
    questions.find({classId:req.body.classId,subName:req.body.subName},{_id:0,topicName:1,question:1}).then((res1) => {
        res.send(res1)
    })
})
app.post('/updatemarks',(req,res) => {
    console.log(req.body);
    var qno = req.body.quizid;
    qno = qno[qno.length-1]
    const qid = `m${req.body.subId}${qno}`
    console.log(qid);
    const marksgained = req.body.marks
    marks.updateOne({regno:req.body.uname},{$set:{[qid]:marksgained}})
        .then(response => {
            console.log(response);
            res.send(response)
        })
})


app.post('/getans',async (req,res) => {
    const quizid = req.body.quizid
    var quesids;
    await hostedquestions.find({quizid:quizid},{_id:0})
    .then((response) => {
        quesids = response[0].quesids
    })
    await questions.find({quesid:{$in:quesids}},{_id:0,question:1,answer:1})
    .then((response) => {
        res.send({questions:response})
    })
})
app.listen(8888,() => {
    console.log("Listening on PORT 8888");
})
