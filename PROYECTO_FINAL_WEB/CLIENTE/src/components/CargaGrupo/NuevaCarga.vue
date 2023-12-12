<template>
    <div class="NuevaCarga">
        <h2>Datos de la carga</h2>
        <br>
        <label for="txtclave">Numero de control:</label>
        <input type="number" name="txtclave" id="txtclave" v-model="carga.ncontrol" class="form-control">
        <button type="submit" id="boton-carga" @click.prevent="verificarAlumno()">Buscar</button>
        <p></p>
        <label for="txtmateria">Materia:</label>
        <select name="cmbclavemateria" id="cmbclavemateria" v-bind:disabled="camposDeshabilitados"
            v-model="materiaSeleccionada" @click.prevent="traeGrupo()">
            <option value="-1" disabled selected>SELECCIONA UNA OPCION</option>
            <option v-for="clavemateria in matel" :key="clavemateria" :value="clavemateria">
                {{ clavemateria }}
            </option>
        </select>
        <!-- <input type="text" name="txtmateria" id="txtmateria" v-model="carga.clavemateria" v-bind:disabled="camposDeshabilitados" class="form-control"> -->
        <p></p>
        <label for="txtgrupo">Grupo:</label>
        <select name="cmbclavegrupo" id="cmbclavegrupo" v-model="grupoSeleccionado" v-bind:disabled="camposDeshabilitados">
            <option value="-1" disabled selected>SELECCIONA UNA OPCION</option>
            <option v-for="clavegrupo in grupo" :key="clavegrupo" :value="clavegrupo">
                {{ clavegrupo }}
            </option>
        </select>
        <!-- <input type="text" name="txtgrupo" id="txtgrupo" v-model="carga.clavegrupo" v-bind:disabled="camposDeshabilitados" -->
        <br>
        <button id="boton-nuevo" @click.prevent="nuevaCarga()" v-bind:disabled="camposDeshabilitados">Cargar
            Alumno</button>
    </div>
</template>
<script>
import { URL_DATOS } from '../../utils/constantes';
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: "nuevaCarga",
    components: {},
    data() {
        return {
            carga: [],
            camposDeshabilitados: true,
            matel: [],
            grupo: [],
            materiaSeleccionada: null,
            grupoSeleccionado: null,
        };
    },
    created() {
        this.traeMateriasClave();
        // this.traeGrupo();
    },
    methods: {
        nuevaCarga: async function () {
            try {
               if (!this.grupoSeleccionado==undefined  || this.materiaSeleccionada==undefined ) {
                    Swal.fire({
                            icon: "error",
                            title: "ADVERTENCIA",
                            text: "INGRESE UNA MATERIA Y UN GRUPO",
                        });
                } else {
                    //validar si hay cupo en el ggrupo
                    const cupo = await axios.get(URL_DATOS + "/grupos/" + this.grupoSeleccionado)
                    const limite = cupo.data[0].LIMITEALUMNOS;
                    let inscritos = cupo.data[0].INSCRITOS;
                    console.log(inscritos)    
                    if ((inscritos + 1) > limite) {
                        Swal.fire({
                            icon: "error",
                            title: "ADVERTENCIA",
                            text: "CUPO LIMITE ALCANZADO:" + limite,
                        });
                        //window.location.reload();
                    } else {
                        const res = await axios.post(URL_DATOS + "/carga", {
                            clavemateria: this.materiaSeleccionada,
                            clavegrupo: this.grupoSeleccionado,
                            ncontrol: this.carga.ncontrol,
                        })
                        const aumento = await axios.put(URL_DATOS + "/inscribir/" + this.grupoSeleccionado, {
                            clavegrupo: this.carga.clavegrupo,
                        });
                        Swal.fire({
                            //position: "top-end",
                            icon: "success",
                            title: "Carga Realizada",
                            showConfirmButton: true,
                            timer: 2000
                        });
                        location.reload();
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "ADVERTENCIA",
                    text: "SUCEDIO UN ERROR: " + error,
                })
            }
        },

        verificarAlumno: async function () {
            const res = await axios.get(URL_DATOS + "/alumnos/" + this.carga.ncontrol)

            if (res.data[0] != undefined) {
                this.camposDeshabilitados = false
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "ADVERTENCIA",
                    text: "NUMERO DE CONTROL NO EXISTENTE",
                });
            }
        },
        traeMateriasClave: async function () {
            try {
                const response = await axios.get(URL_DATOS + "/materias");
                this.matel = response.data.map(materia => materia.CLAVEMATERIA);
                console.log(this.matel);
            }
            catch (error) {
                console.error(error);
            }
        },
        traeGrupo: async function () {
            console.log(this.materiaSeleccionada)
            try {
                const response = await axios.get(URL_DATOS + "/buscarGrupo/" + this.materiaSeleccionada);
                this.grupo = response.data.map(grupo => grupo.CLAVEGRUPO);
                console.log(this.grupo);
            }
            catch (error) {
                console.error(error);
            }
        }

    }
}

</script>

<style>
button {
    margin-top: 15px;
}
</style>