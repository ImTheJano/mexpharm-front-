<template>
	<div class="container">
		<h3>Edición de registro</h3>
        <p class="lead">Para editar un registro debes buscar la clave institucional y presionar el boton editar</p>
		<form @submit="save($event)">
			<div class="form-row">
				<div class="form-group col-12 col-md-12">
					<label>Clave institucional</label>
					<div class="input-group">
                        <select @change="find()" class="form-control" v-model="cols.claveInst">
                            <option value="0" selected>Seleccionar</option>
                            <option v-for="row in db.rows" :key="row.claveInst" :value="row.claveInst">{{row.claveInst}}</option>
                        </select>
                        <div class="input-group-append">
							<button @click="find()" class="btn btn-outline-secondary" type="button">Editar</button>
						</div>
					</div>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-12">
					<label>Fecha (AAAA/MM/DD)</label>
                    <div class="row">
                        <input type="number" class="form-control col-4" placeholder="Año" v-model="cols.anyo" required>
                        <input type="number" class="form-control col-3" placeholder="Mes" v-model="cols.mes" required>
                        <input type="number" class="form-control col-3" placeholder="Día" v-model="cols.dia" required>
                    </div>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Clave Mexpharm</label>
					<input type="text" class="form-control" v-model="cols.claveMexpharm" required>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Sede de campaña</label>
					<input type="text" class="form-control" v-model="cols.sedeCamp" required>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Codigo verificador</label>
					<input type="text" class="form-control" v-model="cols.codigoVerificador" required>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Medico tratante</label>
					<input type="text" class="form-control" v-model="cols.medicoTratante">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Medico responsable</label>
					<input type="text" class="form-control" v-model="cols.medicoResponsable">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label class="mx-3">Ojo intervenido</label>
					<div class="input-group">
						<div class="custom-control custom-radio mx-auto">
							<input v-model="cols.clacificacionOjo" type="radio" id="radio-ojo1" value="1" name="radio-ojo" class="custom-control-input" checked>
							<label class="custom-control-label" for="radio-ojo1">Derecho</label>
						</div>
						<div class="custom-control custom-radio mx-auto">
							<input v-model="cols.clacificacionOjo" type="radio" id="radio-ojo2" value="2" name="radio-ojo" class="custom-control-input">
							<label class="custom-control-label" for="radio-ojo2">Izquierdo</label>
						</div>
						<div class="custom-control custom-radio mx-auto">
							<input v-model="cols.clacificacionOjo" type="radio" id="radio-ojo3" value="3" name="radio-ojo" class="custom-control-input">
							<label class="custom-control-label" for="radio-ojo3">Ambos</label>
						</div>
					</div>
				</div>
			</div>
			<hr>
			<h4>Datos del paciente</h4>
			<div class="form-row">
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Nombre</label>
					<input type="text" class="form-control" v-model="cols.nombre" required>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Telefono</label>
					<input type="text" class="form-control" v-model="cols.telefono">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Edad</label>
					<input type="text" class="form-control" v-model="cols.edad">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Sexo</label>
					<div class="input-group">
						<div class="custom-control custom-radio mx-auto">
							<input type="radio" id="radio-sexo1" value="1" v-model="cols.sexo" name="radio-sexo" class="custom-control-input" checked>
							<label class="custom-control-label" for="radio-sexo1">Masculino</label>
						</div>
						<div class="custom-control custom-radio mx-auto">
							<input type="radio" id="radio-sexo2" value="2" v-model="cols.sexo" name="radio-sexo" class="custom-control-input">
							<label class="custom-control-label" for="radio-sexo2">Femenino</label>
						</div>
					</div>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Estado civil</label>
					<select class="form-control" v-model="cols.edoCivil">
						<option value="0" selected>Seleccionar</option>
						<option value="1">Casado</option>
						<option value="2">Soltero</option>
						<option value="3">Separado</option>
						<option value="4">Concubinato</option>
						<option value="5">Viudo</option>
						<option value="6">Otro</option>
					</select>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Estado</label>
					<select @change="selectEntidad()" class="form-control" v-model="combos.entidad">
						<option value="-1" selected>Seleccionar</option>
						<option v-for="(entidad, i) in combos.entidades"
							:key="i"
							:value="i">
							{{entidad.estado}}:{{entidad.clave}}
						</option>
					</select>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Municipio</label>
					<select @change="selectMunicipio()" class="form-control" v-model="combos.municipio">
						<option value="-1" selected>Seleccionar</option>
						<option v-for="(municipio, j) in combos.municipios"
							:key="j"
							:value="j">
							{{municipio.municipio}}:{{municipio.clave}}
						</option>
					</select>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Localidad</label>
					<input type="text" class="form-control" v-model="cols.localidad">
				</div>
			</div>
			<hr>
			<h4>Datos socioeconomicos</h4>
			<div class="form-row">
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Con cuantas personas comparte vivienda</label>
					<input type="number" class="form-control" v-model="cols.viveCuantos">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Su vivienda es...</label>
					<select class="form-control" v-model="cols.viviendaEs">
						<option value="0" selected>Seleccionar</option>
						<option value="1">Propia</option>
						<option value="2">Rentada</option>
						<option value="3">Prestada</option>
						<option value="4">Otro</option>
					</select>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Ingreso familiar aproximado mensual</label>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">$</span>
						</div>
						<input type="number" class="form-control" v-model="cols.ingresoMensual">
					</div>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Cuantas personas aportan al ingreso familiar</label>
					<input type="number" class="form-control" v-model="cols.nPersonasAportan">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Cuanto gasta al mes en alimentación</label>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">$</span>
						</div>
						<input type="number" class="form-control">
					</div>
				</div>
			</div>
			<hr>
			<h4>Previo a la operación</h4>
			<div class="form-row">
				<div class="form-group col-12 col-md-6 col-lg-6">
					<label>Ha tenido algun accidente debido a su mala visión</label>
					<div class="input-group">
						<div class="custom-control custom-radio mx-auto">
							<input type="radio" id="radio-accidente1" name="radio-accidente" class="custom-control-input">
							<label class="custom-control-label" for="radio-accidente1">Si</label>
						</div>
						<div class="custom-control custom-radio mx-auto">
							<input type="radio" id="radio-accidente3" name="radio-accidente" class="custom-control-input">
							<label class="custom-control-label" for="radio-accidente3">No</label>
						</div>
					</div>
				</div>
				<div class="form-group col-12 col-md-12 col-lg-12">
					<label>Que actividades no puede realizar debido a su vision deficiente</label>
					<div class="input-group">
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Actividades limitadas en el hogar" type="checkbox" class="custom-control-input" id="check-noActividades-1">
							<label class="custom-control-label" for="check-noActividades-1">Actividades limitadas en el hogar</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Limitacion den las actividades laborales" type="checkbox" class="custom-control-input" id="check-noActividades-2">
							<label class="custom-control-label" for="check-noActividades-2">Limitacion den las actividades laborales</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Caminar" type="checkbox" class="custom-control-input" id="check-noActividades-3">
							<label class="custom-control-label" for="check-noActividades-3">Caminar</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Manejar algun tipo de vehículo" type="checkbox" class="custom-control-input" id="check-noActividades-4">
							<label class="custom-control-label" for="check-noActividades-4">Manejar algun tipo de vehículo</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Leer" type="checkbox" class="custom-control-input" id="check-noActividades-5">
							<label class="custom-control-label" for="check-noActividades-5">Leer</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Bordar o coser" type="checkbox" class="custom-control-input" id="check-noActividades-6">
							<label class="custom-control-label" for="check-noActividades-6">Bordar o coser</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Usar instrumentos punzocortantes" type="checkbox" class="custom-control-input" id="check-noActividades-7">
							<label class="custom-control-label" for="check-noActividades-7">Usar instrumentos punzocortantes</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Hacer comida" type="checkbox" class="custom-control-input" id="check-noActividades-8">
							<label class="custom-control-label" for="check-noActividades-8">Hacer comida</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Moverse por su cuenta" type="checkbox" class="custom-control-input" id="check-noActividades-9">
							<label class="custom-control-label" for="check-noActividades-9">Moverse por su cuenta</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Salir a la calle" type="checkbox" class="custom-control-input" id="check-noActividades-10">
							<label class="custom-control-label" for="check-noActividades-10">Salir a la calle</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Trabajar para colaborar en el gasto" type="checkbox" class="custom-control-input" id="check-noActividades-11">
							<label class="custom-control-label" for="check-noActividades-11">Trabajar para colaborar en el gasto</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkNoAct" value="Otro" type="checkbox" class="custom-control-input" id="check-noActividades-12">
							<label class="custom-control-label" for="check-noActividades-12">Otro</label>
						</div>
					</div>
				</div>
			</div>
			<hr>
			<h4>Despues de la operación</h4>
			<div class="form-row mt-5">
				<div class="form-group col-12 col-md-12 col-lg-12">
					<label>Que actividades retomo despues de la cirugia</label>
					<div class="input-group">
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Actividades en el hogar" type="checkbox" class="custom-control-input" id="check-actividades-1">
							<label class="custom-control-label" for="check-actividades-1">Actividades en el hogar</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Limitacion den las actividades laborales" type="checkbox" class="custom-control-input" id="check-actividades-2">
							<label class="custom-control-label" for="check-actividades-2">Limitacion den las actividades laborales</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Caminar" type="checkbox" class="custom-control-input" id="check-actividades-3">
							<label class="custom-control-label" for="check-actividades-3">Caminar</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Manejar algun tipo de vehículo" type="checkbox" class="custom-control-input" id="check-actividades-4">
							<label class="custom-control-label" for="check-actividades-4">Manejar algun tipo de vehículo</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Leer" type="checkbox" class="custom-control-input" id="check-actividades-5">
							<label class="custom-control-label" for="check-actividades-5">Leer</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Bordar o coser" type="checkbox" class="custom-control-input" id="check-actividades-6">
							<label class="custom-control-label" for="check-actividades-6">Bordar o coser</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Usar instrumentos punzocortantes" type="checkbox" class="custom-control-input" id="check-actividades-7">
							<label class="custom-control-label" for="check-actividades-7">Usar instrumentos punzocortantes</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Hacer comida" type="checkbox" class="custom-control-input" id="check-actividades-8">
							<label class="custom-control-label" for="check-actividades-8">Hacer comida</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Moverse por su cuenta" type="checkbox" class="custom-control-input" id="check-actividades-9">
							<label class="custom-control-label" for="check-actividades-9">Moverse por su cuenta</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Salir a la calle" type="checkbox" class="custom-control-input" id="check-actividades-10">
							<label class="custom-control-label" for="check-actividades-10">Salir a la calle</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Trabajar para colaborar en el gasto" type="checkbox" class="custom-control-input" id="check-actividades-11">
							<label class="custom-control-label" for="check-actividades-11">Trabajar para colaborar en el gasto</label>
						</div>
						<div class="custom-control custom-checkbox mx-2 my-2">
							<input v-model="combos.checkAct" value="Otro" type="checkbox" class="custom-control-input" id="check-actividades-12">
							<label class="custom-control-label" for="check-actividades-12">Otro</label>
						</div>
					</div>
				</div>
			</div>
			<hr>
			<h4>Evaluacon</h4>
			<div class="form-row mt-4">
				<div class="form-group col-12 col-md-12 col-lg-12">
					<label>Como calificarias el resultado de la cirugia</label>
					<div class="input-group">
						<div class="custom-control custom-radio mx-auto">
							<input v-model="cols.satisfaccion" value="1" type="radio" id="radio-rating1" name="radio-rating" class="custom-control-input">
							<label class="custom-control-label" for="radio-rating1">1</label>
						</div>
						<div class="custom-control custom-radio mx-auto">
							<input v-model="cols.satisfaccion" value="2" type="radio" id="radio-rating2" name="radio-rating" class="custom-control-input">
							<label class="custom-control-label" for="radio-rating2">2</label>
						</div>
						<div class="custom-control custom-radio mx-auto">
							<input v-model="cols.satisfaccion" value="3" type="radio" id="radio-rating3" name="radio-rating" class="custom-control-input">
							<label class="custom-control-label" for="radio-rating3">3</label>
						</div>
						<div class="custom-control custom-radio mx-auto">
							<input v-model="cols.satisfaccion" value="4" type="radio" id="radio-rating4" name="radio-rating" class="custom-control-input">
							<label class="custom-control-label" for="radio-rating4">4</label>
						</div>
						<div class="custom-control custom-radio mx-auto">
							<input v-model="cols.satisfaccion" value="5" type="radio" id="radio-rating5" name="radio-rating" class="custom-control-input">
							<label class="custom-control-label" for="radio-rating5">5</label>
						</div>
					</div>
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-12 col-md-12 col-lg-12">
					<button type="submit" class="btn btn-primary">Guardar</button>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
import {dataSet} from '../extra/EntidadesINEGI'
import Vuex from 'vuex'
import * as alertify from 'alertify.js';
import $jQuery from 'jquery'
function findIndexInObjArr(arr,key,val){
    let i=0
    for(i=0;i<arr.length;i++){
        if(arr[i][key]==val)return i
    }
    return -1
}
export default {
    name:'Register-form',
    props:['claveInst'],
	data(){
		return {
			cols:{
                claveMexpharm:"",
				claveInst:"0",
				anyo:"",
				mes:"",
				dia:"",
				codigoVerificador:"",
				medicoResponsable:"",
				medicoTratante:"",
				date:"",
				nombre:"",
				sexo:"",
				edad:"",
				rEdad:"",
				edoCivil:"",
				otroEdoCivil:"",
				viveCon:"",
				otroViveCon:"",
				viveCuantos:"",
				viviendaEs:"",
				ingresoMensual:"",
				nPersonasAportan:"",
				localidad:"",
				claveMunicipio:"",
				municipio:"",
				claveEFederativa:"",
				eFederativa:"",
				lugarNacimiento:"",
				ocupacion:"",
				actRemunerada:"",
				actRemuneradaCual:"",
				clacificacionOjo:"",
				intervencionOjoD:"",
				intervencionOjoI:"",
				procedimiento:"",
				observaciones:"",
				complicacione:"",
				insumos:"",
				folioConsignia:"",
				actAntesDeCirugia:"",
				nActAntesDeCirugia:"",
				oActAntesDeCirugia:"",
				actDespuesDeCirugia:"",
				nActDespuesDeCirugia:"",
				oActDespuesDeCirugia:"",
				telefono:"",
				satisfaccion:"",
			},
			combos:{
				entidades:[],
				municipios:[],
				entidad:-1,
				municipio:-1,
				checkNoAct:[],
				checkAct:[]
			}
		}
	},
	computed: {
        ...Vuex.mapState(['config','db']),
	},
	methods:{
        ...Vuex.mapActions(['updateRow']),
		save(event){
            event.preventDefault();
			let row = {
				claveMexpharm:this.cols.claveMexpharm,
				claveInst:this.cols.claveInst,
				codigoVerificador:this.cols.codigoVerificador,
				anyo:this.cols.anyo,
				mes:this.cols.mes,
				dia:this.cols.dia,
				medicoResponsable:this.cols.medicoResponsable,
				medicoTratante:this.cols.medicoTratante,
				nombre:this.cols.nombre,
				sexo:this.cols.sexo,
				edad:this.cols.edad,
				rEdad:this.cols.rEdad,
				edoCivil:this.cols.edoCivil,
				otroEdoCivil:this.cols.otroEdoCivil,
				viveCon:this.cols.viveCon,
				otroViveCon:this.cols.otroViveCon,
				viveCuantos:this.cols.viveCuantos,
				viviendaEs:this.cols.viviendaEs,
				ingresoMensual:this.cols.ingresoMensual,
				nPersonasAportan:this.cols.nPersonasAportan,
				localidad:this.cols.localidad,
				claveEFederativa:this.combos.entidades[this.cols.claveEFederativa],
				eFederativa:this.cols.eFederativa,
				claveMunicipio:this.cols.claveMunicipio,
				municipio:this.cols.municipio,
				lugarNacimiento:this.cols.lugarNacimiento,
				ocupacion:this.cols.ocupacion,
				actRemunerada:this.cols.actRemunerada,
				actRemuneradaCual:this.cols.actRemuneradaCual,
				clacificacionOjo:this.cols.clacificacionOjo,
				intervencionOjoD:this.cols.intervencionOjoD,
				intervencionOjoI:this.cols.intervencionOjoI,
				procedimiento:this.cols.procedimiento,
				observaciones:this.cols.observaciones,
				complicacione:this.cols.complicacione,
				sedeCamp:this.config.sedeCamp,
				insumos:this.cols.insumos,
				folioConsignia:this.cols.folioConsignia,
				actAntesDeCirugia:this.combos.checkNoAct.join(','),
				nActAntesDeCirugia:this.combos.checkNoAct.length,
				oActAntesDeCirugia:this.cols.oActAntesDeCirugia,
				actDespuesDeCirugia:this.combos.checkAct.join(','),
				nActDespuesDeCirugia:this.combos.checkAct.length,
				oActDespuesDeCirugia:this.cols.oActDespuesDeCirugia,
				telefono:this.cols.telefono,
				satisfaccion:this.cols.satisfaccion,
            }
            $jQuery('#modal1').modal('hide')
			this.updateRow({row})
		},
        find(){
            let claveInst=this.cols.claveInst
            if(this.db.rows[claveInst]){
                let editRow=this.db.rows[claveInst]
                this.cols.claveMexpharm=editRow.claveMexpharm
				this.cols.claveInst=editRow.claveInst
				this.cols.codigoVerificador=editRow.codigoVerificador
				this.cols.anyo=editRow.anyo
				this.cols.mes=editRow.mes
				this.cols.dia=editRow.dia
				this.cols.codigoVerificador=editRow.codigoVerificador
				this.cols.medicoResponsable=editRow.medicoResponsable
				this.cols.medicoTratante=editRow.medicoTratante
				this.cols.date=editRow.date
				this.cols.nombre=editRow.nombre
				this.cols.sexo=editRow.sexo
				this.cols.edad=editRow.edad
				this.cols.rEdad=editRow.rEdad
				this.cols.edoCivil=editRow.edoCivil
				this.cols.otroEdoCivil=editRow.otroEdoCivil
				this.cols.viveCon=editRow.viveCon
				this.cols.otroViveCon=editRow.otroViveCon
				this.cols.viveCuantos=editRow.viveCuantos
				this.cols.viviendaEs=editRow.viviendaEs
				this.cols.ingresoMensual=editRow.ingresoMensual
				this.cols.nPersonasAportan=editRow.nPersonasAportan
				this.cols.localidad=editRow.localidad
                this.combos.entidad=findIndexInObjArr(this.combos.entidades,'estado',editRow.eFederativa)
                this.selectEntidad()
                this.combos.municipio=findIndexInObjArr(this.combos.municipios,'municipio',editRow.municipio)
                this.selectMunicipio()
				this.cols.claveMunicipio=editRow.claveMunicipio
				this.cols.lugarNacimiento=editRow.lugarNacimiento
				this.cols.ocupacion=editRow.ocupacion
				this.cols.actRemunerada=editRow.actRemunerada
				this.cols.actRemuneradaCual=editRow.actRemuneradaCual
				this.cols.clacificacionOjo=editRow.clacificacionOjo
				this.cols.intervencionOjoD=editRow.intervencionOjoD
				this.cols.intervencionOjoI=editRow.intervencionOjoI
				this.cols.procedimiento=editRow.procedimiento
				this.cols.observaciones=editRow.observaciones
				this.cols.complicacione=editRow.complicacione
				this.cols.insumos=editRow.insumos
				this.cols.folioConsignia=editRow.folioConsignia
				this.combos.checkNoAct=editRow.actAntesDeCirugia.split(',')
				this.cols.nActAntesDeCirugia=editRow.nActAntesDeCirugia
				this.cols.oActAntesDeCirugia=editRow.oActAntesDeCirugia
				this.combos.checkAct=editRow.actDespuesDeCirugia.split(',')
				this.cols.nActDespuesDeCirugia=editRow.nActDespuesDeCirugia
				this.cols.oActDespuesDeCirugia=editRow.oActDespuesDeCirugia
				this.cols.telefono=editRow.telefono
				this.cols.satisfaccion=editRow.satisfaccion
            }else{
                alertify.alert('No se encontro ningun regstro con la clave dada')
            }
        },
		selectEntidad(){
            if(this.combos.entidad!=""||this.combos.entidad!=-1){
                this.combos.municipios=dataSet[this.combos.entidad].municipios
                this.cols.claveEFederativa=dataSet[this.combos.entidad].clave
                this.cols.eFederativa=dataSet[this.combos.entidad].estado
            }
		},
		selectMunicipio(){
            if(this.combos.municipio!=""||this.combos.municipio!=-1){
                this.cols.claveMunicipio=dataSet[this.combos.entidad].municipios[this.combos.municipio].clave
                this.cols.municipio=dataSet[this.combos.entidad].municipios[this.combos.municipio].municipio
            }
		},
	},
	mounted() {
		this.combos.entidades=dataSet
	},
}
</script>