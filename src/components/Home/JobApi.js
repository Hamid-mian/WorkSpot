
const Job = [];
for (let i = 1; i <= 50; i++) {
  let data = {
    id: i,
    Title: `Title ${i}`,
    category: `category${i}`,
    Location: `local Lhr-${i}`,
    Availability: `2pm-8pm ${i/2} days`,
    price: `${i*100}k PKR`,
    Description: `description ${i}`
  }
  Job.push(data);
}
export default Job;