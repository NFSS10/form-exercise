const url = "http://localhost:5000";


const names = [
    "John Doe",
    "Jane Doe",
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
    "Kevin",
    "Linda",
    "Mallory",
    "Nancy"
];
const emails = ["email@example.com", "test@email.com", "example@random.com"]
const feedbackTypes = ["bug", "suggestion"];
const titles = ["Feedback title 1", "Feedback title 2", "Feedback title 3", "A more creative feedback title"];
const message = [
    "This is a test message",
    "This is test message number two",
    "This is a very creative test message",
];

const createFeedback = async (name, email, feedbackType, title, message) => {
    const body = {
        name,
        email,
        feedbackType,
        title,
        message
    }
    
    const response = await fetch(`${url}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    const data = await response.json();
};

(async () => {
    const entriesNum = 25;
    
    const promises = [];
    for (let i = 0; i < entriesNum; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const email = emails[Math.floor(Math.random() * emails.length)];
        const feedbackType = feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)];
        const title = titles[Math.floor(Math.random() * titles.length)];
        const msg = message[Math.floor(Math.random() * message.length)];

        const promise = createFeedback(name, email, feedbackType, title, msg);
        promises.push(promise);
    }
    await Promise.all(promises);

    console.log("Populate done");
})();

