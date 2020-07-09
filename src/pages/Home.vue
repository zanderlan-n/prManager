<template>
  <div>
    <p>
      {{ user }}
    </p>
    <div>
      <md-field class="input-wrapper">
        <label>Token</label>
        <md-input v-model="token"></md-input>
        <md-button v-on:click="handleSendToken()" class="md-primary">{{
          submitBtnText
        }}</md-button>
      </md-field>
    </div>
    <md-table v-model="tableData" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Pull Requests</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Title" md-sort-by="Title" md-numeric>
          {{ item.title }}
        </md-table-cell>
        <md-table-cell md-label="Author" md-sort-by="Author">
          {{ item.author.login }}
        </md-table-cell>
        <md-table-cell md-label="Reviews Author" md-sort-by="Reviews Author">
          <ul id="example-1">
            <li
              v-for="(item, index) in item.reviews.nodes"
              :key="item.author.login + index"
            >
              {{ item.author.login }}
            </li>
          </ul>
        </md-table-cell>
        <md-table-cell md-label="State" md-sort-by="state">
          <ul id="example-1">
            <li v-for="item in item.reviews.nodes" :key="item.reviews">
              {{ item.state }}
            </li>
          </ul>
        </md-table-cell>
        <md-table-cell md-label="URL" md-sort-by="url">
          <a v-bind:href="item.url">{{ item.url }}</a>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import mockedData from '../assets/mockedData';
import tk from '../services/tokenManager';
import gql from 'graphql-tag';

const QUERY = gql`
  query {
    user(login: "lucasrmp") {
      bio
    }
  }
`;

const apollo = {
  user: {
    query: QUERY,
  },
};

export default {
  name: 'Home',
  props: {
    msg: String,
  },
  apollo,
  data: () => ({
    submitBtnText: 'Enviar',
    token: '',
    tableData: mockedData.data.repository.pullRequests.nodes,
  }),
  methods: {
    handleSendToken: function() {
      if (localStorage.token) {
        this.$apollo.queries.user.refresh();
      } else {
        this.submitBtnText = 'Refetch';
        tk.set(this.token);
      }
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      if (localStorage.token) {
        this.submitBtnText = 'Refetch';
      } else {
        this.submitBtnText = 'Enviar';
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.input-wrapper {
  display: flex;
  width: 50%;
  margin: auto auto 30px;
}
</style>
