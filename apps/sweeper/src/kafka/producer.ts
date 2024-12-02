import { BountyClaimsType } from "@repo/common";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "commitcash-app",
    brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export async function pushToQueue(value: BountyClaimsType) {
    await producer.connect();
    await producer.send({
        topic: "bounty-claims",
        messages: [
            {
                value: JSON.stringify(value),
            },
        ],
    });
}
