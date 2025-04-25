// users 5
// cars 6

export const bookingsData = [
    {
      userId: "j577f5cx427ksv7azm138crb2d7cvt3p",
      carId: "k57b6davvw5kjb5re59mg17mjx7cvssy",
      startDate: "2023-10-15",
      endDate: "2023-10-20",
      status: "active",
      paymentStatus: "paid",
    },
    {
      userId: "j57dq1zqq6h6jnwpvp5ny9pm8n7ct2pw",
      carId: "k57d29wdsby0e8rxqcan348sb57cve5z",
      startDate: "2023-10-18",
      endDate: "2023-10-25",
      status: "upcoming",
      paymentStatus: "paid",
    },
    {      
      userId: "j57a5s32y3fhzzgy4d7h0f2dyn7cvv3m",
      carId: "k57420vyxn6drfjem3qn6hwgn17cvhp7",      
      startDate: "2023-10-10",
      endDate: "2023-10-14",
      status: "completed",      
      paymentStatus: "paid",
    },
    {
      userId: "j577jwq37xfwn6r5cmeb21aejx7cvv19",
      carId: "k575cd94kx7var5tq34jmvb6517ct50g",      
      startDate: "2023-10-22",
      endDate: "2023-10-29",
      status: "upcoming",
      paymentStatus: "pending",    
    },
    {
      userId: "j571yqb36w47hm1zmn3g9bhr457cv5gt",
      carId: "k570x8mvhxr6vt22krg7d13azx7ct14j",      
      startDate: "2023-10-05",
      endDate: "2023-10-12",
      status: "completed",
      paymentStatus: "paid",
    },
]

function convertDateToTimestamp(dateString) {
  const timeStamp = new Date(dateString).getTime();
  console.log(timeStamp);
  return timeStamp
}