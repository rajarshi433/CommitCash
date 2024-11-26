type bodyType = {
    comment: {
        body: string;
        html_url: string;
    };
    sender: {
        login: string;
    };
};
const parseWebhookBody = (body: bodyType) => {
    const bountyGiverId = body.sender.login;
    const commentBody = body.comment.body;
    let [bountyReceiverId, , bountyAmount] = commentBody.split(/\s+/);
    bountyReceiverId = (bountyReceiverId as string).replace("@", "");
    bountyAmount = (bountyAmount as string).replace("$", "");

    const commentLink = body.comment.html_url;

    return {
        bountyGiverId,
        bountyReceiverId,
        bountyAmount,
        commentLink,
    };
};

export { parseWebhookBody };
