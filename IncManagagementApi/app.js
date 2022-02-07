const express = require('express')
const cors = require('cors');

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 


// incident status 
// 0 not acknowledged
// 1 acknowledged
// 2 inprogress
// 3 resolved
// 4 rejected

// Array maintaining the incidents which are already acknowledged in the system
let ackinclist = [];

// Array maintaining the incidents which are not acknowledged in the system
let nonackinclist = [];

let inclist = [
    {
        incid: 1,
        title: 'System not booting',
        assignedto: 'Shivesh',
        recieved_date: '2022-02-06',
        submitter: 'Admin',
        description: 'After windows update system is not booting',
        status : 0,
        resolvercomments : ''
    },
    {
        incid: 2,
        title: 'Network connection failure in laptop',
        assignedto: 'Abhishek',
        recieved_date: '2022-02-05',
        submitter: 'Rohit',
        description: 'Network not connecting to wifi in the laptop, seems driver issue',
        status : 0,
        resolvercomments : ''
    },
    {
        incid: 3,
        title: 'Network connection failure in laptop',
        assignedto: 'Bhavna',
        recieved_date: '2022-02-05',
        submitter: 'Priya',
        description: 'Network not connecting to wifi in the laptop, seems driver issue',
        status : 0,
        resolvercomments : ''
    },
    {
        incid: 4,
        title: 'Network connection failure in laptop',
        assignedto: 'Ritesh',
        recieved_date: '2022-02-05',
        submitter: 'Twinkle',
        description: 'Network not connecting to wifi in the laptop, seems driver issue',
        status : 0,
        resolvercomments : ''
    },
    {
        incid: 5,
        title: 'Network connection failure in laptop',
        assignedto: 'Atin',
        recieved_date: '2022-02-05',
        submitter: 'Supriya',
        description: 'Network not connecting to wifi in the laptop, seems driver issue',
        status : 0,
        resolvercomments : ''
    }
]

// get the list of acknowledged incidents
function getAckIncList() 
{
  return inclist.filter(function(item){
    return item.status > 0;         
});
}

// get the list of not acknowledged incidents
function getNonAckIncList() 
{
  return inclist.filter(function(item){
    return item.status === 0;         
});
}

// get request for all acknowledged incidents for a user
app.get('/ackinclist', (req, res) => {
    ackinclist = getAckIncList();
    res.json(ackinclist);
    res.send();
})

// get request for all not acknowledged incidents for a user
app.get('/toackinclist', (req, res) => {
    nonackinclist = getNonAckIncList();
    res.json(nonackinclist);
    res.send();
})



/* 
put request 
put request format in request body

{"inc":[
    {"id": "1"},
    {"id": "2"},
    {"id": "3"}
]}

mandatory content type in request application/json 
*/

app.put('/ackincident', function (req, res) {
    nonackinclist = getNonAckIncList();
    const jsonBodyParam = JSON.stringify(req.body.inc);
    const incUpdateList = JSON.parse(jsonBodyParam);
    incUpdateList.forEach(ackitem => {
        const index = inclist.findIndex(el => el.incid.toString() === ackitem.id);
        let item = inclist[index];
        item.status = 1; // changing status to acknowledged
        inclist[index] = item;
    });
    res.send('incidents list updated');
});

app.listen(3000, () => console.log('Server ready'))
