<template>
    <div class="Nuevo">
        <h2>Nuevo Maestro</h2>
        <p></p>
        <label for="txtclave">Clave: </label>
        <input type="number" name="txtclave" id="txtclave" v-model="maestros.CLAVEMAESTRO" class="form-control" />
        <p></p>
        <label for="txtnombre">Nombre: </label>
        <input type="text" name="txtnombre" id="txtnombre" v-model="maestros.NOMBRE" class="form-control" />
        <p></p>
        <label for="txtdepartamento">Departamento: </label>
        <input type="number" name="txtdepartamento" id="txtdepartamento" v-model="maestros.DEPARTAMENTO"
            class="form-control" />
        <p></p>
        <label for="txtestatus">Estatus: </label>
        <select name="cmbestatus" id="cmbestatus" v-model="estatusSeleccionado">
            <option value="-1" disabled selected>SELECCIONA UNA OPCION</option>
            <option value="V">V</option>
            <option value="B">B</option>
            <option value="E">E</option>
        </select>
        <p></p>
        <button id="boton-nuevo" @click.prevent="nuevo()">
            Nuevo Maestro
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
            maestros: [],
            estatusSeleccionado: null,
        }
    },
    mounted() { },
    methods: {
        nuevo: async function () {
            try {
                if (!this.maestros.CLAVEMAESTRO || !this.maestros.NOMBRE || !this.maestros.DEPARTAMENTO || !this.estatusSeleccionado) {
                    Swal.fire({
                        icon: "error",
                        title: "ADVERTENCIA",
                        text: "ASEGURATE QUE NO HAYA UN CAMPO VACIO",
                    });
                }
                else {
                    const res = await axios.post(URL_DATOS + "/maestros/", {
                        cla: this.maestros.CLAVEMAESTRO,
                        nom: this.maestros.NOMBRE,
                        dep: this.maestros.DEPARTAMENTO,
                        est: this.estatusSeleccionado,
                    });
                    Swal.fire({
                        //position: "top-end",
                        icon: "success",
                        title: "Maestro Registrado",
                        showConfirmButton: true,
                        timer: 2000
                    });
                    location.reload();
                    console.log(res);
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