<template>
    <div>
        <h4>Exportar</h4>
        <p class="lead">Establece las propiedades del documento a exportar, o puedes dejar las propiedades por default</p>
        <form @submit="exportTo($event)">
            <label class="mt-2">Nombre del archivo excel</label>
            <input type="text" class="mt-1 form-control" v-model="fileName">
            <label class="mt-2">Título</label>
            <input type="text" class="mt-1 form-control" v-model="title">
            <label class="mt-2">Autor</label>
            <input type="text" class="mt-1 form-control" v-model="author">
            <label class="mt-2">Hoja</label>
            <input type="text" class="mt-1 form-control" v-model="sheet">
            <button type="submit" class="mt-2 btn btn-primary">Exportar</button>
        </form>
    </div>
</template>
<script>
import Vuex from 'vuex'
export default {
    name:"Export",
    data() {
        return {
            title:"Base de datos",
            author:"Mexpharm",
            sheet:"Registros",
            fileName:"BD",
        }
    },
    methods:{
        ...Vuex.mapActions(['exportToXls']),
        exportTo(event){
            event.preventDefault();
            let params={
                title:this.title,
                author:this.author,
                sheet:this.sheet,
                fileName:this.fileName
            }
            this.exportToXls({params})
        }
    }
}
</script>