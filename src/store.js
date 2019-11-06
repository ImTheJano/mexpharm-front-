import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as alertify from 'alertify.js';
import {router} from './router'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver';
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		config:{
			claveInst:'',
			claveMexpharm:'',
			sedeCamp:'',
			backEndHost:'localhost',
			backEndPort:'3000',
		},
		db:{rows:{}}
	},
	mutations: {
		setClaveInst(state,payload){
			state.config.claveInst=payload.claveInst
		},
		incremetClaveInst(state){
			state.config.claveInst++
			localStorage.setItem('mexpharm_config',JSON.stringify(state.config))
		},
		setClaveMexpharm(state,payload){
			state.config.claveMexpharm=payload.claveMexpharm
		},
		setSedeCamp(state,payload){
			state.config.sedeCamp=payload.sedeCamp
		},
		setBackEndHost(state,payload){
			state.config.backEndHost=payload.backEndHost
		},
		setBackEndPort(state,payload){
			state.config.backEndPort=payload.backEndPort
		},
		setConfig(state,payload){
			state.config.claveInst=payload.config.claveInst
			state.config.claveMexpharm=payload.config.claveMexpharm
			state.config.sedeCamp=payload.config.sedeCamp
			state.config.backEndHost=payload.config.backEndHost
			state.config.backEndPort=payload.config.backEndPort
		},
		setDb(state,payload){
			state.db.rows={}
			state.db.rows=payload.db
		},
		addRow(state,payload){
			let row=payload.row
			state.db.rows[row.claveInst]=row
		},
		deleteRows(state){
			state.db.rows={}
		}
	},
	actions: {
		loadDataBase: async function(context){
			let res=await axios.get('http://'+context.state.config.backEndHost+':'+context.state.config.backEndPort+'/data/read',{ useCredentails: true })
			let db=res.data.data.rows
			if(db){
				context.commit('setDb',{db})
				if(db[context.state.config.claveInst]){
					alertify.confirm('La clave institucional en curso ya esta usada en la base de datos, haga click en ok para cambiarla en configuración',
						function(){router.push("settings")},
						function(){alertify.error('Deberas cambiar la clave institucional en configuración, de lo contrario no podras almacenar nuevos registros')},
					)
				}
				
			}
		},
		loadSettings: async function({commit}){
			if (typeof(Storage) !== "undefined") {
				if(localStorage.getItem('mexpharm_config')!==null)
					commit('setConfig',{config:JSON.parse(localStorage.getItem('mexpharm_config'))})
			}
		},
		postRow: async function(context,row){
			row=row.row	
			if(context.state.db.rows[row.claveInst]){
				alertify.alert('La clave institucional que esta intentando almacenar ya existe, intenta con otra')
			}else{
				alertify.confirm('¿Todos los datos son correctos?',
					async function(){
						context.commit('addRow',{row})
						let res=await axios.post('http://'+context.state.config.backEndHost+':'+context.state.config.backEndPort+'/data/write',{db:context.state.db},{ useCredentails: true })
						if(res.status==200){
							alertify.success('Se a guardado el registro en la base de datos')
							context.commit('incremetClaveInst')
						}else{
							alertify.error('Ha ocurrido un error con la base de datos, asegurese de que el back este funcionando')
						}
					},
					function(){
						alertify.error('No se ha guardado el registro')
					},
				)
			}
			
		},
		updateRow: async function(context,row){
			row=row.row
			if(context.state.db.rows[row.claveInst]){
				alertify.confirm('¿Todos los datos son correctos?',
					async function(){
						context.commit('addRow',{row})
						let res=await axios.post('http://'+context.state.config.backEndHost+':'+context.state.config.backEndPort+'/data/write',{db:context.state.db},{ useCredentails: true })
						if(res.status==200){
							alertify.success('Se a guardado el registro en la base de datos')
							context.commit('incremetClaveInst')
						}else{
							alertify.error('Ha ocurrido un error con la base de datos, asegurese de que el back este funcionando')
						}
					},
					function(){
						alertify.error('No se ha guardado el registro')
					},
				)
			}else{
				alertify.alert('El registro que intenta editar no se encuentra en la base de datos')
			}
		},
		deleteAll: async function(context){
			alertify.confirm('Los datos ya no podran ser recuperados ¿estas seguro?',
				async function(){
					context.commit('deleteRows')
					let res=await axios.post('http://'+context.state.config.backEndHost+':'+context.state.config.backEndPort+'/data/write',{db:context.state.db},{ useCredentails: true })
					if(res.status==200){
						alertify.success('Se han eliminado todos los registros de la base de datos')
					}else{
						alertify.error('Ha ocurrido un error con la base de datos, asegurese de que el back este funcionando')
					}
				},
				function(){
					alertify.error('No se ha guardado el registro')
				},
			)	
		},
		exportToXls(context,{params}){
			console.log('exportando...');
			var ws_data=[]
			ws_data.push([
				'CLAVE_MEXPHARM',
				'FICHA_CLAVE_INSTITUCIONAL',
				'CODIGO_VERIFICADOR',
				'AÑO_DEL_PROCEDIMIENTO',
				'MES',
				'DÍA',
				'MÉDICO_RESPONSABLE',
				'MÉDICO_TRATANTE',
				'NOMBRE',
				'SEXO',
				'EDAD',
				'R_EDAD',
				'ESTADO_CIVIL',
				'OTRO_EDO_CIVIL',
				'CON_QUIEN_VIVE',
				'OTRO_CON_QUIEN',
				'CON_CUANTAS_PERSONAS_COMPARTE_LA_VIVIENDA',
				'LA_VIVIENDA_ES',
				'INGRESO_FAMILIAR_AL_MES',
				'CUANTAS_PERSONAS_APORTAN_AL_INGRESO_FAMILIAR',
				'LOCALIDAD',
				'CLAVE_DE_MUNICIPIO_INEGI',
				'MUNICIPIO',
				'CLAVE_ENTIDAD_FEDERATIVA_INEGI',
				'ESTADO',
				'LUGAR_DE_NACIMIENTO',
				'OCUPACIÓN',
				'REALIZA_ALGUNA_ACTIVIDAD_REMUNERADA',
				'CUÁL',
				'CLASIFICACIÓN_DE_OJO',
				'INTERVENCIÓN_REALIZADA_OJO_DERECHO',
				'INTERVENCIÓN_REALIZADA_OJO_IZQUIERDO',
				'PROCEDIMIENTO',
				'OBSERVACIONES',
				'COMPLICACIONES',
				'SEDE_DE_LA_CAMPAÑA',
				'INSUMOS',
				'NÚMERO_DE_FOLIO_DE_CONSIGNA',
				'QUE_ACTIVIDADES_NO_PODÍA_REALIZAR_ANTES_DE_LA_CIRUGÍA',
				'N_QUE_ACTIVIDADES_NO_PODÍA_REALIZAR_ANTES_DE_LA_CIRUGÍA',
				'OTRO_CUÁL_ACTIVIDADES_NO_REALIZADAS',
				'QUE_ACTIVADES_RETOMÓ_DESPUES_DE_LA_CIRUGÍA',
				'N_QUE_ACTIVADES_RETOMÓ_DESPUES_DE_LA_CIRUGÍA',
				'OTRO_CUALES_ACTIVIDADES_RETOMADAS',
				'NÚMERO_TELEFÓNICO',
				'QUE_TAN_SATISFECHO_ESTÁ_CON_SU_CIRUGÍA'])
			for (const _row in context.state.db.rows) {
				if (context.state.db.rows.hasOwnProperty(_row)) {
					const obj = context.state.db.rows[_row];
					const row=[]
					row.push(obj.claveMexpharm)
					row.push(obj.claveInst)
					row.push(obj.codigoVerificador)
					row.push(obj.anyo)
					row.push(obj.mes)
					row.push(obj.dia)
					row.push(obj.medicoResponsable)
					row.push(obj.medicoTratante)
					row.push(obj.nombre)
					row.push(obj.sexo)
					row.push(obj.edad)
					row.push(obj.rEdad)
					row.push(obj.edoCivil)
					row.push(obj.otroEdoCivil)
					row.push(obj.viveCon)
					row.push(obj.otroViveCon)
					row.push(obj.viveCuantos)
					row.push(obj.viviendaEs)
					row.push(obj.ingresoMensual)
					row.push(obj.nPersonasAportan)
					row.push(obj.localidad)
					row.push(obj.claveMunicipio)
					row.push(obj.municipio)
					row.push(obj.claveEFederativa)
					row.push(obj.eFederativa)
					row.push(obj.lugarNacimiento)
					row.push(obj.ocupacion)
					row.push(obj.actRemunerada)
					row.push(obj.actRemuneradaCual)
					row.push(obj.clacificacionOjo)
					row.push(obj.intervencionOjoD)
					row.push(obj.intervencionOjoI)
					row.push(obj.procedimiento)
					row.push(obj.observaciones)
					row.push(obj.complicacione)
					row.push(obj.sedeCamp)
					row.push(obj.insumos)
					row.push(obj.folioConsignia)
					row.push(obj.actAntesDeCirugia)
					row.push(obj.nActAntesDeCirugia)
					row.push(obj.oActAntesDeCirugia)
					row.push(obj.actDespuesDeCirugia)
					row.push(obj.nActDespuesDeCirugia)
					row.push(obj.oActDespuesDeCirugia)
					row.push(obj.telefono)
					row.push(obj.satisfaccion)
					ws_data.push(row)
				}
			}

			let wb = XLSX.utils.book_new();
			wb.props={Title:params.title,Author:params.author}
			wb.SheetNames.push(params.sheet);
			var ws = XLSX.utils.aoa_to_sheet(ws_data);
			wb.Sheets[params.sheet] = ws;
			var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
			//console.log('s: ',wbout);
			var buf = new ArrayBuffer(wbout.length); //convert s to arrayBuffer
			var view = new Uint8Array(buf);  //create uint8array as viewer
			for (var i=0; i<wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF; //convert to octet
			let xlsC = buf
			let f=new Blob([xlsC],{type:"application/octet-stream"})
			saveAs(f, params.fileName+'.xlsx');
		},
	}
})
