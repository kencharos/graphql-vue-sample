<template>
  <div class="apollo-example">

    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/Books.gql')"
      :variables="{id, title, author, price }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <table>
            <tr><th>ID</th><th>title</th><th>author</th><th>price</th></tr>
            <tr v-for="book in data.books">
              <td>{{book.id}}</td>
              <td>{{book.title}}</td>
              <td>{{book.author}}</td>
              <td>{{book.price}}</td>
            </tr>

          </table>

        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>


    <div class="form">
      id<input v-model="id" class="input">
      title<input v-model="title" class="input">
      author<input v-model="author" class="input">
      price<input v-model="price" class="input" number><br>
      <button @click="addBook">Add Book</button>
    </div>
  </div>
</template>

<script>
import BOOK_ADD_MUTATION from '../graphql/BookAdd.gql';
import TAGS_QUERY from '../graphql/Books.gql';

export default {
  data() {
    return {
      id: '',
      title: '',
      author: '',
      price: 0,
    };
  },

  computed: {
  },

  methods: {
    addBook() {
      this.$apollo.mutate({
        mutation: BOOK_ADD_MUTATION,
        variables: {
          book: {
            id: this.id,
            title: this.title,
            author: this.author,
            price: this.price,
          },
        },
        update: (store, { data: { newTag } }) => {
          //TODO, refresh by SPA.
          window.location.reload();
        }
      });
    },
  },
};
</script>
