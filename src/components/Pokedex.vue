<template>
  <div class="column is-half is-offset-one-quarter">
      <h4 class="is-size-4">Pokedex</h4>
      <p id="INFO" style="color:red"></p>
      <hr>
      <button class="button is-info is-rounded" @click="GEN1">1 GEN</button>
      <button class="button is-info is-rounded" @click="GEN2">2 GEN</button>
      <button class="button is-info is-rounded" @click="GEN3">3 GEN</button>
      <button class="button is-info is-rounded" @click="GEN4">4 GEN</button>
      <button class="button is-info is-rounded" @click="GEN5">5 GEN</button>
      <button class="button is-info is-rounded" @click="GEN6">6 GEN</button>
      <button class="button is-info is-rounded" @click="GEN7">7 GEN</button>
      <button class="button is-info is-rounded" @click="GEN8">8 GEN</button>
      <hr>
      <input type="text" placeholder="Search pokemon by name" v-model="busca" class="input is-rounded">
      <hr>
      <div v-for="(poke) in resultadoBusca" :key="poke.name">
      <Pokemon :name="poke.name" :url="poke.url"/>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import Pokemon from './Pokemon';

export default {
    name: 'Pokedex',
    data(){
    return{
    pokemons: [],
    busca: ''
    }
  },
  created: function(){
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(res =>
    {
      //console.log(res.data.results);
      this.pokemons = res.data.results;
      //console.log(this.pokemons);
    });
  },
  methods:{
    GEN1: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(res =>{
      //console.log(res.data.results);
      this.pokemons = res.data.results;
      //console.log(this.pokemons);
      document.getElementById("INFO").innerHTML = "";
    });
    },
    GEN2: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=151").then(res =>{
      //console.log(res.data.results);
      this.pokemons = res.data.results;
      //console.log(this.pokemons);
      document.getElementById("INFO").innerHTML = "";
    });
    },
    GEN3: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=135&offset=251").then(res =>{
      //console.log(res.data.results);
      this.pokemons = res.data.results;
      //console.log(this.pokemons);
      document.getElementById("INFO").innerHTML = "";
    });
    },
    GEN4: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=108&offset=386").then(res =>{
      //console.log(res.data.results);
      this.pokemons = res.data.results;
      //console.log(this.pokemons);
      document.getElementById("INFO").innerHTML = "";
    });
    },
    GEN5: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=155&offset=494").then(res =>{
      //console.log(res.data.results);
      this.pokemons = res.data.results;
      //console.log(this.pokemons);
      document.getElementById("INFO").innerHTML = "";
    });
    },
    GEN6: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=72&offset=649").then(res =>{
      //console.log(res.data.results);
      this.pokemons = res.data.results;
      //console.log(this.pokemons);
      document.getElementById("INFO").innerHTML = "";
    });
    },
    GEN7: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=88&offset=721").then(res =>{
      //console.log(res.data.results);
      this.pokemons = res.data.results;
      //console.log(this.pokemons);
      document.getElementById("INFO").innerHTML = "";
    });
    },
    GEN8: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=89&offset=809").then(res =>{
      //console.log(res.data.results);
      this.pokemons = res.data.results;
      //console.log(this.pokemons);
      document.getElementById("INFO").innerHTML = "PokeAPI da 8 gen está em desenvolvimento";
    });
    }
  },
  components:{
    Pokemon
  },
  computed: {
    resultadoBusca: function(){
      if(this.busca == '' || this.busca == ' '){
        return this.pokemons;
      }
      else{
        return this.pokemons.filter(pokemon => pokemon.name.match(this.busca));
      }
    }
  }
}

</script>
