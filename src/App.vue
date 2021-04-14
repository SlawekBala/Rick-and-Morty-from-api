<template>
  <div class="container">

    <div class="row">
      <div class="col">
        <img src="../src/assets/Group 24.png" alt="Rick and Morty logo">
      </div>
      <div class="col">
        <div class="form">
        <div class="form-group">
          <input class="form-control" type="text" id="name" name="name" placeholder="Start typing to search...">
        </div>
        </div>
      </div>
    </div>
    
    <hr>

      <nav>
    <a href="#" @click="showFav = !showFav">All Characters</a>
    <a href="#" @click="showFav = !showFav">Favorites</a>
      </nav>

    <table class="table table-hover">
      <tr>
        <th>Photo</th>
        <th>Character ID</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Species</th>
        <th>Last Episode</th>
        <th>Add To Favorites</th>
      </tr>
      <tr v-for="character in characters" v-bind:key="character.id">
        <td><img style="max-width: 43px; max-height: 68px" :src="character.image" /></td>
        <td>{{character.id}}</td>
        <td>{{character.name}}</td>
        <td>{{character.gender}}</td>
        <td>{{character.species}}</td>
        <td>{{character.episode.length}}</td>
        <td>

          <input type="checkbox" class="material-icons" :value="`${character.id}`" v-model="checkedNames" @change="addToFavorites">
        </td>
      </tr>
    </table>

    <pagination v-if="!showFav" :records="infoApi.count" v-model="page" :per-page="20" @paginate="fetchCharacters(page)"></pagination>

  </div>
</template>

<script>
  import { getCharacter } from 'rickmortyapi';
  import Pagination from 'vue-pagination-2';

  export default {
    data () {
      return {
        page: 1,
        characters: [],
        favCharacters: [],
        infoApi: {
          count: 0
        },
        checkedNames: [],
        showFav: false
      }
    },
    watch: {
      showFav () {
        if (this.showFav) {
          this.filterFav()
          this.characters = this.favCharacters
        } else {
          this.init()
        }
      }
    },
    methods: {
      async fetchCharacters(params = 1){
        const {results, info} = await getCharacter({
          page: params
        })

        this.infoApi = info;
        this.characters = results;

      },

      filterFav() {
        this.favCharacters = this.characters.filter(el => {
          if(this.checkedNames.includes(String(el.id))) {
            return true
          } else {
            return false
          }
        })

      },

      addToFavorites() {
        localStorage.setItem('myfavorities', this.checkedNames)
      },

      showFavorities() {
        if (localStorage.getItem('myfavorities')) {
          this.checkedNames = localStorage.getItem('myfavorities').split(',')
        }
      },

      async init () {
        await this.fetchCharacters()
        this.showFavorities()
        this.filterFav()
      }
    },

    created() {
      this.init()
    },

    components: {
      Pagination
    }
  }
</script>
<style scoped>
#app{
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

th {
  background-color: #e5eaf440;
}

nav {
  max-width: 1440px;
  margin: 15px auto;
  text-align: left;
}

nav a {
  display: inline-block;
  font-size: 16px;
  font-family: 'Roboto Condensed', sans-serif;
  text-decoration: none;
  color: #555;
  padding: 5px;
  margin: 0 10px;
}


nav a:hover {

  border-bottom: 4px solid #11B0C8;
  color: #11B0C8;
}
.row{
  margin-top: 10px;
}

.form {
  margin-top: 24px;
  border-radius: 30;
}
.page-item.active .page-link {
  background: #11B0C8;
  border-color: #A9B1BD;
  color: #fff
}

</style>