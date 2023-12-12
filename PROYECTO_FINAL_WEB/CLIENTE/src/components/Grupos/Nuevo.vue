<template>
    <div class="Nuevo">
        <h2>Nuevo Grupo</h2>
        <p></p>
        <label for="txtclavemateria">Clave Materia: </label>
        <select name="cmbclavemateria" id="cmbclavemateria" v-model="materiaSeleccionada">
            <option value="-1" disabled selected>SELECCIONA UNA OPCION</option>
            <option v-for="clavemateria in matel" :key="clavemateria" :value="clavemateria">
                {{ clavemateria }}
            </option>
        </select>
        <p></p>
        <label for="txtclavegrupo">Clave Grupo: </label>
        <input type="text" name="txtclavegrupo" id="txtclavegrupo" v-model="grupos.CLAVEGRUPO" class="form-control"
            maxlength="4" />
        <p></p>
        <label for="txtclavemaestro">Clave Maestro: </label>
        <select name="cmbclavemaestro" id="cmbclavemaestro" v-model="maestroSeleccionado">
            <option value="-1" disabled selected>SELECCIONA UNA OPCION</option>
            <option v-for="clavemaestro in maesl" :key="clavemaestro" :value="clavemaestro">
                {{ clavemaestro }}
            </option>
        </select>
        <p></p>
        <label for="txtlimitealumnos">Cupo Limite: </label>
        <input type="number" name="txtlimitealumnos" id="txtlimitealumnos" v-model="grupos.LIMITEALUMNOS"
            class="form-control" />
        <p></p>
        <label for="txtinscritos">Cantidad Inscritos: </label>
        <input type="number" name="txtinscritos" id="txtinscritos" v-model="grupos.INSCRITOS" class="form-control" />
        <p></p>
        <label for="txthoralunes">Horario Lunes: </label>
        <input type="text" name="txthoralunes" id="txthoralunes" v-model="grupos.HORARIOLUNES" class="form-control"
            maxlength="11" />
        <p></p>
        <label for="txthoramartes">Horario Martes: </label>
        <input type="text" name="txthoramartes" id="txthoramartes" v-model="grupos.HORARIOMARTES" class="form-control"
            maxlength="11" />
        <p></p>
        <label for="txthoramiercoles">Horario Miercoles: </label>
        <input type="text" name="txthoramiercoles" id="txthoramiercoles" v-model="grupos.HORARIOMIERCOLES"
            class="form-control" maxlength="11" />
        <p></p>
        <label for="txthorajueves">Horario Jueves: </label>
        <input type="text" name="txthorajueves" id="txthorajueves" v-model="grupos.HORARIOJUEVES" class="form-control"
            maxlength="11" />
        <p></p>
        <label for="txthoraviernes">Horario Viernes: </label>
        <input type="text" name="txthoraviernes" id="txthoraviernes" v-model="grupos.HORARIOVIERNES" class="form-control"
            maxlength="11" />
        <p></p>
        <button id="boton-nuevo" @click.prevent="nuevo()">
            Nuevo Grupo
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import { URL_DATOS } from '@/utils/constantes';
import Swal from 'sweetalert2'
export default {
    name: "Nuevo",
    props: {},
    data() {
        return {
            grupos: [],
            matel: [],
            materiaSeleccionada: null,
            maesl: [],
            maestroSeleccionado: null,
        }
    },
    created() {
        this.traeMateriasClave();
        this.traeMaestrosClave();
    },
    methods: {
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
        traeMaestrosClave: async function () {
            try {
                const response = await axios.get(URL_DATOS + "/maestros");
                this.maesl = response.data.map(maestro => maestro.CLAVEMAESTRO);
                console.log(this.maesl);
            }
            catch (error) {
                console.error(error);
            }
        },
        nuevo: async function () {
            try {
                if (!this.materiaSeleccionada || !this.materiaSeleccionada ||
                    !this.grupos.CLAVEGRUPO ||
                    !this.maestroSeleccionado ||
                    !this.grupos.LIMITEALUMNOS ||
                    !this.grupos.INSCRITOS) {
                        Swal.fire({
                        icon: "error",
                        title: "ADVERTENCIA",
                        text: "ASEGURATE QUE NO HAYA UN CAMPO VACIO",
                    });
                    location.reload();
                } else {    
                    const res = await axios.post(URL_DATOS + "/grupos/", {
                        clamat: this.materiaSeleccionada,
                        clagru: this.grupos.CLAVEGRUPO,
                        clamae: this.maestroSeleccionado,
                        limalu: this.grupos.LIMITEALUMNOS,
                        ins: this.grupos.INSCRITOS,
                        horlun: this.grupos.HORARIOLUNES,
                        hormar: this.grupos.HORARIOMARTES,
                        hormie: this.grupos.HORARIOMIERCOLES,
                        horjue: this.grupos.HORARIOJUEVES,
                        horvie: this.grupos.HORARIOVIERNES
                    });
                    Swal.fire({
                        //position: "top-end",
                        icon: "success",
                        title: "Grupo Registrado",
                        showConfirmButton: true,
                        timer: 2000
                    });
                }

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "ADVERTENCIA",
                    text: "SUCEDIO UN ERROR: " + error,
                })
            }

            console.log(res);
        }
    }
}

</script>