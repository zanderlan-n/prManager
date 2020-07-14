<template>
  <div>
    <md-table v-model="repo.pullRequests.nodes" md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{ repo.name }}</h1>
        <md-button v-on:click="copyToClipboard(repo.name)" class="md-primary">
          Copy
        </md-button>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Title" md-sort-by="Title">
          {{ item.title }}
        </md-table-cell>
        <md-table-cell md-label="Author" md-sort-by="Author">
          {{ item.author.login }}
        </md-table-cell>
        <md-table-cell md-label="Reviews Author" md-sort-by="Reviews Author">
          <ul class="column-item">
            <li v-for="(item, index) in item.reviews.nodes" :key="index">
              {{ item.author.login }}
            </li>
          </ul>
        </md-table-cell>
        <md-table-cell md-label="State" md-sort-by="state">
          <ul class="column-item">
            <li v-for="(item, index) in item.reviews.nodes" :key="index">
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
export default {
  name: 'Table',

  props: {
    copyToClipboard: Function,
    repo: Object,
  },

  apollo: {},

  data: () => ({}),

  methods: {},

  mounted: function() {},
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
