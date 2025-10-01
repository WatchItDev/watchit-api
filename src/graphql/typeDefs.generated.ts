import type { DocumentNode } from 'graphql';
export const typeDefs = {
  kind: 'Document',
  definitions: [
    {
      kind: 'DirectiveDefinition',
      name: { kind: 'Name', value: 'cacheControl' },
      arguments: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'maxAge' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'scope' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CacheControlScope' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'inheritMaxAge' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          directives: [],
        },
      ],
      repeatable: false,
      locations: [
        { kind: 'Name', value: 'FIELD_DEFINITION' },
        { kind: 'Name', value: 'OBJECT' },
        { kind: 'Name', value: 'INTERFACE' },
        { kind: 'Name', value: 'UNION' },
      ],
    },
    {
      name: { kind: 'Name', value: 'Query' },
      kind: 'ObjectTypeDefinition',
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'getComment' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'CommentByIdentifierInput' },
                },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'getComments' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'CommentsFilterInput' } },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'page' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationInput' } },
              directives: [],
            },
          ],
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'getEdgeStatus' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'EdgeByIdentifierInput' } },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Edge' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'getPost' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'PostByIdentifierInput' } },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'getPosts' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'PostFilterInput' } },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'page' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationInput' } },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'getUser' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserByIdentifierInput' } },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      name: { kind: 'Name', value: 'Mutation' },
      kind: 'ObjectTypeDefinition',
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'sendHumanMessage' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'AgentInput' } },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'createComment' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCommentInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'updateComment' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateCommentInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'setEdgeStatus' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'SetEdgeStatusInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Edge' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'createPost' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreatePostInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'updatePost' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdatePostInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'hidePost' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'HidePostInput' } },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'createUser' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateUserInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'updateUser' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateUserInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
          },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      name: { kind: 'Name', value: 'Subscription' },
      kind: 'ObjectTypeDefinition',
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'onAgentMessage' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AgentOutput' } },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: { kind: 'Name', value: 'CacheControlScope' },
      directives: [],
      values: [
        { kind: 'EnumValueDefinition', name: { kind: 'Name', value: 'PUBLIC' }, directives: [] },
        { kind: 'EnumValueDefinition', name: { kind: 'Name', value: 'PRIVATE' }, directives: [] },
      ],
    },
    {
      kind: 'ScalarTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'ISO-8601 Date-Time string (e.g. 2024-04-17T15:22:00.000Z)',
        block: true,
      },
      name: { kind: 'Name', value: 'DateTime' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'Unix epoch in milliseconds (number).',
        block: true,
      },
      name: { kind: 'Name', value: 'Timestamp' },
      directives: [],
    },
    { kind: 'ScalarTypeDefinition', name: { kind: 'Name', value: 'Date' }, directives: [] },
    { kind: 'ScalarTypeDefinition', name: { kind: 'Name', value: 'JSON' }, directives: [] },
    { kind: 'ScalarTypeDefinition', name: { kind: 'Name', value: 'Upload' }, directives: [] },
    { kind: 'ScalarTypeDefinition', name: { kind: 'Name', value: 'ID' }, directives: [] },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'PaginationInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'limit' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'offset' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Message' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'content' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'AgentInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'message' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'AgentOutput' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'message' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'done' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Comment' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'body' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'post' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'parent' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'replies' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'page' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationInput' } },
              directives: [],
            },
          ],
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'base' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'BaseContent' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'CreateCommentInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'postId' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'min' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'parentId' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'min' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'body' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '500' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'UpdateCommentInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'id' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'min' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'body' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '500' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'CommentByIdentifierInput' },
      directives: [{ kind: 'Directive', name: { kind: 'Name', value: 'oneOf' }, arguments: [] }],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'id' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'CommentsFilterInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'userId' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'postId' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'parentId' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'EnumTypeDefinition',
      name: { kind: 'Name', value: 'VisibilitySetting' },
      directives: [],
      values: [
        { kind: 'EnumValueDefinition', name: { kind: 'Name', value: 'PUBLIC' }, directives: [] },
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'FOLLOWERS_ONLY' },
          directives: [],
        },
        { kind: 'EnumValueDefinition', name: { kind: 'Name', value: 'PRIVATE' }, directives: [] },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'BaseContent' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'user' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'createdAt' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'visibility' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'VisibilitySetting' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'active' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'EnumTypeDefinition',
      name: { kind: 'Name', value: 'EdgeState' },
      directives: [],
      values: [
        { kind: 'EnumValueDefinition', name: { kind: 'Name', value: 'NONE' }, directives: [] },
        { kind: 'EnumValueDefinition', name: { kind: 'Name', value: 'FOLLOW' }, directives: [] },
        { kind: 'EnumValueDefinition', name: { kind: 'Name', value: 'BLOCK' }, directives: [] },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Edge' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'user' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'isFollowing' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'isBlocked' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'followedAt' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'SetEdgeStatusInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'toUserId' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'status' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EdgeState' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'EdgeByIdentifierInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'toUserId' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'MediaAttachment' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'url' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'cid' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'title' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'type' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Post' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'title' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'body' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'comments' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'page' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationInput' } },
              directives: [],
            },
          ],
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'Comment' } },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'base' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'BaseContent' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'HidePostInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'postId' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'min' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'CreatePostInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'title' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '100' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'body' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '10' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'visibility' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'VisibilitySetting' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'UpdatePostInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'id' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'min' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'title' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '100' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'body' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '10' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'visibility' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'VisibilitySetting' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'PostByIdentifierInput' },
      directives: [{ kind: 'Directive', name: { kind: 'Name', value: 'oneOf' }, arguments: [] }],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'id' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'PostFilterInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'userId' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Social' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'platform' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'url' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
      ],
    },
    {
      name: { kind: 'Name', value: 'SocialInput' },
      kind: 'InputObjectTypeDefinition',
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'platform' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
          arguments: [],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'url' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'format' },
                  value: { kind: 'StringValue', value: 'uri', block: false },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'userId' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Profile' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'bio' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'username' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'picture' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'cover' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'User' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'address' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'email' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'displayName' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'profile' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Profile' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'verified' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'createdAt' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Timestamp' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'socials' },
          arguments: [],
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'Social' } },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'CreateUserInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'address' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'username' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '3' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '15' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'displayName' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '30' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'bio' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '10' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '200' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'picture' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'cover' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'socials' },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'SocialInput' } },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'UpdateUserInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'username' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '3' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '15' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'displayName' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '30' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'bio' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '10' },
                },
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'maxLength' },
                  value: { kind: 'IntValue', value: '200' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'picture' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'cover' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '1' },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'socials' },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'SocialInput' } },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'UserByIdentifierInput' },
      directives: [{ kind: 'Directive', name: { kind: 'Name', value: 'oneOf' }, arguments: [] }],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'id' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'email' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'format' },
                  value: { kind: 'StringValue', value: 'email', block: false },
                },
              ],
            },
          ],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'address' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [
            {
              kind: 'Directive',
              name: { kind: 'Name', value: 'constraint' },
              arguments: [
                {
                  kind: 'Argument',
                  name: { kind: 'Name', value: 'minLength' },
                  value: { kind: 'IntValue', value: '42' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'UsersFilterInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'name' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'verified' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'SchemaDefinition',
      operationTypes: [
        {
          kind: 'OperationTypeDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Query' } },
          operation: 'query',
        },
        {
          kind: 'OperationTypeDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Mutation' } },
          operation: 'mutation',
        },
        {
          kind: 'OperationTypeDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Subscription' } },
          operation: 'subscription',
        },
      ],
    },
  ],
} as unknown as DocumentNode;
