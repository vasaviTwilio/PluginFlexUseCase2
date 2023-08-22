const https = require('https');
const querystring = require('querystring');

// Jira API credentials
//https://jiraticketfortwilio.atlassian.net/jira/servicedesk/projects/TM/queues/custom/4

const jiraUrl = 'https://jiraticketfortwilio.atlassian.net/jira/servicedesk/projects/TM/queues/custom/4';

//vasaviseelam@gmail.com
const username = 'vasaviseelam@gmail.com';

//ATCTT3xFfGN0t6VbvOX9FQ9f-1Df5lieaRmifUzg26SjiM8faQTa_o9P5e068tl1Jh5fPbCPRHbg5qyDUPVierOGqhAW8MYHreJ7TaF4xLV5oL8oUWywTQS1r4ayQKWaMo5Qp8AOS7X2t5kNSPIECxCdsnwsb_UEiAjWWeZr6f01IGmcB5DQJDk=D89BCC47
const apiToken = 'ATCTT3xFfGN0t6VbvOX9FQ9f-1Df5lieaRmifUzg26SjiM8faQTa_o9P5e068tl1Jh5fPbCPRHbg5qyDUPVierOGqhAW8MYHreJ7TaF4xLV5oL8oUWywTQS1r4ayQKWaMo5Qp8AOS7X2t5kNSPIECxCdsnwsb_UEiAjWWeZr6f01IGmcB5DQJDk=D89BCC47';


// Customer information
const customerName = 'Vasavi';
const email="vasaviseelam@gmail.com"
const issueSummary = 'Creating a ticket on customer behalf';
const issueDescription = 'Customer card is not working';

const authHeader = `Basic ${Buffer.from(`${username}:${apiToken}`).toString('base64')}`;

const postData = JSON.stringify({
  fields: {
    project: {
      key: 'TM', // Replace with your Jira project key
    },
    summary: issueSummary,
    description: issueDescription,
    issuetype: {
      name: 'Task', // Adjust the issue type if needed
    },
  },
});

const options = {
  hostname: jiraUrl.replace(/^https?:\/\//, ''),
  path: '/rest/api/3/issue',
  method: 'POST',
  headers: {
    'Authorization': authHeader,
    'Content-Type': 'application/json',
    'Content-Length': postData.length,
  },
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 201) {
      console.log(`Jira ticket created successfully. Response: ${data}`);
    } else {
      console.error('Error creating Jira ticket. Status:', res.statusCode);
      console.error('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error making API request:', error.message);
});

req.write(postData);
req.end();