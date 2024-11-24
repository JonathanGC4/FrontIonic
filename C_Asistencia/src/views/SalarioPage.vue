<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Administración de Salarios</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Gestionar Salarios y Prestaciones</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <!-- Inputs para gestionar los datos -->
              <ion-item>
                <ion-label position="stacked">Número de Identificación</ion-label>
                <ion-input v-model="salarioForm.identificacion" placeholder="Ingrese el ID del empleado"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Salario Base ($)</ion-label>
                <ion-input type="number" v-model="salarioForm.salarioBase" placeholder="Ingrese el salario base"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Prestaciones ($)</ion-label>
                <ion-input type="number" v-model="salarioForm.prestaciones" placeholder="Ingrese el monto de prestaciones"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Tipo de Contrato</ion-label>
                <ion-select v-model="salarioForm.tipoContrato">
                  <ion-select-option value="freelance">Freelance</ion-select-option>
                  <ion-select-option value="planillero">Planillero</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Estado Laboral</ion-label>
                <ion-select v-model="salarioForm.estadoLaboral">
                  <ion-select-option value="activo">Activo</ion-select-option>
                  <ion-select-option value="inactivo">Inactivo</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
            <!-- Botones -->
            <ion-button expand="block" @click="guardarDatos">Guardar</ion-button>
            <ion-button expand="block" color="danger" @click="resetFormulario">Limpiar</ion-button>
          </ion-card-content>
        </ion-card>
  
        <!-- Lista de empleados -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Empleados Registrados</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item v-for="empleado in empleados" :key="empleado.id_empleado">
                <ion-label>
                  <h3>{{ empleado.nombre }} {{ empleado.apellido }}</h3>
                  <p>Salario: ${{ empleado.salarioBase }} | Prestaciones: ${{ empleado.prestaciones }}</p>
                  <p>Tipo de Contrato: {{ empleado.tipoContrato }} | Estado: {{ empleado.estadoLaboral }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
  } from "@ionic/vue";
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    name: "SalarioPage",
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonList,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
      IonSelect,
      IonSelectOption,
    },
    setup() {
      const salarioForm = ref({
        identificacion: "",
        salarioBase: "",
        prestaciones: "",
        tipoContrato: "",
        estadoLaboral: "",
      });
  
      const empleados = ref([]);
  
      // Cargar datos iniciales
      const cargarEmpleados = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/empleados", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          empleados.value = response.data.data.map((empleado) => ({
            id_empleado: empleado.id_empleado,
            nombre: empleado.nombre,
            apellido: empleado.apellido,
            salarioBase: empleado.salario_base || "No definido",
            prestaciones: empleado.prestaciones || "No definido",
            tipoContrato: empleado.tipo_contrato || "No definido",
            estadoLaboral: empleado.estado_laboral || "No definido",
          }));
        } catch (error) {
          console.error("Error al cargar empleados", error);
        }
      };
  
      // Guardar datos
      const guardarDatos = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/empleados/salarios",
            salarioForm.value,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          alert("Datos guardados correctamente");
          cargarEmpleados();
        } catch (error) {
          console.error("Error al guardar datos", error);
        }
      };
  
      // Resetear formulario
      const resetFormulario = () => {
        salarioForm.value = {
          identificacion: "",
          salarioBase: "",
          prestaciones: "",
          tipoContrato: "",
          estadoLaboral: "",
        };
      };
  
      onMounted(() => {
        cargarEmpleados();
      });
  
      return {
        salarioForm,
        empleados,
        guardarDatos,
        resetFormulario,
      };
    },
  };
  </script>
  
  <style>
  ion-card {
    margin: 16px;
  }
  </style>
  