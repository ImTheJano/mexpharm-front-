<template>
	<div class="container">
		<div class="row">
			<img src="../assets/img/logo.png" class="img-responsive mx-auto" height="50%" width="50%" alt="">
		</div>
		<div class="row mt-5">
			<div class="container">
				<p class="lead">Para comenzar es necesario configurar este software haciendo click en el botón configurar, si ya tienes una configuración entonces puedes comenzar a realizar registros, al final puedes exportar todo a una base de datos de Excel</p>
			</div>
		</div>
		<div class="row px-5 mt-3">
			<router-link to="/settings" class="btn btn-primary rounded-pill mx-auto my-3">Configurar</router-link>
			<router-link to="/register" class="btn btn-primary rounded-pill mx-auto my-3">Registro</router-link>
			<router-link to="/export" class="btn btn-primary rounded-pill mx-auto my-3">Exportar</router-link>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'home',
	components: {
	}
}
</script>
