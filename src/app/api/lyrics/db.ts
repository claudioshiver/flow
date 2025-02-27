import {DynamoDBClient, GetItemCommand, PutItemCommand} from "@aws-sdk/client-dynamodb";
import {APP_REGION, APP_SLUG} from "@/lib/constants";
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";
import {Tree, TreeNodeItem} from "@/lib/types/Tree";

const client = new DynamoDBClient({ region: APP_REGION });

export async function getLyrics(userId: string) {
  const response = await client.send(
    new GetItemCommand({
      TableName: `${APP_SLUG}-lyrics`,
      Key: {
        id: { S: userId }
      }
    })
  );

  return response.Item
    ? unmarshall(response.Item) as Tree<'lyric'>
    : undefined;
}

export async function updateLyrics(userId: string, lyrics: TreeNodeItem<'lyric'>[]) {
  await client.send(
    new PutItemCommand({
      TableName: `${APP_SLUG}-lyrics`,
      Item: marshall({
        id: userId,
        items: lyrics
      } as Tree<'lyric'>)
    })
  );
}