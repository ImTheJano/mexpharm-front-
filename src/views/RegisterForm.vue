<template>
	<div class="container">
		<h2> Ficha de registro</h2>
		<form @submit="save($event)">
			<div class="form-row">
				<div class="form-group col-12 col-md-3">
					<label>Clave institucional</label>
					<div class="input-group">
						<input type="text" class="form-control" disabled :value="$store.state.config.claveInst" required>
						<div class="input-group-append">
							<router-link to="settings" class="btn btn-outline-secondary">Editar</router-link>
						</div>
					</div>
				</div>
				<div class="form-group col-6 col-md-3 col-lg-3">
					<label>Fecha</label>
					<input type="text" class="form-control" disabled :value="cols.date" required>
				</div>
				<div class="form-group col-6 col-md-3 col-lg-3">
					<label>Clave Mexpharm</label>
					<input type="text" class="form-control" disabled :value="$store.state.config.claveMexpharm" required>
				</div>
				<div class="form-group col-6 col-md-3 col-lg-3">
					<label>Sede de campaña</label>
					<input type="text" class="form-control" disabled :value="$store.state.config.sedeCamp" required>
				</div>
				<div class="form-group col-6 col-md-3 col-lg-3">
					<label>Código verificador</label>
					<input type="text" class="form-control" v-model="cols.codigoVerificador" required>
				</div>
				<div class="form-group col-6 col-md-3 col-lg-3">
					<label>Médico tratante</label>
					<input type="text" class="form-control" v-model="cols.medicoTratante">
				</div>
				<div class="form-group col-6 col-md-3 col-lg-3">
					<label>Médico responsable</label>
					<input type="text" class="form-control" v-model="cols.medicoResponsable">
				</div>
			</div>
			<hr>
			<h4>Datos del paciente</h4>
			<div class="form-row">
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>Nombre</label>
					<input type="text" class="form-control" v-model="cols.nombre" required>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>Teléfono</label>
					<input type="text" class="form-control" v-model="cols.telefono">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>Edad</label>
					<input type="text" class="form-control" v-model="cols.edad">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
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
				<div class="form-group col-12 col-md-6 col-lg-4">
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
					<div v-if="oEdoCivil">
						<label>Especifica</label>
						<input type="text" class="form-control" v-model="cols.otroEdoCivil">
					</div>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
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
				<div class="form-group col-12 col-md-6 col-lg-4">
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
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>Localidad</label>
					<input type="text" class="form-control" v-model="cols.localidad">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>Lugar de nacimiento</label>
					<input type="text" class="form-control" v-model="cols.lugarNacimiento">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>Ocupación</label>
					<input type="text" class="form-control" v-model="cols.ocupacion">
				</div>
			</div>
			<hr>
			<h4>Datos socioeconomicos</h4>
			<div class="form-row">
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>¿Con cuantas personas comparte vivienda?</label>
					<input type="number" class="form-control" v-model="cols.viveCuantos">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>Su vivienda es...</label>
					<select class="form-control" v-model="cols.viviendaEs">
						<option value="0" selected>Seleccionar</option>
						<option value="1">Propia</option>
						<option value="2">Rentada</option>
						<option value="3">Prestada</option>
						<option value="4">Otro</option>
					</select>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>Ingreso familiar aproximado mensual</label>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon1">$</span>
						</div>
						<input type="number" class="form-control" v-model="cols.ingresoMensual">
					</div>
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>¿Cuantas personas aportan al ingreso familiar?</label>
					<input type="number" class="form-control" v-model="cols.nPersonasAportan">
				</div>
				<div class="form-group col-12 col-md-6 col-lg-4">
					<label>¿Realiza alguna actividad remunerada?</label>
					<select class="form-control" v-model="cols.actRemunerada">
						<option value="no" selected>No</option>
						<option value="si">Si</option>
					</select>
					<div v-if="cualActRemunerada">
						<label>Cual</label>
						<input type="text" class="form-control" v-model="cols.actRemuneradaCual">
					</div>
				</div>
			</div>
			<hr>
			<div class="form-row">
				<div class="form-group col-12 col-md-12 col-lg-12">
					<button type="submit" class="btn btn-primary">Guardar</button>
				</div>
				<div class="form-group col-12 col-md-12 col-lg-12">
					<button @click="clear()" class="btn btn-primary">Limpiar</button>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
import {dataSet} from '../extra/EntidadesINEGI'
import moment from 'moment'
import Vuex from 'vuex'
export default {
	name:'Register-form',
	data(){
		return {
			cols:{
				codigoVerificador:"",
				medicoResponsable:"",
				medicoTratante:"",
				date:moment().format('DD/MM/YYYY'),
				nombre:"",
				sexo:"",
				edad:"",
				rEdad:"",
				edoCivil:"0",
				otroEdoCivil:"",
				viveCon:"",
				otroViveCon:"",
				viveCuantos:"",
				viviendaEs:"0",
				ingresoMensual:"",
				nPersonasAportan:"",
				localidad:"",
				claveMunicipio:"",
				municipio:"",
				claveEFederativa:"",
				eFederativa:"",
				lugarNacimiento:"",
				ocupacion:"",
				actRemunerada:"no",
				actRemuneradaCual:"",
				telefono:"",
			},
			combos:{
				entidades:[],
				municipios:[],
				entidad:-1,
				municipio:-1,
			}
		}
	},
	computed: {
		...Vuex.mapState(['config']),
		currentDate(){return moment().format('DD/MM/YYYY')},
		cualActRemunerada(){
			return this.cols.actRemunerada=="si"?true:false
		},
		oEdoCivil(){
			return this.cols.edoCivil==6?true:false
		},
	},
	methods:{
		...Vuex.mapActions(['postRow']),
		async save(event){
			event.preventDefault();
			let row = {
				claveMexpharm:this.config.claveMexpharm,
				claveInst:this.config.claveInst,
				sedeCamp:this.config.sedeCamp,
				codigoVerificador:this.cols.codigoVerificador,
				anyo:moment().format('YYYY'),
				mes:moment().format('MM'),
				dia:moment().format('DD'),
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
				claveMunicipio:this.cols.claveMunicipio,
				municipio:this.cols.municipio,
				claveEFederativa:this.cols.claveEFederativa,
				eFederativa:this.cols.eFederativa,
				lugarNacimiento:this.cols.lugarNacimiento,
				ocupacion:this.cols.ocupacion,
				actRemunerada:this.cols.actRemunerada,
				actRemuneradaCual:this.cols.actRemuneradaCual,
				telefono:this.cols.telefono,
			}
			await this.postRow({row})
		},
		selectEntidad(){
			this.combos.municipios=dataSet[this.combos.entidad].municipios
			this.cols.claveEFederativa=dataSet[this.combos.entidad].clave
			this.cols.eFederativa=dataSet[this.combos.entidad].estado
		},
		selectMunicipio(){
			this.cols.claveMunicipio=dataSet[this.combos.entidad].municipios[this.combos.municipio].clave
			this.cols.municipio=dataSet[this.combos.entidad].municipios[this.combos.municipio].municipio
		},
		clear(){
			this.cols.codigoVerificador=""
			this.cols.medicoResponsable=""
			this.cols.medicoTratante=""
			this.cols.nombre=""
			this.cols.sexo=""
			this.cols.edad=""
			this.cols.rEdad=""
			this.cols.edoCivil=""
			this.cols.otroEdoCivil=""
			this.cols.viveCon=""
			this.cols.otroViveCon=""
			this.cols.viveCuantos=""
			this.cols.viviendaEs=""
			this.cols.ingresoMensual=""
			this.cols.nPersonasAportan=""
			this.cols.localidad=""
			this.cols.claveMunicipio=""
			this.cols.municipio=""
			this.cols.claveEFederativa=""
			this.cols.eFederativa=""
			this.cols.lugarNacimiento=""
			this.cols.ocupacion=""
			this.cols.actRemunerada="no"
			this.cols.actRemuneradaCual=""
			this.combos.entidades=[]
			this.combos.municipios=[]
			this.combos.entidad=-1
			this.combos.municipio=-1
		}
	},
	mounted() {
		this.combos.entidades=dataSet
	},
}
</script>