<template>
	<div>
		<h4>Tabla de datos</h4>
		<div class="table-responsive p-0">
			<table id="table" class=" table table-bordered table-sm table-hover">
				<thead>
					<tr>
						<th v-for="(col, i) in cols" :key="i">{{col}}</th>
					</tr>
				</thead>
				<tbody>
					<tr scope="row" v-for="row in db.rows" :key="row.claveInst" data-toggle="tooltip" data-placement="top" :title="row.nombre+', clave: '+row.claveInst">
						<td scope="col" v-for="(val,i) in row" :key="i">{{val}}</td>
					</tr>
				</tbody>
			</table>
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
import '../assets/css/bootstrap.css'
import $jQuery from 'jquery'
import Vuex from 'vuex'
import 'datatables.net'
import '../assets/css/dataTables.bootstrap4.min.css'
//import '../assets/js/dataTables.bootstrap4.min.js'
export default {
	components:{editForm},
	name:"Data",
	data() {
		return {
			cols:[
				"Clave Mexpharm",
				"Clave inst",
				"Código verificador",
				"Año",
				"Mes",
				"Día",
				"Médico responsable",
				"Médico tratante",
				"Nombre",
				"Sexo",
				"Edad",
				"rEdad",
				"Estado civil",
				"Otro estado civil",
				"Con quien vive",
				"Otro con quien vive",
				"Con cuantas personas vive",
				"Su vivienda es",
				"Ingreso mensual familiar",
				"Cuantas personas aportan al IM",
				"Localidad",
				"Clave municipio",
				"Municipio",
				"Clave entidad federativa",
				"Entidad federativa",
				"Lugar de nacimiento",
				"Ocupación",
				"Realiza alguna actividad remunerada",
				"Cuál",
				"Clacificación ojo",
				"Intervención ojo D",
				"Intervención ojo I",
				"Procedimiento",
				"Observaciones",
				"Complicacione",
				"Sede Campaña",
				"Insumos",
				"Fólio consignia",
				"Actividades que no podía realizar ántes",
				"Número de actividades que no podía realizar ántes",
				"Otro actividades que no podía realizar ántes",
				"Actividades que puede realizar después",
				"Número de actividades que puede realizar después",
				"Otro actividades puede realizar después",
				"teléfono",
				"Satisfacción",
			]
		}
	},
	mounted() {
		$jQuery('#table').DataTable({
			"scrollY":"200px",
			"scrollX": true,
			"scrollCollapse":true,
			"paging":true,
			"language": {
				"lengthMenu": "Mostrar _MENU_ registros por página",
				"zeroRecords": "No hay registros",
				"info": "Página _PAGE_ de _PAGES_, _MAX_ registros totales",
				"infoEmpty": "No hay registros disponibles",
				"infoFiltered": "(filtrado del _MAX_ total de registros)",
				"search":"Buscar"
			}
		});
	},
	computed: {
		...Vuex.mapState(['db']),
	},
	methods:{
		...Vuex.mapActions(['loadSettings','loadDataBase','checkCurrentId','checkCurrentId'])
	}
}
</script>