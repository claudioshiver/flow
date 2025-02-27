import {DynamoDBClient, GetItemCommand, PutItemCommand} from "@aws-sdk/client-dynamodb";
import {APP_REGION, APP_SLUG} from "@/lib/constants";
import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";
import {Tree, TreeNodeItem} from "@/lib/types/Tree";

const client = new DynamoDBClient({ region: APP_REGION });

export async function getTags(userId: string) {
  const response = await client.send(
    new GetItemCommand({
      TableName: `${APP_SLUG}-tags`,
      Key: {
        id: { S: userId }
      }
    })
  );

  return response.Item
    ? unmarshall(response.Item) as Tree<'tag'>
    : undefined;
}

export async function updateTags(userId: string, tags: TreeNodeItem<'tag'>[]) {
  await client.send(
    new PutItemCommand({
      TableName: `${APP_SLUG}-tags`,
      Item: marshall({
        id: userId,
        items: tags
      } as Tree<'tag'>)
    })
  );
}