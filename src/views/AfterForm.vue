<template>
    <div class="container">
        <h2>Operación</h2>
        <form @submit="save($event)">
            <div class="form-group col-12 col-md-3">
				<label>Codigo verificador</label>
				<div class="input-group">
					<input type="text" class="form-control" v-model="cols.codigoVerificador" required>
					<div class="input-group-append">
						<button @click="find()" class="btn btn-outline-secondary" type="button">Buscar</button>
					</div>
				</div>
			</div>
            <div v-if="found">
                <div class="form-group col-12 col-md-3">
                    <label>{{cols.nombre}}</label>
                </div>
                <div class="form-row">
                    <div class="form-group col-12 col-md-6 col-lg-3">
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
                    <div class="form-group col-12 col-md-6 col-lg-3">
                        <label>Intervención ojo izquierdo</label>
                        <input type="number" class="form-control" v-model="cols.intervencionOjoI">
                    </div>
                    <div class="form-group col-12 col-md-6 col-lg-3">
                        <label>Intervención ojo derecho</label>
                        <input type="number" class="form-control" v-model="cols.intervencionOjoD">
                    </div>
                    <div class="form-group col-12 col-md-6 col-lg-3">
                        <label>Procedimiento</label>
                        <input type="text" class="form-control" v-model="cols.procedimiento">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-12 col-md-6 col-lg-3">
                        <label>Observaciones</label>
                        <input type="text" class="form-control" v-model="cols.observaciones">
                    </div>
                    <div class="form-group col-12 col-md-6 col-lg-3">
                        <label>Complicaciones</label>
                        <input type="text" class="form-control" v-model="cols.complicaciones">
                    </div>
                    <div class="form-group col-12 col-md-6 col-lg-3">
                        <label>Insumos</label>
                        <input type="text" class="form-control" v-model="cols.insumos">
                    </div>
                    <div class="form-group col-12 col-md-6 col-lg-3">
                        <label>Folio consignia</label>
                        <input type="text" class="form-control" v-model="cols.folioConsignia">
                    </div>
                </div>
                <h4>Previo a la operación</h4>
                <div class="form-row">
                    <div class="form-group col-12 col-md-6 col-lg-4">
                        <label>¿Ha tenido algun accidente debido a su mala visión?</label>
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
                        <label>¿Qué actividades no puede realizar debido a su visión deficiente?</label>
                        <div class="input-group">
                            <div class="custom-control custom-checkbox mx-2 my-2">
                                <input v-model="combos.checkNoAct" value="Actividades limitadas en el hogar" type="checkbox" class="custom-control-input" id="check-noActividades-1">
                                <label class="custom-control-label" for="check-noActividades-1">Actividades limitadas en el hogar</label>
                            </div>
                            <div class="custom-control custom-checkbox mx-2 my-2">
                                <input v-model="combos.checkNoAct" value="Limitacion de las actividades laborales" type="checkbox" class="custom-control-input" id="check-noActividades-2">
                                <label class="custom-control-label" for="check-noActividades-2">Limitación de las actividades laborales</label>
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
                                <label class="custom-control-label" for="check-noActividades-6">Bordar o cosér</label>
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
                            <div v-if="otherCheckNoAct">
                                <input v-model="cols.oActAntesDeCirugia" type="text" class="form-control" placeholder="Otro">
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <h4>¿Despues de la operación?</h4>
                <div class="form-row mt-5">
                    <div class="form-group col-12 col-md-12 col-lg-12">
                        <label>¿Que actividades retomo despues de la cirugia?</label>
                        <div class="input-group">
                            <div class="custom-control custom-checkbox mx-2 my-2">
                                <input v-model="combos.checkAct" value="Actividades en el hogar" type="checkbox" class="custom-control-input" id="check-actividades-1">
                                <label class="custom-control-label" for="check-actividades-1">Actividades en el hogar</label>
                            </div>
                            <div class="custom-control custom-checkbox mx-2 my-2">
                                <input v-model="combos.checkAct" value="Limitacion den las actividades laborales" type="checkbox" class="custom-control-input" id="check-actividades-2">
                                <label class="custom-control-label" for="check-actividades-2">Limitación den las actividades laborales</label>
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
                            <div v-if="otherCheckAct">
                                <input v-model="cols.oActDespuesDeCirugia" type="text" class="form-control" placeholder="Otro">
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <h4>Evaluación</h4>
                <div class="form-row mt-4">
                    <div class="form-group col-12 col-md-12 col-lg-12">
                        <label>¿Cómo calificarías el resultado de la cirugía?</label>
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
                <hr>
                <div class="form-row">
                    <div class="form-group col-12 col-md-12 col-lg-12">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import Vuex from 'vuex'
import * as alertify from 'alertify.js';
export default {
    name:"AfterForm",
    data() {
        return {
            cols:{
                nombre:"",
				codigoVerificador:"",
				clacificacionOjo:"",
				intervencionOjoD:"0",
				intervencionOjoI:"0",
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
				satisfaccion:"",
			},
            combos:{
				checkNoAct:[],
				checkAct:[]
            },
            found:false,
        }
    },
    computed: {
        otherCheckNoAct(){
            return this.combos.checkNoAct.indexOf("Otro")!=-1
        },
        otherCheckAct(){
            return this.combos.checkAct.indexOf("Otro")!=-1
        },
    },
    methods:{
        ...Vuex.mapActions(['updateRow','findRow']),
        async find(){
            let res=await this.findRow({codigoVerificador:this.cols.codigoVerificador});
            if(res.data.length!=1){
                alertify.error('No se ha encontrado el registro solicitado')
                this.found=false
            }else{
                this.found=true
                this.cols.nombre=res.data[0].nombre
            }
        },
        clear(){
            this.nombre=""
			this.codigoVerificador=""
			this.clacificacionOjo=""
			this.intervencionOjoD="0"
			this.intervencionOjoI="0"
			this.procedimiento=""
			this.observaciones=""
			this.complicacione=""
			this.insumos=""
			this.folioConsignia=""
			this.actAntesDeCirugia=""
			this.nActAntesDeCirugia=""
			this.oActAntesDeCirugia=""
			this.actDespuesDeCirugia=""
			this.nActDespuesDeCirugia=""
			this.oActDespuesDeCirugia=""
            this.satisfaccion=""
            this.combos.checkNoAct=[]
			this.combos.checkAct=[]
        },
		save(event){
            event.preventDefault();            
			let row = {
				clacificacionOjo:this.cols.clacificacionOjo,
				intervencionOjoD:this.cols.intervencionOjoD,
				intervencionOjoI:this.cols.intervencionOjoI,
				procedimiento:this.cols.procedimiento,
				observaciones:this.cols.observaciones,
				complicacione:this.cols.complicacione,
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
            console.log({row,id:this.cols.codigoVerificador});
            
            if(this.found){
                this.updateRow({row,id:this.cols.codigoVerificador})
            }
		},
	},
    
}
</script>>