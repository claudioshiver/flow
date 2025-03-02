import {
  DeleteItemCommand,
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  QueryCommandOutput
} from "@aws-sdk/client-dynamodb";
import {APP_REGION, APP_SLUG} from "@/lib/constants";
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";
import {Note, NoteInput, NoteModel} from "@/lib/types/Note";

const client = new DynamoDBClient({region: APP_REGION});

function mapNotes(items: Note[], response: QueryCommandOutput) {
  return [
    ...items,
    ...response.Items?.map(item => (
      unmarshall(item)
    ) as NoteModel).map(item => ({
      ...item,
      tags: item.tags
        .split("|")
        .map(tag => tag.replaceAll("|", ""))
        .filter(Boolean)
    }) as Note) || []
  ];
}

export async function getNotesByTag(userId: string, tag: string) {
  let items: Note[] = [];
  let lastEvaluatedKey: any = undefined;

  do {
    const command = new QueryCommand({
      TableName: `${APP_SLUG}-notes`,
      IndexName: "UserIdSortOrderIndex",
      KeyConditionExpression: "userId = :uid",
      FilterExpression: "contains(tags, :tag) AND attribute_not_exists(lyricId)",
      ExpressionAttributeValues: {
        ":uid": {S: userId},
        ":tag": {S: `|${tag}|`}
      },
      ScanIndexForward: true, // ASC
      ExclusiveStartKey: lastEvaluatedKey
    });

    const response = await client.send(command);

    if (response.Items) {
      items = mapNotes(items, response);
    }

    lastEvaluatedKey = response.LastEvaluatedKey;

  } while (lastEvaluatedKey);

  return items;
}

export async function getNotesByLyric(userId: string, lyricId: string) {
  let items: Note[] = [];
  let lastEvaluatedKey: any = undefined;

  do {
    const command = new QueryCommand({
      TableName: `${APP_SLUG}-notes`,
      IndexName: "UserIdLyricOrderIndex", // Query su userId + lyricId
      KeyConditionExpression: "userId = :uid",
      FilterExpression: "lyricId = :lid",
      ExpressionAttributeValues: {
        ":uid": {S: userId},
        ":lid": {S: lyricId}
      },
      ScanIndexForward: true, // ASC
      ExclusiveStartKey: lastEvaluatedKey
    });

    const response = await client.send(command);

    if (response.Items) {
      items = mapNotes(items, response);
    }

    lastEvaluatedKey = response.LastEvaluatedKey;

  } while (lastEvaluatedKey);

  return items;
}

export async function putNote(userId: string, note: NoteInput) {
  const updatedAt = new Date().toISOString();
  const rate = note.rate || 1;

  const item = marshall({
    id: `${userId}:${note.noteId}`,
    userId: userId,
    noteId: note.noteId,
    tags: `|${note.tags.join("|")}|`,
    content: note.content,
    createdAt: note.createdAt || updatedAt,
    updatedAt,
    rate,
    lyricId: note.lyricId,
    lyricOrder: note.lyricOrder,
    sortOrder: `${rate}:${updatedAt}`,
  }, {removeUndefinedValues: true});

  const command = new PutItemCommand({
    TableName: `${APP_SLUG}-notes`,
    Item: item,
  });

  await client.send(command);
}

export async function deleteNote(userId: string, noteId: string) {
  const command = new DeleteItemCommand({
    TableName: `${APP_SLUG}-notes`,
    Key: {
      id: {S: `${userId}:${noteId}`}
    },
  });

  await client.send(command);
}