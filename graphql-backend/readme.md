## Applo-koa backend

## usage

`node index.js`

access `http://localhost:3000/graphiql` for tring.

## Scheme

if shecme is bellow.

```
  type Query { 
    book(id: String!): Book  
    books: [Book] 
  }
  type Mutation {
    addBook(id: String!, title: String!, author: String!, price:Int!): Book 
  }
  type Book { id:String!, title: String!, author: String!, price:Int! }
  input NewBook { id:String!, title: String!, author: String!, price:Int! }
```

Client is following.

```
<Query or Mutation>{
    <opereationName>(arguments){
        <returnTypeSelection>
    }
}
```

## Query

### ALL 

```
query{
  books {
    title
    author
  }
}
```

### Query by id

```
query{
  book(id:"1") {
    id
    title
    author
    price
  }
}
```

## Mutation

### Add Book 

```
mutation {
  addBook(book{id: "3", title: "t", author: "a", price: 3000}) {
    id
  }
}
```

