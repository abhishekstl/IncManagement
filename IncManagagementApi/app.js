const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

module.exports = app;
//Incident status
const Status = {
    NOTACKNOWLEDGED: 0,
    ACKNOWLEDGED: 1,
    INPROGRESS: 2,
    RESOLVED: 3,
    REJECTED: 4
 };

 const IncType = {
     BIOSISSUE: 0,
     NETWORKISSUE : 1,
     OSISSUE : 2,
     SOFTWAREISSUE : 3,
     LOGINISSUE : 4
 }
// // Array maintaining the incidents which are already acknowledged in the system
// let ackinclist = [];
// // Array maintaining the incidents which are not acknowledged in the system
// let nonackinclist = [];
// // Array maintaining the incidents which are in progress in the system
// let inproginclist = [];
// // Array maintaining the incidents which are in resolved in the system
// let resolvedinclist = [];
// // Array maintaining the incidents which are in resolved in the system
// let rejectedinclist = [];

let inclist = [
    {
        incid: 1,
        title: 'System not booting',
        assignedto: 'Shivesh',
        recieved_date: '2022-02-06',
        submitter: 'Admin',
        description: 'After windows update system is not booting',
        status : Status.NOTACKNOWLEDGED,
        type : IncType.BIOSISSUE,
        resolvercomments : ''
    },
    {
        incid: 2,
        title: 'Network connection failure in laptop',
        assignedto: 'Abhishek',
        recieved_date: '2022-02-05',
        submitter: 'Rohit',
        description: 'Network not connecting to wifi in the laptop, seems driver issue',
        status : Status.NOTACKNOWLEDGED,
        type : IncType.NETWORKISSUE,
        resolvercomments : ''
    },
    {
        incid: 3,
        title: 'Login not working after password reset',
        assignedto: 'Bhavna',
        recieved_date: '2022-02-05',
        submitter: 'Priya',
        description: 'After password reset was done by user, the login to the system is not working',
        status : Status.NOTACKNOWLEDGED,
        type : IncType.LOGINISSUE,
        resolvercomments : ''
    },
    {
        incid: 4,
        title: 'Windows OS crashes with blue screen error',
        assignedto: 'Ritesh',
        recieved_date: '2022-02-05',
        submitter: 'Twinkle',
        description: 'Windows OS randomly crashes with blue screen error, driver not updated',
        status : Status.NOTACKNOWLEDGED,
        type : IncType.OSISSUE,
        resolvercomments : ''
    },
    {
        incid: 5,
        title: 'VSCode is not launching after installation by admin',
        assignedto: 'Atin',
        recieved_date: '2022-02-05',
        submitter: 'Supriya',
        description: 'After new installation of VSCode it is not launching, please check the issue',
        status : Status.NOTACKNOWLEDGED,
        type : IncType.SOFTWAREISSUE,
        resolvercomments : ''
    }
]

function filterIncBasedOnStatus(status){
 return inclist.filter(function(item){
    return item.status === status;         
 });
}

// get the list of acknowledged incidents
function getAckIncList(){
  return filterIncBasedOnStatus(Status.ACKNOWLEDGED);
}

// get the list of not acknowledged incidents
function getNonAckIncList(){
  return filterIncBasedOnStatus(Status.NOTACKNOWLEDGED);
}

// get the list of in progress incidents
function getInProgressIncList(){
  return filterIncBasedOnStatus(Status.INPROGRESS);
}

// get the list of resolved incidents
function getResolvedIncList(){
  return filterIncBasedOnStatus(Status.RESOLVED);
}

// get the list of rejected incidents
function getRejectedIncList(){
  return filterIncBasedOnStatus(Status.REJECTED);
}

function sendGetPacket(list, res){
   res.json(list);
   res.send();
}

// get request for all acknowledged incidents for a user
app.get('/ackinclist', (_req, res) => {
    sendGetPacket(getAckIncList(), res);
})

// get request for all not acknowledged incidents for a user
app.get('/toackinclist', (_req, res) => {
    sendGetPacket(getNonAckIncList(), res);
})

// get request for all inprogress incidents for a user
app.get('/inproginclist', (_req, res) => {
    sendGetPacket(getInProgressIncList(), res);
})

// get request for all inprogress incidents for a user
app.get('/resolvedinclist', (_req, res) => {
    sendGetPacket(getResolvedIncList(), res);
})

// get request for all inprogress incidents for a user
app.get('/rejectedinclist', (_req, res) => {
    sendGetPacket(getRejectedIncList(), res);
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

// put request to acknowledge incidents
app.put('/ackincidents', function (req, res) {
    updateIncStatus(req, Status.ACKNOWLEDGED);
    res.send('incidents updated to acknowledged');
});

// put request to progress incidents
app.put('/progincidents', function (req, res) {
    updateIncStatus(req, Status.INPROGRESS);
    res.send('incidents updated to inprogress');
});

// put request to resolve incidents
app.put('/resolveincidents', function (req, res) {
    updateIncStatus(req, Status.RESOLVED);
    res.send('incidents updated to resolved');
});

// put request to reject incidents
app.put('/progincidents', function (req, res) {
    updateIncStatus(req, Status.REJECTED);
    res.send('incidents updated to rejected');
});

function updateIncStatus(req, status){
    const jsonBodyParam = JSON.stringify(req.body.inc);
    const incUpdateList = JSON.parse(jsonBodyParam);
    incUpdateList.forEach(ackitem => {
        const index = inclist.findIndex(el => el.incid.toString() === ackitem.id);
        let item = inclist[index];
        item.status = status; // changing status
        inclist[index] = item;
    });
}



app.listen(3000, () => console.log('Server ready'))
