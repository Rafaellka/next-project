import type {NextApiRequest, NextApiResponse} from 'next'
import {MongoClient, Document, WithId} from "mongodb";
import {IQuestionWithUserAnswers} from "../../store/testReducer";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Document>>
) {
    await sendResult(JSON.parse(req.body));
    //@ts-ignore
    res.status(200);
}

async function sendResult(results: IQuestionWithUserAnswers[]) {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = await client.db('tests');
        const collection = await db.collection('results');
        await collection.insertOne({results});
    } catch(e) {
        console.log(e);
    } finally {
        await client.close();
    }
}