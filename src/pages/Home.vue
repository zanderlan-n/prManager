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
      <div v-for="(repo, index) in [backend, frontend, painel]" :key="index">
        <Table :repo="repo" :copyToClipboard="copyToClipboard" />
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

import tk from '../services/tokenManager';
import Table from '../components/Table';

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

    copyToClipboard: function(name) {
      const urls = this[name].pullRequests.nodes.reduce(
        (acc, node) => `${acc}\n${node.url}`,
        ''
      );

      navigator.clipboard.writeText(urls);
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

  components: {
    Table,
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
