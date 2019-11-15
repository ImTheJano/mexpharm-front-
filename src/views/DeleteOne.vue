<template>
    <form @submit="deleteOne($event)">
        <h2>Eliminar un registro</h2>
        <hr>
        <p>Ingresa el codigo verificador correspondiente al registro para poder eliminarlo</p>
        <div class="form-group col-12 col-md-12">
			<label>Codigo verificador</label>
			<div class="input-group">
				<input type="text" class="form-control" v-model="codigoVerificador" required>
				<div class="input-group-append">
					<button type="submit" class="btn btn-outline-secondary">Eliminar</button>
				</div>
			</div>
		</div>
    </form>
</template>
<script>
import Vuex from 'vuex'
export default {
    name:"DeleteOne",
    data() {
        return {
            codigoVerificador:""
        }
    },
    methods: {
        ...Vuex.mapActions(['deleteRow']),
        deleteOne(event){
            event.preventDefault();
            this.deleteRow(this.codigoVerificador)
        }
    },
}
</script>