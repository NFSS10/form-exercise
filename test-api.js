const url = "http://localhost:5000";


const createFeedback = async () => {
    const response = await fetch(`${url}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Nuno Silva",
            email: "email@example.com",
            message: "This is a test message",
            feedbackType: "bug"
        })
    });
    const data = await response.json();
    console.log("\ncreateFeedback", data);
}

const createBadFeedback = async () => {
    const response = await fetch(`${url}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "email@example.com",
            message: "This is a test message"
        })
    });
    const data = await response.json();
    console.log("\ncreateBadFeedback", data);
}

const getFeedbackFilteredByName = async () => {
    const name = "John Doe";

    const response = await fetch(`${url}/api/feedback?name=${name}`)
    const data = await response.json();
    console.log("\ngetFeedbackFilteredByName", name, data);
}

const getFeedbackFilteredByType = async () => {
    const type = "bug";

    const response = await fetch(`${url}/api/feedback?type=${type}`)
    const data = await response.json();
    console.log("\ngetFeedbackFilteredByType", type, data);
}

const getFeedbackPage2 = async () => {
    const response = await fetch(`${url}/api/feedback?page=2`);
    const data = await response.json();
    console.log("\ngetFeedbackPage2", data);
}

const getFeedbackPageSmallerPageSize = async () => {
    const response = await fetch(`${url}/api/feedback?pageSize=4`);
    const data = await response.json();
    console.log("\ngetFeedbackPageSmallerPageSize", data);
}

const getFeedbackSortedByName = async () => {
    const response = await fetch(`${url}/api/feedback?pageSize=4&sort=name`);
    const data = await response.json();
    console.log("\ngetFeedbackSortedByName", data);
}

const getFeedbackSortedByDate = async () => {
    const response = await fetch(`${url}/api/feedback?pageSize=4&sort=createdAt`);
    const data = await response.json();
    console.log("\ngetFeedbackSortedByDate", data);
};


(async () => {
    await createFeedback();
    await createBadFeedback();

    await getFeedbackFilteredByName();
    await getFeedbackFilteredByType();
    await getFeedbackPage2();
    await getFeedbackPageSmallerPageSize();
    await getFeedbackSortedByName();
})();
