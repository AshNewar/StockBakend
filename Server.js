import express from "express";
import connectDB from "./connect/connect.js";
import Stock from "./model/model.js";
import cors from "cors";


const configuration = {
    method: 'GET',
    headers: {
        'x-api-key': 'wb62oKe7T7X1lmjqff5a8s4WorS5h5cazj2TlhZh'
    }
}
const app = express();

connectDB();
const timeID = setInterval(addData, 10000);

app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


function addData() {
    let elementId = 0;
    fetch('https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=%5ENSEI', configuration)
        .then(response => response.json())
        .then(async (data) => {
            let obj = data.quoteResponse.result[elementId].regularMarketPrice;
            const price = await Stock.create({ price: obj });
        })

}

const prices = [];  //Prices Array
app.get('/getdata', async (req, res) => {
    const data = await Stock.find();
    data.map((price) => {
        prices.push(price.price);
    });
    res.status(200).json(prices);


});


// function landingPageInfo() {
//     let elementId = 0;
//     fetch('https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=%5ENSEI', configuration)
//         .then(response => response.json())
//         .then(data => {
//             let obj = data.quoteResponse.result[elementId].regularMarketPrice;
//             console.log(obj);
//         })
// }

app.listen(3000, () => {
    console.log(process.env.FRONTEND_URI);
    console.log("Server started");
});

