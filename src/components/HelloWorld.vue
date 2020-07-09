<template>
  <div class="hello">
    <div>{{ user.bio }}</div>
    <p>HELLO WORLD</p>
  </div>
</template>

<script>
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

console.log({ apollo });

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  apollo,
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
</style>
