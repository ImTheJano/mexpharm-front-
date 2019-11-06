<template>
    <div class="container">
        <h4>Configuración</h4>
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="form-row mt-3">
                            <div class="form-group col-12 col-md-12">
                                <label>Clave Mexpharm</label>
                                <input type="text" class="form-control" v-model="claveMexpharm">
                            </div>
                            <div class="form-group col-12 col-md-12">
                                <label>Sede de campaña</label>
                                <input type="text" class="form-control" v-model="sedeCamp">
                            </div>
                        </div>
                        <div class="form-row mt-3">
                            <div class="form-group col-12 col-md-12">
                                <label>Clave Institucional</label>
                                <input type="num" class="form-control" v-model="claveInst">
                            </div>
                        </div>
                        <div class="form-row mt-3">
                            <div class="form-group col-12 col-md-12">
                                <label>Host backend</label>
                                <input type="text" class="form-control" v-model="backEndHost">
                            </div>
                        </div>
                        <div class="form-row mt-3">
                            <div class="form-group col-12 col-md-12">
                                <label>Host backend</label>
                                <input type="text" class="form-control" v-model="backEndPort">
                            </div>
                        </div>
                        <div class="form-row mt-3">
                            <button class="btn btn-outline-primary" @click="saveSettings()">Salvar configuracion</button>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</template>
<script>
import * as alertify from 'alertify.js';
import Vuex from 'vuex'
export default {
    data(){
        return {
            claveInst:'',
            claveMexpharm:'',
            sedeCamp:'',
            backEndHost:'',
            backEndPort:'',
        }
    },
    methods: {
        ...Vuex.mapActions(['loadSettings','loadDataBase','checkCurrentId','checkCurrentId']),
        saveSettings(){
            this.$store.commit('setClaveInst',{claveInst:this.claveInst})
            this.$store.commit('setClaveMexpharm',{claveMexpharm:this.claveMexpharm})
            this.$store.commit('setSedeCamp',{sedeCamp:this.sedeCamp})
            this.$store.commit('setBackEndHost',{backEndHost:this.backEndHost})
            this.$store.commit('setBackEndPort',{backEndPort:this.backEndPort})
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('mexpharm_config',JSON.stringify(this.$store.state.config))
            }
            alertify.alert("La configuracion ha sido guardada en el almacenamiento local")
        }
    },
    computed: {
        ...Vuex.mapState(['config']),
    },
    mounted(){
        this.loadSettings()
        this.claveInst=this.$store.state.config.claveInst
        this.claveMexpharm=this.$store.state.config.claveMexpharm
        this.sedeCamp=this.$store.state.config.sedeCamp
        this.backEndHost=this.$store.state.config.backEndHost
        this.backEndPort=this.$store.state.config.backEndPort
    }
}
</script>