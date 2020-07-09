<template>
  <div>
    <div>
      <md-field class="input-wrapper">
        <label>Token</label>
        <md-input v-model="token"></md-input>
        <md-button v-on:click="handleSendToken()" class="md-primary">{{
          submitBtnText
        }}</md-button>
      </md-field>
    </div>
    <div v-if="!skip">
      <div v-for="repo in [backend, frontend, painel]" :key="repo">
        <md-table v-model="repo.pullRequests.nodes" md-card>
          <md-table-toolbar>
            <h1 class="md-title">{{ repo.name }}</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Title" md-sort-by="Title" md-numeric>
              {{ item.title }}
            </md-table-cell>
            <md-table-cell md-label="Author" md-sort-by="Author">
              {{ item.author.login }}
            </md-table-cell>
            <md-table-cell
              md-label="Reviews Author"
              md-sort-by="Reviews Author"
            >
              <ul id="example-1" class="column-item">
                <li
                  v-for="(item, index) in item.reviews.nodes"
                  :key="item.author.login + index"
                >
                  {{ item.author.login }}
                </li>
              </ul>
            </md-table-cell>
            <md-table-cell md-label="State" md-sort-by="state">
              <ul id="example-1" class="column-item">
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
    </div>
  </div>
</template>

<script>
import mockedData from '../assets/mockedData';
import tk from '../services/tokenManager';
import gql from 'graphql-tag';

const QUERY = gql`
  query {
    backend: repository(owner: "BrainshipOrg", name: "backend") {
      name
      pullRequests(last: 10, states: [OPEN]) {
        nodes {
          title
          author {
            ...UserParts
          }
          url
          reviews(last: 10) {
            nodes {
              author {
                ...UserParts
              }
              state
            }
          }
        }
      }
    }
    frontend: repository(owner: "BrainshipOrg", name: "frontend") {
      name
      pullRequests(last: 10, states: [OPEN]) {
        nodes {
          title
          author {
            ...UserParts
          }
          url
          reviews(last: 10) {
            nodes {
              author {
                ...UserParts
              }
              state
            }
          }
        }
      }
    }
    painel: repository(owner: "BrainshipOrg", name: "painel-admin") {
      name
      pullRequests(last: 10, states: [OPEN]) {
        nodes {
          title
          author {
            ...UserParts
          }
          url
          reviews(last: 10) {
            nodes {
              author {
                ...UserParts
              }
              state
            }
          }
        }
      }
    }
  }

  fragment UserParts on User {
    login
  }
`;

export default {
  name: 'Home',
  props: {
    msg: String,
  },
  apollo: {
    backend: {
      query: QUERY,
    },
    frontend: {
      query: QUERY,
    },
    painel: {
      query: QUERY,
    },
  },
  data: () => ({
    skip: true,
    submitBtnText: 'Enviar',
    token: '',
    tableData: mockedData.data.repository.pullRequests.nodes,
  }),
  methods: {
    handleSendToken: function() {
      if (localStorage.token) {
        this.$apollo.queries.backend.refresh();
        this.$apollo.queries.frontend.refresh();
        this.$apollo.queries.painel.refresh();
      } else {
        this.submitBtnText = 'Refetch';
        this.skip = false;
        tk.set(this.token);
      }
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      if (localStorage.token) {
        this.submitBtnText = 'Refetch';
        this.skip = false;
      } else {
        this.submitBtnText = 'Enviar';
      }
    });
  },
};
</script>

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

.column-item {
  display: flex;
  flex-direction: column;
}
</style>
