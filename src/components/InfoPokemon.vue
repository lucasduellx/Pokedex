<template>
    <div>
    <div class="column is-half is-offset-one-quarter">
        <router-link :to="{name: 'Pokedex'}"><button class="button is-info is-rounded">Pokedex</button></router-link>
        <h1 class="title">{{$route.params.pokeName | upper}}</h1>
        <h2 class="subtitle">Information</h2>
        <hr>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                <th><abbr title="NAME">Inicial</abbr></th>
                <th v-if="Evolution1.length > 0"><abbr title="EVO1">Evolução 1</abbr></th>
                <th v-if="Evolution2.length > 0"><abbr title="EVO2">Evolução 2</abbr></th>
                </tr>
            </thead>
            <tbody>
            <td class="center-textt">
                
                <tr v-for="(poke,index) in Evolution0" :key="index" class="b-1px">{{ poke | upper }}
                <br> 
                <router-link :to="{name: 'InfoPokemon', params: {pokeName: poke}}"><img :src="Img0[index]" alt="Falha no carregamento da imagem"></router-link></tr>
                
            </td>
            <td v-if="Evolution1.length > 0">
                <tr v-for="(poke,index) in Evolution1" :key="index" class="b-1px">{{ poke | upper }} 
                <br> 
                <router-link :to="{name: 'InfoPokemon', params: {pokeName: poke}}"><img :src="Img1[index]" alt="Falha no carregamento da imagem"></router-link></tr>
            </td>
            <td v-if="Evolution2.length > 0">
                <tr v-for="(poke,index) in Evolution2" :key="index" class="b-1px">{{ poke | upper }} 
                <br> 
                <router-link :to="{name: 'InfoPokemon', params: {pokeName: poke}}"><img :src="Img2[index]" alt="Falha no carregamento da imagem"></router-link></tr>
            </td>
            </tbody>
        </table>
        <div class="box">
        <h3>Altura: {{ PokeCarac.Altura }} cm</h3>
        <h3>Peso: {{ PokeCarac.Peso/10 }} kg</h3>
        </div>
        <div class="box">
            Abilities:
            <p v-for="Ability in PokeA" :key="Ability">{{ Ability | upper }}</p>
        </div>
        <div class="box" v-if="PokeHA.length >= 1">
            Hidden Ability:
            <p v-for="HAbility in PokeHA" :key="HAbility">{{ HAbility | upper }}</p>
        </div>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                <th><abbr title="Tipo">Tipo</abbr></th>
                <th><abbr title="HP">HP</abbr></th>
                <th><abbr title="ATK">ATK</abbr></th>
                <th><abbr title="SPATK">SPATK</abbr></th>
                <th><abbr title="DEF">DEF</abbr></th>
                <th><abbr title="SPDEF">SPDEF</abbr></th>
                <th><abbr title="SPD">SPD</abbr></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Base</td>
                    <td v-for="(poke,index) in PokeStats" :key="index">{{poke.base_stat}}</td>
                </tr>
                <tr>
                    <td>Effort</td>                  
                    <td v-for="(poke,index) in PokeStats" :key="index">{{poke.effort}}</td>                              
                </tr>
            </tbody>
        </table>
        <hr>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                <th><abbr title="Number">Number</abbr></th>
                <th><abbr title="Move">Move</abbr></th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                <th><abbr title="Number">Number</abbr></th>
                <th><abbr title="Move">Move</abbr></th>
                </tr>
            </tfoot>
            <tbody>
                <tr v-for="(poke,index) in PokeMoves" :key="index">
                    <td>{{index}}</td>
                    <td>{{poke.move.name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'InfoPokemon',
     created: function(){
        axios.get("https://pokeapi.co/api/v2/pokemon/"+this.$route.params.pokeName).then(res =>{
            //console.log(res.data.moves);
            this.PokeMoves = res.data.moves;
            this.PokeStats = res.data.stats;
            this.PokeAbilities = res.data.abilities;
            //console.log(this.PokeStats);
            //console.log(this.PokeAbilities);
            this.PokeAbilities.forEach(element => {
                if(element.is_hidden){
                    axios.get("https://pokeapi.co/api/v2/ability/"+element.ability.name).then(res2 =>{
                        res2.data.effect_entries.forEach(name => {
                            if(name.language.name == 'en'){
                                this.PokeHA.push(element.ability.name + " - " + name.effect);
                            }
                        });
                    });
                }
                else{
                    axios.get("https://pokeapi.co/api/v2/ability/"+element.ability.name).then(res2 =>{
                        res2.data.effect_entries.forEach(name => {
                            if(name.language.name == 'en'){
                                this.PokeA.push(element.ability.name + " - " + name.effect);
                            }
                        });
                    });
                }
            });
            var ID = res.data.id;
            axios.get("https://pokeapi.co/api/v2/pokemon-species/"+ID).then(res2 =>{
                this.PokeEvoChain = res2.data;
                if(this.PokeEvoChain.evolves_from_species != null){
                    var URL = this.PokeEvoChain.evolves_from_species.url;
                    axios.get(URL).then(res3 => {
                        this.PokeEvo0 = res3.data;
                        if(this.PokeEvo0.evolves_from_species == null){
                            this.Evolution0.push(this.PokeEvo0.name);
                        }
                        else{
                            this.Evolution0.push(this.PokeEvo0.evolves_from_species.name);
                        }
                    });
                }
                else{
                    this.Evolution0.push(this.$route.params.pokeName);
                }
                URL = this.PokeEvoChain.evolution_chain.url;
                axios.get(URL).then(res3 =>{
                this.PokeEvo1 = res3.data.chain.evolves_to;
                if(this.PokeEvo1.length > 0){
                    this.PokeEvo1.forEach(element => {
                        this.Evolution1.push(element.species.name);
                        this.PokeEvo2 = element.evolves_to;
                    });
                    if(this.PokeEvo2.length > 0){
                        this.PokeEvo2.forEach(element2 => {
                        this.Evolution2.push(element2.species.name);
                        });
                    }
                }
                this.Evolution0.forEach(element => {
                    axios.get("https://pokeapi.co/api/v2/pokemon/"+element).then(r =>{
                        this.Img0.push(r.data.sprites.front_default);
                    });
                });
                this.Evolution1.forEach(element => {
                    axios.get("https://pokeapi.co/api/v2/pokemon/"+element).then(r =>{
                        this.Img1.push(r.data.sprites.front_default);
                    });
                });
                this.Evolution2.forEach(element => {
                    axios.get("https://pokeapi.co/api/v2/pokemon/"+element).then(r =>{
                        this.Img2.push(r.data.sprites.front_default);
                    });
                });
                });
            });
        });
    },
    updated: function(){
        axios.get("https://pokeapi.co/api/v2/pokemon/"+this.$route.params.pokeName).then(res =>{
            this.PokeMoves = res.data.moves;
            this.PokeCarac.Peso = res.data.weight;
            this.PokeCarac.Altura = res.data.height;
        });
    },
    data(){
        return{
            PokeMoves : [],
            PokeCarac: {
                Altura: '',
                Peso: '',
            },
            PokeStats : [],
            PokeAbilities: [],
            PokeA : [],
            PokeHA : [],
            Img0: [],
            Img1: [],
            Img2: [],
            PokeEvo0: [],
            PokeEvo1: [],
            PokeEvo2: [],
            Evolution0: [],
            Evolution1: [],
            Evolution2: [],
            PokeEvoChain: []
        }
    },
    filters:{
        upper: function(value){
            var newName = value[0].toUpperCase() + value.slice(1);
            return newName;
        }
    },
}
</script>

<style>
    .center-textt{
        text-align: center;
    }
    .b-1px{
        display: inline-block;
        width: 100%;
    }
</style>