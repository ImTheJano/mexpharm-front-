<template>
	<div>
		<h4>Tabla de datos</h4>
		<div class="table-responsive p-0">
			<Datatable/>
		</div>
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal1">
			Editar un registro
		</button>
		<div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="container-fluid">
							<editForm/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import editForm from '../components/EditForm'
import Datatable from '../components/Datatable'
export default {
	components:{editForm,Datatable},
	name:"Data",
	data() {
		return {

		}
	},


}
</script>
