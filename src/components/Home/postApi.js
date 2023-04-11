// const Post=[
//     {
//         id:1,
//         image: "images/download.jpg",
//         catageory: "sldkfj",
//         Title: "ABC",
//         offerRange: 24,
//         price: "2k PKR",
//         description: "skfhhfhf",
//     },
//     {
//         id:2,
//         image: "link",
//         Title: "xyC",
//         catageory: "sldkfj",
//         offerRange: 24,
//         price: "2k PKR",
//         description: "skfhhfhf",
//     },
// ];
const description="We are seeking a friendly, customer-oriented individual to join our team as a Waiter/Waitress."+ 
                    "As a Waiter/Waitress, you will be responsible for ensuring that our guests have an enjoyable "+
                    "dining experience by providing prompt and attentive service, taking orders accurately, and "+
                    "delivering food and beverages in a timely manner."+
                    "Responsibilities:"+

                    "Greet guests in a friendly and welcoming manner, escort them to their tables, and present menus"+
                    "Answer questions about menu items and make recommendations as needed"+
                    "Take accurate orders from guests and enter them into the point-of-sale system"+
                    "Serve food and beverages to guests in a timely manner"+
                    "Check on guests periodically to ensure satisfaction and address any concerns or issues"+
                    "Handle payment transactions accurately and efficiently"+
                    "Clean and reset tables and dining areas between guests"+
                    "Assist with opening and closing duties as needed";

const job_titles= ["Cashier","Waiter","Sweeper","Organizer","Manager",
                  "Attender","Worker","Parker","Valet"]

const employer= ["KFC","Pearl Continental","Savers","Jays Event Planners","Breakout",
                  "Cheesious","Nestle","Forks & Knives","Nishaat"]

const locations= ["Mall Road, Lahore","Food Sqaure, Islamabaad","Kareem Block, Lahore","Johar Twon","Emporium Mall, Lahore",
                  "Packages, Lahore","Butt krai, Faisalabaad","","Faisal Town, Lahore","SQD, Karachi","Esteen, New York"]
const Post = [];
for (let i = 1; i <= 100; i++) {
  let post = {
    id: i,
    image: `images/download.jpg`,
    job_category: `${job_titles[i%9]}`,
    Employer: `${employer[i%9]}`,
    location: `${locations[i%10]}`,
    hours: "11AM - 3PM ",
    duration: `${i%10+i/2} days`,
    price: `${i}k PKR`,
    description: `${description}`
  }
  Post.push(post);
}
export default Post;