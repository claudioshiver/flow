import { Construct } from 'constructs';
import {App, RemovalPolicy, Stack, StackProps} from "aws-cdk-lib";
import {AttributeType, BillingMode, ProjectionType, Table} from "aws-cdk-lib/aws-dynamodb";
import {APP_REGION, APP_SLUG} from "./src/lib/constants";

export class DynamoDbStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Table(this, 'TagsTable', {
      tableName: `${APP_SLUG}-tags`,
      partitionKey: { name: 'id', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new Table(this, 'LyricsTable', {
      tableName: `${APP_SLUG}-lyrics`,
      partitionKey: { name: 'id', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const notes = new Table(this, 'NotesTable', {
      tableName: `${APP_SLUG}-notes`,
      partitionKey: { name: 'id', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    notes.addGlobalSecondaryIndex({
      indexName: 'UserIdCreatedAtIndex',
      partitionKey: { name: 'userId', type: AttributeType.STRING },
      sortKey: { name: 'createdAt', type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    notes.addGlobalSecondaryIndex({
      indexName: 'UserIdLyricOrderIndex',
      partitionKey: { name: 'userId', type: AttributeType.STRING },
      sortKey: { name: 'lyricOrder', type: AttributeType.NUMBER },
      projectionType: ProjectionType.ALL,
    });
  }
}

const app = new App();

new DynamoDbStack(app, 'DynamoDbStack', {
  env: {
    region: APP_REGION,
  }
});