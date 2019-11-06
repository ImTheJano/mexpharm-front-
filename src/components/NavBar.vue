<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
	<router-link class="navbar-brand" to="/">
		<img src="../assets/img/iso.png" class="img-responsive" width="50" alt="">
	</router-link>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav mr-auto">
			<li v-for="route in routes" :key="route.name" class="nav-item active mx-lg-3">
				<router-link :to="route.path" class="nav-item nav-link active">
					{{route.name}}
				</router-link>
			</li>
		</ul>
	</div>
</nav>

</template>
<script>
import {routes} from '../router'
export default {
	name:'navbar',
	data() {
		return {
			routes:[]
		}
	},
	mounted(){
		this.routes=routes
		console.log(this.$route);
		
	}
}
</script>