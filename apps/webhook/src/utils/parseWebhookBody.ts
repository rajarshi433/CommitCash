import axios from "axios";

type bodyType = {
    comment: {
        body: string;
        html_url: string;
    };
    sender: {
        login: string;
        id: number;
    };
};

const parseWebhookBody = async (body: bodyType) => {
    const bountyGiverUsername = body.sender.login;
    const bountyGiverId = body.sender.id;
    const commentBody = body.comment.body;
    let [bountyReceiverUsername, , bountyAmount] = commentBody.split(/\s+/);
    bountyReceiverUsername = (bountyReceiverUsername as string).replace("@", "");

    const getBountyReceiverId = await axios.get(`https://api.github.com/users/${bountyReceiverUsername}`);

    const bountyReceiverId = getBountyReceiverId.data.id;
    bountyAmount = (bountyAmount as string).replace("$", "");

    const commentLink = body.comment.html_url;

    return {
        bountyGiverId,
        bountyGiverUsername,
        bountyReceiverId,
        bountyReceiverUsername,
        bountyAmount,
        commentLink,
    };
};

export { parseWebhookBody };
