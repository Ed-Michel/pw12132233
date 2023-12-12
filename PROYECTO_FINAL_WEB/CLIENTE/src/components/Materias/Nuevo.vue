<template>
    <div class="Nuevo">
        <h2>Nueva Materia</h2>
        <p></p>
        <label for="txtclave">Clave: </label>
        <input type="text" name="txtclave" id="txtclave" v-model="materias.CLAVEMATERIA" class="form-control"
            maxlength="8" />
        <p></p>
        <label for="txtnombre">Nombre: </label>
        <input type="text" name="txtnombre" id="txtnombre" v-model="materias.NOMBRE" class="form-control" />
        <p></p>
        <label for="txtcreditos">Creditos: </label>
        <input type="number" name="txtcreditos" id="txtcreditos" v-model="materias.CREDITOS" class="form-control" />
        <p></p>
        <button id="boton-nuevo" @click.prevent="nuevo()">
            Nueva Materia
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import { URL_DATOS } from '@/utils/constantes';
import Swal from 'sweetalert2'
export default {
    name: "Nuevo",
    components: {},
    data() {
        return {
            materias: [],
        }
    },
    mounted() { },
    methods: {
        nuevo: async function () {
            try {
                if (!this.materias.CLAVEMATERIA || !this.materias.NOMBRE || !this.materias.CREDITOS) {
                    Swal.fire({
                        icon: "error",
                        title: "ADVERTENCIA",
                        text: "ASEGURATE QUE NO HAYA UN CAMPO VACIO",
                    });
                }else{
                const res = await axios.post(URL_DATOS + "/materias/", {
                    cla: this.materias.CLAVEMATERIA,
                    nom: this.materias.NOMBRE,
                    cre: this.materias.CREDITOS,
                });
                Swal.fire({
                    //position: "top-end",
                    icon: "success",
                    title: "Materia registrada",
                    showConfirmButton: true,
                    timer: 2000
                });
                location.reload();
            }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "ADVERTENCIA",
                    text: "SUCEDIO UN ERROR: " + error,
                })
            }

            
        }
    }
}

</script>