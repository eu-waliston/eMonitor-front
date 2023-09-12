function handleSendTicket(subject, content) {
    fetch('https://emonitor-tsa0.onrender.com/insert-ticket', {
        method: 'POST',
        body: JSON.stringify({
            subject: 'titleTest',
            content: 'TesteTesteTeste'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb25hc0BnbWFpbC5jb20iLCJpYXQiOjE2OTQ1MzU2OTUsImV4cCI6MTY5NDU3ODg5NX0.n5onMyEdmqfcyEbqtZ8nB6KQ7q3mwQd5Zv3F-DGNYeI'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
}