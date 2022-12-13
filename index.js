const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./router.js')
const Graphic = require('./models/graphic')
const axios = require('axios');

require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const PORT = process.env.PORT || 5000;
 


async function start() {
    try {
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,useUnifiedTopology: true
        })
        app.listen(PORT, () => { console.log('Server has been started...'+ PORT) })
        setInterval(() => {
            getNftPrice()
            getTokenPrice()
        },60000)

    } catch (e) {  
        console.log(e)
    }
}

start()




async function getNftPrice() {
    try {
        const tokendata = await Graphic.findOne({_id:"6376db2cd96e044971a2910b"})
        //response
        let response = await axios.post(`${process.env.API_URL}/v1/chain/get_table_rows`,
        {"json":true,"code":"honefidropsx","scope":"honefidropsx","table":"nftdrop","lower_bound":null,"upper_bound":null,"index_position":1,"key_type":"","limit":99999,"reverse":false,"show_payer":false})
        
        const datas = await JSON.stringify(tokendata);
        let data = await JSON.parse(datas); 
        let time = Math.floor(parseInt(Date.now()/1000));
        for(let i = 0; i< response.data.rows.length; i++) {
            if (response.data.rows[i].format === 'balance' ) {
                let id = response.data.rows[i].dropnum;
                let timeleft = Math.floor((time - parseFloat(response.data.rows[i].lastbuy))/30);
                if ( timeleft < 0 ){ timeleft = 0 }
                let prices = parseFloat(response.data.rows[i].price)*(1-1/100)**timeleft;
                if (prices < 0.1) { prices = 0.1} 
                let price = prices.toFixed(2)
                if (time > response.data.rows[i].dropstart && time < response.data.rows[i].dropend) {
                    if (data.rows[id]) {
                        data.rows[id].push({
                            dropnum: response.data.rows[i].dropnum,
                            time: time,
                            price: price 
                        })
                    } else {
                        data.rows[id] = [{ 
                            dropnum: response.data.rows[i].dropnum, 
                            time: time,
                            price: price 
                        }]
                    }     
                }     
            }
        }
        tokendata.rows = data.rows;
        tokendata.save()
    } catch(e) {console.log(e)}
}

async function getTokenPrice() {
    try {
        const tokendata = await Graphic.findOne({_id:"6376db2cd96e044971a2910b"})
        //response
        let response = await axios.post(`${process.env.API_URL}/v1/chain/get_table_rows`,
        {"json":true,"code":"honefidropsx","scope":"honefidropsx","table":"tokensdrop","lower_bound":null,"upper_bound":null,"index_position":1,"key_type":"","limit":99999,"reverse":false,"show_payer":false})
        
        const datas = await JSON.stringify(tokendata);
        let data = await JSON.parse(datas); 
        let time = Math.floor(parseInt(Date.now()/1000));
        for(let i = 0; i< response.data.rows.length; i++) {
            if (response.data.rows[i].format === 'balance' ) {
                let id = response.data.rows[i].dropnum;
                let timeleft = Math.floor((time - parseFloat(response.data.rows[i].lastbuy))/30);
                if ( timeleft < 0 ){ timeleft = 0 }
                let prices = parseFloat(response.data.rows[i].price)*(1-1/100)**timeleft;
                if (prices < 0.1) { prices = 0.1} 
                let price = prices.toFixed(2)
                if (time > response.data.rows[i].dropstart && time < response.data.rows[i].dropend) {
                    if (data.rows[id]) {
                        data.rows[id].push({
                            dropnum: response.data.rows[i].dropnum,
                            time: time,
                            price: price 
                        })
                    } else {
                        data.rows[id] = [{ 
                            dropnum: response.data.rows[i].dropnum, 
                            time: time,
                            price: price 
                        }]
                    }     
                }     
            }
        }
        tokendata.rows = data.rows;
        tokendata.save()
    } catch(e) {console.log(e)}
}
