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
const Post = [];
for (let i = 1; i <= 100; i++) {
  let post = {
    id: i,
    image: `images/download.jpg`,
    category: `category${i}`,
    Title: `Title ${i}`,
    offerRange: i * 2,
    price: `${i}k PKR`,
    description: `description ${i}`
  }
  Post.push(post);
}
export default Post;