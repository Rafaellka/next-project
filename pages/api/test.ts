import type {NextApiRequest, NextApiResponse} from 'next'
import {MongoClient, Document, WithId} from "mongodb";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WithId<Document>>
) {
    const test = await getTest(Number(req.query.testid));
    //@ts-ignore
    res.status(200).json(test);
}

export async function getTest(testid: number) {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('tests');
        const collection = db.collection('tests');
        const test = await collection.findOne({testid});

        if (!test) {
            throw new Error();
        }
        // @ts-ignore
        delete test?._id;
        return test;
    } catch(e) {
        console.log(e);
    } finally {
        await client.close();
    }
}