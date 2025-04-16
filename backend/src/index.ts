import express from 'express';
import cors from 'cors';
import data from './data';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/data1', (req, res) => {
    const won = data.find(item => item.label === 'Won')?.count ||1
    let topics: String[] = []
    let count: number[] = []
    let rightpercentage:number[] = []
    let intermediate: number[] = []
    for(const item of data) {
        topics.push(item.label)
        count.push(item.count)
        rightpercentage.push(Math.round((won / item.count) * 100))
    }

    for (let i = 1; i < count.length; i++) {
        intermediate.push(Math.round(count[i] / count[i - 1] * 100))
    }

    const response = {
        topics: topics,
        count: count,
        rightpercentage: rightpercentage,
        intermediate: intermediate
    };
    res.json(response);

    
});

app.get('/api/data2',(req,res)=>{
    const won = data.find(item => item.label === 'Won')?.acv ||1
    let topics: String[] = []
    let count: number[] = []
    let rightpercentage:number[] = []
    let intermediate: number[] = []
    for(const item of data) {
        topics.push(item.label)
        count.push(Math.round(item.acv))
        rightpercentage.push(Math.round((won / item.acv) * 100))
    }

    for (let i = 1; i < count.length; i++) {
        intermediate.push(Math.round(count[i] / count[i - 1] * 100))
    }

    const response = {
        topics: topics,
        count: count,
        rightpercentage: rightpercentage,
        intermediate: intermediate
    };
    res.json(response);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})