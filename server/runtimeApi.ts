import type { IncomingMessage, ServerResponse } from 'node:http'
import { MongoClient } from 'mongodb'

// Connection settings. Override with environment variables, e.g.
//   MONGO_URL=mongodb://user:pass@host:27017/?authSource=admin
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017'
const MONGO_DB = process.env.MONGO_DB ?? 'ATSDB'
const RUNTIME_COLLECTION = 'runtime'
const MAX_RECORDS = 500

let client: MongoClient | null = null

function getClient(): MongoClient {
  if (!client) {
    client = new MongoClient(MONGO_URL, { serverSelectionTimeoutMS: 5000 })
  }
  return client
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

// GET /api/runtime -> most recent documents from the 'runtime' collection
export async function handleRuntimeRequest(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') {
    send(res, 405, { error: 'Method not allowed' })
    return
  }
  try {
    const docs = await getClient()
      .db(MONGO_DB)
      .collection(RUNTIME_COLLECTION)
      .find({})
      .sort({ last_ping: -1 })
      .limit(MAX_RECORDS)
      .toArray()
    send(res, 200, { records: docs })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    send(res, 500, { error: `Database query failed: ${message}` })
  }
}
