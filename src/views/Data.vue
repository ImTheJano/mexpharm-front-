<template>
	<div>
		<h4>Tabla de datos</h4>
		<vueye-table 
			checkable 
			tableStyle="bordered" 
			:theme="theme3" 
			:per-page-values="[5,10,25,50]"
			title="TODOS"  
			:rows_data="todos" 
			v-on:checked-rows="getChecked"
			v-on:row-click="onrowclick"
		></vueye-table>
		<div class="table-responsive p-0">
			<table id="table" class=" table table-bordered table-sm table-hover">
				<thead>
					<tr>
						<th v-for="(col, i) in cols" :key="i">{{col}}</th>
					</tr>
				</thead>
				<tbody>
					<tr scope="row" v-for="row in rows" :key="row.claveInst" data-toggle="tooltip" data-placement="top" :title="row.nombre+', clave: '+row.claveInst">
						<td>{{row.claveMexpharm}}</td>
						<td>{{row.claveInst}}</td>
						<td>{{row.codigoVerificador}}</td>
						<td>{{row.anyo}}</td>
						<td>{{row.mes}}</td>
						<td>{{row.dia}}</td>
						<td>{{row.medicoResponsable}}</td>
						<td>{{row.medicoTratante}}</td>
						<td>{{row.nombre}}</td>
						<td>{{row.sexo}}</td>
						<td>{{row.edad}}</td>
						<td>{{row.rEdad}}</td>
						<td>{{row.edoCivil}}</td>
						<td>{{row.otroEdoCivil}}</td>
						<td>{{row.viveCon}}</td>
						<td>{{row.otroViveCon}}</td>
						<td>{{row.viveCuantos}}</td>
						<td>{{row.viviendaEs}}</td>
						<td>{{row.ingresoMensual}}</td>
						<td>{{row.nPersonasAportan}}</td>
						<td>{{row.localidad}}</td>
						<td>{{row.claveMunicipio}}</td>
						<td>{{row.municipio}}</td>
						<td>{{row.claveEFederativa}}</td>
						<td>{{row.eFederativa}}</td>
						<td>{{row.lugarNacimiento}}</td>
						<td>{{row.ocupacion}}</td>
						<td>{{row.actRemunerada}}</td>
						<td>{{row.actRemuneradaCual}}</td>
						<td>{{row.clacificacionOjo}}</td>
						<td>{{row.intervencionOjoD}}</td>
						<td>{{row.intervencionOjoI}}</td>
						<td>{{row.procedimiento}}</td>
						<td>{{row.observaciones}}</td>
						<td>{{row.complicacione}}</td>
						<td>{{row.sedeCamp}}</td>
						<td>{{row.insumos}}</td>
						<td>{{row.folioConsignia}}</td>
						<td>{{row.actAntesDeCirugia}}</td>
						<td>{{row.nActAntesDeCirugia}}</td>
						<td>{{row.oActAntesDeCirugia}}</td>
						<td>{{row.actDespuesDeCirugia}}</td>
						<td>{{row.nActDespuesDeCirugia}}</td>
						<td>{{row.oActDespuesDeCirugia}}</td>
						<td>{{row.telefono}}</td>
						<td>{{row.satisfaccion}}</td>
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
import VueyeTable from "vueye-datatable";
export default {
	components:{editForm,VueyeTable},
	name:"Data",
	data() {
		return {
			todos: [],
			theme3: {
				backgroundColor: "#141443",
				color: "#eee",
				rows:{
					borderBottom: "1px solid #eee"
				},
				rowClick: {
					backgroundColor: "#0D0B2F"
				}
			},
			rows:[],
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
		this.loadData()
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

	methods:{
		...Vuex.mapActions(['loadSettings','checkCurrentId','findRow']),
		async loadData(){
			let res=await this.findRow({})
			this.rows=res.data
			
		},
		getChecked(rows){
			console.log(rows);	
		},
		onrowclick(row){
			console.log(row);
			
		}
	},
}
</script>