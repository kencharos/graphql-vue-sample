const koa = require('koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

const { makeExecutableSchema } = require("graphql-tools");

// モックデータ
const books = [
  {
    id: "1",
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
    price: 2000
  },
  {
    id:"2",
    title: "Jurassic Park",
    author: "Michael Crichton",
    price: 3000
  }
];

// GraphQLのスキーマ情報
// Query-取得操作、 Mutation-変更操作, 他:型定義. !はRequired
const typeDefs = `
  type Query { 
    book(id: String!): Book  
    books: [Book] 
  }
  type Mutation {
    addBook(id: String!, title: String!, author: String!, price:Int!): Book 
  }
  type Book { id:String!, title: String!, author: String!, price:Int! }
`;

// resolver(データ処理)の設定。
// Query., Mutation の処理を記述
// DBからデータを取得したり、APIを呼び出したりする処理もここで記述
const resolvers = {
  Query: {
    books: () => books, 
    book: (root, args)  => {
        console.log(args) 
        let {id} = args; // query arguments passed by args.
        let res = books.filter(b => b.id == id);
        return res.length == 1 ? res[0]: null;
    }
  },
  Mutation: {
    addBook: (root, args) => {
        let {id, title, author, price} = args;
        let book = {id:id, title:title, author:author, price:price};
        books.push(book);
        return book;
    }
  }
};

// GraphQL の Schema 設定
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema: schema }));
router.get('/graphql', graphqlKoa({ schema: schema }));

// graphial は GraphQL を試せる便利　View.
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);

console.log("Runinng, access http://localhost:3000/graphiql")