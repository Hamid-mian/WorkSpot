const { pool } = require("../../config/database");
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
// const cors = require("cors");
// const admin = require('firebase-admin');
// const serviceAccount = require('../google-services.json');
// const { notificationmessage, ordered } = require('./constants/NotificationMessage');

module.exports = {

  isWithin3Minutes: function (datetimeString) {
    const datetime = new Date(datetimeString);
    const now = new Date();
    const diffInMs = now - datetime;
    const diffInMinutes = Math.round(diffInMs / 1000 / 60);
    return diffInMinutes <= 3;
  },

  generateCode: function () {
    var fullNumber = Math.floor(Math.random() * 9999);
    return "0000";
  },

  timeDifference: function diff_minutes(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff)) - 300;
  },

  sendingEmail: function (data){

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
          user: 'workspot.fyp@gmail.com',
          pass: 'yqdkgjvsvnidesmp'
      },
       timeout: 5000 // 5 seconds
  });

  let mailOptions = {
    from: 'workspot.fyp@gmail.com',
   // to: 'bitf19a026@pucit.edu.pk',
    to: data.email,
    subject: 'Worksopt',
    text: 'Your verification code for workspot is  '+ data.code +'  Don`t share your code with any one'
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
      console.log(error);
  } else {
      console.log('Email sent: ' + info.response);
  }
});

  },
  isNullOrEmpty: function (val) {
    return (val === undefined || val == null || val.length <= 0 || val == "") ? true : false;
  },
  getMinutesDifference: function (date1, date2) {
    if (typeof date1 === 'string') {
      date1 = this.parseDate(date1);
    }
    if (typeof date2 === 'string') {
      date2 = this.parseDate(date2);
    }
    const diffInMs = Math.abs(date2 - date1);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes;
  },
  addToEndDate: function (date, endDate, difference) {
    if (typeof date === 'string') {
      date = this.parseDate(date);
    }
    if (typeof endDate === 'string') {
      endDate = this.parseDate(endDate);
    }
    if (this.convertDateToString(date) == this.convertDateToString(endDate)) {
      return date.setMinutes(date.getMinutes() + difference);
    }
    date = date.setMinutes(date.getMinutes() + difference);
    if (date > endDate) {
      date = endDate;
    }
    var tempDate = this.parseDate(date);
    return this.parseDate(date);
  },
  addToDate: function (date, difference) {
    if (typeof date === 'string') {
      date = this.parseDate(date);
    }
    date = date.setMinutes(date.getMinutes() + difference);
    return this.parseDate(date);
  },
  convertToTime: function (dateString) {
    let dateTime = new Date(dateString);
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12 instead

    let time = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + period;
    return time;
  },
  getCenterDate: function (date1, date2) {
    if (typeof date1 === 'string') {
      date1 = this.parseDate(date1);
    }
    if (typeof date2 === 'string') {
      date2 = this.parseDate(date2);
    }
    const timestamp1 = date1.getTime();
    const timestamp2 = date2.getTime();
    const centerTimestamp = (timestamp1 + timestamp2) / 2;
    const centerDate = new Date(centerTimestamp);
    return centerDate;
  },
  convertDateToDDDD: function (date) {
    let dateTime = new Date(date);
    let options = { weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric' };
    let formattedDate = dateTime.toLocaleDateString('en-US', options);
    return formattedDate;
  },
  convertDateToDDD: function (date) {
    let dateTime = new Date(date);
    let options = { weekday: 'short' };
    return dateTime.toLocaleString('en-US', options);
  },
  convertDateToMMM: function (date) {
    let dateTime = new Date(date);
    let options = { month: 'short' };
    return dateTime.toLocaleString('en-US', options);
  },
  parseDate: function (date) {
    if (typeof date === 'string' || typeof date === 'number') {
      date = new Date(date);
    }
    var typeDate = typeof date;
    return date;
  },
  convertDateToString: function (date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const datetimeString = date.toLocaleString('en-US', options).replace(',', '');
    const [dateString, timeString] = datetimeString.split(' ');

    const [month, day, year] = dateString.split('/');
    const [hour, minute, second] = timeString.split(':');

    const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
    return isoString;
  },
  runSql: (query) => {
    return new Promise((resolve, reject) => {
      pool.query(query, [], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  sendNotification: function (user_id, body, title) {
    // Initialize the Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(require('../../workspot.json')),
      // databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
    });

    const db = admin.firestore();

    const userId = user_id;
    // Retrieve the device tokens for the specified user from the MySQL database
    pool.query(`SELECT device_token FROM user WHERE id='${userId}'`, (error, results) => {
      if (error) throw error;
      if (results.length === 0) return;

      // Loop through the retrieved tokens and send the notification message to each user
      results.forEach((result) => {
        const message = {
          notification: {
            title: title,
            body: body,
          },
          token: result.device_token,
        };

        admin.messaging().send(message)
          .then((response) => {
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.error('Error sending message:', error);
          });
      });
    });
  },
  


   countMatchingElements: function(arr1, arr2) {
    // Create a Set to store unique elements from arr1
    const set = new Set(arr1);
  
    let count = 0;
  
    // Iterate over the elements of arr2
    for (let i = 0; i < arr2.length; i++) {
      // Check if the current element of arr2 is in the set
      if (set.has(arr2[i])) {
        count++;
      }
    }
  
    return count;
  },

  calculateTotalAmount: function(startTime, endTime, startDate, endDate, rate) {
    const startDateTime = new Date(startDate + 'T' + startTime);
    const endDateTime = new Date(endDate + 'T' + endTime);
  
    // Calculate the difference in milliseconds between the start and end dates
    const timeDiff = endDateTime - startDateTime;
  
    // Calculate the number of days between the start and end dates
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    // Calculate the number of hours per day
    const hoursPerDay = endDateTime.getHours() - startDateTime.getHours();
  
    // Calculate the total hours
    const totalHours = hoursPerDay * days;
  
    // Calculate the total amount
    const totalAmount = totalHours * rate;
  
    return totalAmount;
  },

  percentageCalculate: function(total, num)
  {
    let num3=(num/total)*100;
    return num3;
  }
  
  
}