<template>
	<div class="container">
		<label>buscar</label>
		<input type="text" class="form-control" v-model="filterKey">
		<table class="table">
			<thead>
				<tr>
					<th>Eliminar</th>
					<th>Edtar</th>
					<th v-for="col in cols" :key="col">{{col}}</th>
				</tr>
			</thead>
			<tbody>
				<tr  v-for="(row) in filteredRows" :key="row._id">
					<td><button class="btn btn-sm btn-outline-danger"><delete-icon title="Edtar" /></button></td>
					<td><button class="btn btn-sm btn-outline-info"><pencil-icon title="Eliminar" /></button></td>
					<td class="text-info">{{row.claveMexpharm}}</td>
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
			<tfoot>

			</tfoot>
		</table>
	</div>
</template>
<script>
import Vuex from 'vuex'
export default {
    name:"Datatable",
    data(){
        return{
			filterKey:"",
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
	computed:{
		filteredRows(){
			if(this.filterKey=="")return this.rows
			else{
				let _filteredRows=[]
				for(let i=0;i<this.rows.length;i++){
					let row=this.rows[i]
					let found=false
					if(!found&&row.claveMexpharm){if(row.claveMexpharm.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.claveInst){if(row.claveInst.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.codigoVerificador){if(row.codigoVerificador.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.anyo){if(row.anyo.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.mes){if(row.mes.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.dia){if(row.dia.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.medicoResponsable){if(row.medicoResponsable.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.medicoTratante){if(row.medicoTratante.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.nombre){if(row.nombre.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.sexo){if(row.sexo.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.edad){if(row.edad.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.rEdad){if(row.rEdad.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.edoCivil){if(row.edoCivil.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.otroEdoCivil){if(row.otroEdoCivil.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.viveCon){if(row.viveCon.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.otroViveCon){if(row.otroViveCon.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.viveCuantos){if(row.viveCuantos.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.viviendaEs){if(row.viviendaEs.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.ingresoMensual){if(row.ingresoMensual.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.nPersonasAportan){if(row.nPersonasAportan.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.localidad){if(row.localidad.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.claveMunicipio){if(row.claveMunicipio.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.municipio){if(row.municipio.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.claveEFederativa){if(row.claveEFederativa.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.eFederativa){if(row.eFederativa.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.lugarNacimiento){if(row.lugarNacimiento.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.ocupacion){if(row.ocupacion.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.actRemunerada){if(row.actRemunerada.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.actRemuneradaCual){if(row.actRemuneradaCual.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.clacificacionOjo){if(row.clacificacionOjo.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.intervencionOjoD){if(row.intervencionOjoD.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.intervencionOjoI){if(row.intervencionOjoI.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.procedimiento){if(row.procedimiento.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.observaciones){if(row.observaciones.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.complicacione){if(row.complicacione.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.sedeCamp){if(row.sedeCamp.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.insumos){if(row.insumos.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.folioConsignia){if(row.folioConsignia.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.actAntesDeCirugia){if(row.actAntesDeCirugia.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.nActAntesDeCirugia){if(row.nActAntesDeCirugia.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.oActAntesDeCirugia){if(row.oActAntesDeCirugia.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.actDespuesDeCirugia){if(row.actDespuesDeCirugia.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.nActDespuesDeCirugia){if(row.nActDespuesDeCirugia.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.oActDespuesDeCirugia){if(row.oActDespuesDeCirugia.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.telefono){if(row.telefono.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
					if(!found&&row.satisfaccion){if(row.satisfaccion.toLowerCase().indexOf(this.filterKey.toLowerCase())>-1){_filteredRows.push(row); found=true;}}
				}
				return _filteredRows
			}
		}
	},
    methods:{
		...Vuex.mapActions(['loadSettings','checkCurrentId','findRow']),
        async loadData(){
            let res=await this.findRow({})
            let _rows=[]
            res.data.forEach(row => {
                let newRow={}
                newRow['claveMexpharm']=( row.claveMexpharm)?row.claveMexpharm:""
                newRow['claveInst']=( row.claveInst)?row.claveInst:""
                newRow['codigoVerificador']=( row.codigoVerificador)?row.codigoVerificador:""
                newRow['anyo']=( row.anyo)?row.anyo:""
                newRow['mes']=( row.mes)?row.mes:""
                newRow['dia']=( row.dia)?row.dia:""
                newRow['medicoResponsable']=( row.medicoResponsable)?row.medicoResponsable:""
                newRow['medicoTratante']=( row.medicoTratante)?row.medicoTratante:""
                newRow['nombre']=( row.nombre)?row.nombre:""
                newRow['sexo']=( row.sexo)?row.sexo:""
                newRow['edad']=( row.edad)?row.edad:""
                newRow['rEdad']=( row.rEdad)?row.rEdad:""
                newRow['edoCivil']=( row.edoCivil)?row.edoCivil:""
                newRow['otroEdoCivil']=( row.otroEdoCivil)?row.otroEdoCivil:""
                newRow['viveCon']=( row.viveCon)?row.viveCon:""
                newRow['otroViveCon']=( row.otroViveCon)?row.otroViveCon:""
                newRow['viveCuantos']=( row.viveCuantos)?row.viveCuantos:""
                newRow['viviendaEs']=( row.viviendaEs)?row.viviendaEs:""
                newRow['ingresoMensual']=( row.ingresoMensual)?row.ingresoMensual:""
                newRow['nPersonasAportan']=( row.nPersonasAportan)?row.nPersonasAportan:""
                newRow['localidad']=( row.localidad)?row.localidad:""
                newRow['claveMunicipio']=( row.claveMunicipio)?row.claveMunicipio:""
                newRow['municipio']=( row.municipio)?row.municipio:""
                newRow['claveEFederativa']=( row.claveEFederativa)?row.claveEFederativa:""
                newRow['eFederativa']=( row.eFederativa)?row.eFederativa:""
                newRow['lugarNacimiento']=( row.lugarNacimiento)?row.lugarNacimiento:""
                newRow['ocupacion']=( row.ocupacion)?row.ocupacion:""
                newRow['actRemunerada']=( row.actRemunerada)?row.actRemunerada:""
                newRow['actRemuneradaCual']=( row.actRemuneradaCual)?row.actRemuneradaCual:""
                newRow['clacificacionOjo']=( row.clacificacionOjo)?row.clacificacionOjo:""
                newRow['intervencionOjoD']=( row.intervencionOjoD)?row.intervencionOjoD:""
                newRow['intervencionOjoI']=( row.intervencionOjoI)?row.intervencionOjoI:""
                newRow['procedimiento']=( row.procedimiento)?row.procedimiento:""
                newRow['observaciones']=( row.observaciones)?row.observaciones:""
                newRow['complicacione']=( row.complicacione)?row.complicacione:""
                newRow['sedeCamp']=( row.sedeCamp)?row.sedeCamp:""
                newRow['insumos']=( row.insumos)?row.insumos:""
                newRow['folioConsignia']=( row.folioConsignia)?row.folioConsignia:""
                newRow['actAntesDeCirugia']=( row.actAntesDeCirugia)?row.actAntesDeCirugia:""
                newRow['nActAntesDeCirugia']=( row.nActAntesDeCirugia)?row.nActAntesDeCirugia:""
                newRow['oActAntesDeCirugia']=( row.oActAntesDeCirugia)?row.oActAntesDeCirugia:""
                newRow['actDespuesDeCirugia']=( row.actDespuesDeCirugia)?row.actDespuesDeCirugia:""
                newRow['nActDespuesDeCirugia']=( row.nActDespuesDeCirugia)?row.nActDespuesDeCirugia:""
                newRow['oActDespuesDeCirugia']=( row.oActDespuesDeCirugia)?row.oActDespuesDeCirugia:""
                newRow['telefono']=( row.telefono)?row.telefono:""
                newRow['satisfaccion']=( row.satisfaccion)?row.satisfaccion:""
                _rows.push(newRow)
            });
            this.rows=_rows
        }
    },
    mounted(){
        this.loadData()
    }
}
</script>