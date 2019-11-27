<template>
	<div>
		<h4>Tabla de datos</h4>
		<div class="table-responsive p-0">
			<Datatable/>
		</div>
	</div>
</template>
<script>
import Datatable from '../components/Datatable'
export default {
	components:{Datatable},
	name:"Data",
	data() {
		return {

		}
	},


}
</script>
