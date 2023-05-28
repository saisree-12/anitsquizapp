const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser')
const MethodOverride = require('method-override')
const AWS = require('aws-sdk')
const fs = require('fs')
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const nodemailer = require('nodemailer');


app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.use(MethodOverride('_method'))


require('dotenv').config()

const db = require('./connection')

AWS.config.update({
    accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
    secretAccessKey: `${process.env.AWS_SECRET_KEY}`,
    region:'eu-north-1'
  });

const s3 = new AWS.S3({ signatureVersion: 'v4' })

const BUCKET_NAME = 'anitsquiz'

const db_notes = require('./Databases/Notes')
const db_classes = require('./Databases/Classes')


var upload = multer({
  storage: multer.memoryStorage()
})

app.post('/uploaded',upload.single('file'),async (req,res) => {
    const uname = req.body.uname
    const subId = req.body.subId
    const classId = req.body.classId
    const cname = req.body.cname
    const check = req.body.check
    const fname = `${uname}${req.file.originalname}`
    const sub = fname
    const msg = req.body.msg
    var mailId;
    const params = {
      Bucket: 'anitsquiz',
      Key: fname,
      Body: req.file.buffer,
    };
    
    await db_classes.find({ class_id: classId }).then((response) => {
      mailId = response[0].mail;
    });
    
    await s3.upload(params, (err, data) => {
      if (err) return (err);
      const fp = data.Location;
      db_notes.insertMany({
        subId: subId,
        classId: classId,
        cName: cname,
        fName: fname,
        fPath: fp,
        username: uname,
      });
    });
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'anitsquiz01@gmail.com',
          pass: 'xdrsndeyvghifkjw',
        },
      });
      
      const mailOptions = {
        from: 'anitsquiz01@gmail.com',
        to: mailId,
        subject: sub,
        text: msg,
      };
      if(check==='1'){
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return error.message
            }
        });  
    }
})

app.post('/pdf',async (req,res) => {
    const nid = req.body.id
    await db_notes.findById(nid).then(response => {
        const filePath = response.fPath;
        const params = {
            Bucket: 'anitsquiz',
            Key: response.fName,
            ResponseContentType: 'application/pdf',
            ResponseContentDisposition: 'inline',
          };
           const url = s3.getSignedUrl('getObject', params)
           res.send({url:url})
        })
    })
  
    app.post('/download-pdf', (req, res) => {
      const tabularData = req.body.data;
      const className = req.body.cName;
      const subName = req.body.subName;
      const doc = new PDFDocument();
      const stream = doc.pipe(blobStream());
    
      doc.fontSize(16).font('Helvetica-Bold');
      doc.text('Student Marks Details', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('Class Name: ' + className, { align: 'left' });
      doc.text('Subject Name: ' + subName, { align: 'left' });
      doc.moveDown();
    
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('Reg ID', 50, 155, { width: 100, align: 'center' });
      doc.text('Student Name', 150, 155, { width: 150, align: 'center' });
      doc.text('Quiz 1 Marks', 300, 155, { width: 80, align: 'center' });
      doc.text('Quiz 2 Marks', 380, 155, { width: 80, align: 'center' });
      doc.text('Total Marks', 460, 155, { width: 80, align: 'center' });
    
      doc.lineWidth(1).rect(50, 150, 500, 25).stroke();
      doc.lineWidth(1).moveTo(150, 150).lineTo(150, 175).stroke();
      doc.lineWidth(1).moveTo(300, 150).lineTo(300, 175).stroke();
      doc.lineWidth(1).moveTo(380, 150).lineTo(380, 175).stroke();
      doc.lineWidth(1).moveTo(460, 150).lineTo(460, 175).stroke();
    
      doc.fontSize(10).font('Helvetica');
      let y = 175;
    
      tabularData.rows.forEach((row) => {
        doc.lineWidth(1).rect(50, y, 500, 25).stroke();
    
        doc.text(row.regno.toString(), 50, y + 5, { width: 100, align: 'center' });
        doc.text(row.name.toString(), 150, y + 5, { width: 150, align: 'center' });
        doc.text(row.quiz1_marks.toString(), 300, y + 5, { width: 80, align: 'center' });
        doc.text(row.quiz2_marks.toString(), 380, y + 5, { width: 80, align: 'center' });
        doc.text(row.tot_marks.toString(), 460, y + 5, { width: 80, align: 'center' });
    
        doc.lineWidth(1).moveTo(150, y).lineTo(150, y + 25).stroke();
        doc.lineWidth(1).moveTo(300, y).lineTo(300, y + 25).stroke();
        doc.lineWidth(1).moveTo(380, y).lineTo(380, y + 25).stroke();
        doc.lineWidth(1).moveTo(460, y).lineTo(460, y + 25).stroke();
    
        y += 25;
      });
    
      const chunks = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => {
        const result = Buffer.concat(chunks);
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="studentmarksdetails.pdf"',
          'Content-Length': result.length,
        });
        res.end(result);
      });
    
      doc.end();
    });


const storagepdf = multer.memoryStorage();
const uploadpdf = multer({ storage: storagepdf });

app.post('/send-email', uploadpdf.single('file'), async (req, res) => {
  try {
    const { classId } = req.body;
    const className = req.body.cname
    const fileData = req.file.buffer;
    
    const response = await db_classes.find({ class_id: classId });
    const mailId = response[0].mail;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anitsquiz01@gmail.com',
        pass: 'xdrsndeyvghifkjw',
      },
    });

    const mailOptions = {
      from: 'anitsquiz01@gmail.com',
      to: mailId,
      subject: `${className} Marks Details`,
      text: 'Please find the attached PDF report.',
      attachments: [
        {
          filename: 'studentmarksdetails.pdf',
          content: fileData,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

    
    

app.post('/feedback',async (req,res) => {
  const { mail, msg } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anitsquiz01@gmail.com',
      pass: 'xdrsndeyvghifkjw',
    },
  });

  const mailOptions = {
    from: mail,
    to: 'anitsquiz01@gmail.com',
    subject: `Customer Feedback from ${mail}`,
    text: msg,
  };

  const info = await transporter.sendMail(mailOptions);
  res.sendStatus(200);
})


module.exports = app