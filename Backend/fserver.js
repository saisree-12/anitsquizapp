const express = require('express')
const app = express();
const db = require('./connection')
const cors = require('cors')
const db_flog = require('./Databases/facultyLogin')
const db_fclass = require('./Databases/facultyClasses')
const db_class = require('./Databases/Classes')
const db_sd = require('./Databases/StudentDetail')
const db_smd = require('./Databases/StudentMaksDetails')
const db_qs = require('./Databases/Questions')
const db_hqzs = require('./Databases/HostedQuizes') 
const db_hqs = require('./Databases/HostedQuestions') 
const Notes = require('./Databases/Notes')
const Subjects = require('./Databases/Subjects')

// const postModel = require('./postModel')

app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.use(cors());

app.post('/flogin', (req, res) => {
    db_flog.find({uname:req.body.uname,pwd:req.body.pwd}).then((res1) => {
        if(res1.length != 0){
            res.send({valid:true})
        }  
        else{
            res.send({valid:false})
        } 
    }) 
}) 

app.post('/fdash',async (req,res) => {
    var subName = []
    var classId = []
    var className = []
    var subId = []
    var result = []
    var quizDetails
    var id = []
    var cName = []
    var sub =[]
    var sNames = []
    var fNotes = []
    var nclassId = []
    await db_fclass.find({uname:req.body.uname}).then((res1) => {
        res1.map((item) => {  
            subId.push(item.subId)
            subName.push(item.subName)
            classId.push(item.class_id)
        }) 
    }) 
    await db_class.find({class_id:{$in: classId}}).then((res2) => {
        res2.map((item) => {
            className.push(item.class_name) 
        })  
    })  
    await db_hqzs.find({username:req.body.uname},{_id:0,class_id:1,QuizName:1,quizdate:1,quizid:1}).then((res3) => {
        quizDetails = res3;
    }) 
    
    await Notes.find({username:req.body.uname},{_id:1,cName:1,subId:1,classId:1}).then((response) => {
        response.map((item) => {
            id.push(item._id);
            cName.push(item.cName);
            sub.push(item.subId);
            nclassId.push(item.classId);
        })
    })  
    for(let i=0;i<sub.length;i++){
        await Subjects.find({subid:sub[i]},{_id:0,subName:1}).then((res4) => {
            sNames.push(res4[0].subName)
        })
    }   
    for(let i = 0; i < sNames.length; i++){
        fNotes.push({notesId:id[i],cName:cName[i],subName:sNames[i],classId:nclassId[i]})
    }

    for(let i = 0; i < className.length; i++){
        result.push({className: className[i],subName:subName[i],classId:classId[i],subId:subId[i]})
    } 

    res.send({result : result,quizDetails : quizDetails,fNotes:fNotes}); 
});
app.post('/student-details',async (req,res) => {
    console.log('Called')
    const nums = []
    const names = [] 
    var q1 = []
    var q2 = [] 
    var q3 = [] 
    var f = [] 
    console.log(req.body);
    await db_sd.find({class_id:req.body.classId}).then((res1) => {
        res1.map((item) => {
            nums.push(item.regno)
            names.push(item.student_name)
        })
    }) 
    const det = req.body.subId
    const q11 = `m${det}1`;
    const q22 = `m${det}2`;

    await db_smd.find({regno:{$in:nums}},{_id:0,[q11]:1,[q22]:1}).then((res2) => {
        {res2.map((item) =>{ 
            q1.push(item[q11]!==-1?item[q11]:0)
            q2.push(item[q22]!==-1?item[q22]:0)
            q3.push((item[q11]!==-1?item[q11]:0)+(item[q22]!==-1?item[q22]:0))
        })} 
    })  
    for(let i = 0; i < names.length; i++){
        f.push({regno:nums[i], name:names[i],quiz1_marks:q1[i],quiz2_marks:q2[i],tot_marks:q3[i]})
    }  
    res.send(f);
})

app.post('/select-ques',(req,res) => {
    db_qs.find({ subName: { $regex: new RegExp(req.body.subName, "i") } },{_id:0,quesid:1,topic_name:1,question:1}).then((res1) => {
        res.send(res1)
    }) 
})

app.post('/search',(req,res) => {
    db_qs.find({topic_name:req.body.search},{_id:0,quesid:1,topic_name:1,question:1}).then((res1) => {
        res.send(res1)
    })
})

app.post('/select-prev-ques',(req,res) => {
    console.log(req.body);
    db_hqzs.insertMany({
        quizid:req.body.quizId,
        QuizName:req.body.quizName,
        SubjectName:req.body.subName,
        topicname:req.body.topicName,
        noqs:req.body.noqs,
        marks:req.body.marks,
        class_id:req.body.classId,
        quizdate:req.body.quizDate,
        duration:req.body.duration,
        quiztime:req.body.quizTime,
        username:req.body.uname,
        subId:req.body.subId
    })
    .then((res1) => {
        console.log(res1)
    }) 
})

app.post('/add-select-prev-ques',(req,res) => {
    console.log(req.body)
    db_hqs.insertMany({quizid:req.body.quizId,quesids:req.body.selected}).then(response => {
        console.log("Questions",response)
    });
})
app.post('/update-quiz',(req,res) => {
    db_hqzs.updateMany({quizid:req.body.quizId},{$set:{quizdate:req.body.quizDate,quiztime:req.body.quizTime,duration:req.body.duration}})
    .then((res1) => {
    })
})
app.post('/add-ques',(req,res) => {
    db_qs.find({},{_id:0,quesid:1}).sort({_id:-1}).limit(1).then((res1) => {
        console.log(res1)
        res.send(res1)
    }) 
})

app.post('/add-ques1',(req,res) => {
    // console.log(req.body)
    db_qs.insertMany({
        quesid:req.body.quesId,
        topic_name:req.body.topicName,
        subName:req.body.subName,
        question:req.body.question,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer:req.body.answer
    }).then((res1) => {
    })
})

app.post('/view-quiz',async (req,res) => {
    var quesIds = []
    var topic = []
    var ques = []
    var fin = []
    console.log('HI',req.body)
    await db_hqs.find({quizid:req.body.quizIds},{quesids:1,_id:0}).then((res1) => {
        quesIds = res1[0].quesids
    }) 
    await db_qs.find({quesid:{$in:quesIds}},{topic_name:1,question:1}).then((res2) => {
        res2.map((item) => {
            topic.push(item.topic_name)
            ques.push(item.question)
        })
    }) 
    for(let i = 0; i < quesIds.length;i++){
        fin.push({topicName:topic[i],question:ques[i]})
    }
    res.send({quesDetails:fin})
})



module.exports = app
