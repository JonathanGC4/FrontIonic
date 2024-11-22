<template>
  <ion-page>
      <ion-header>
          <ion-toolbar>
              <ion-buttons slot="start">
                  <ion-back-button default-href="/administradorview"></ion-back-button> 
              </ion-buttons>
              <ion-title>Gestión de Empleados</ion-title>
          </ion-toolbar>
      </ion-header>

      <ion-content>
          <!-- Formulario  -->
          <form @submit.prevent="guardarEmpleado">
              <ion-item>
                  <ion-label position="floating">Nombre</ion-label>
                  <ion-input v-model="empleado.nombre" type="text" required></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label position="floating">Apellido</ion-label>
                  <ion-input v-model="empleado.apellido" type="text" required></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label position="floating">Cargo</ion-label>
                  <ion-input v-model="empleado.cargo" type="text" required></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label position="floating">Área ID</ion-label>
                  <ion-input v-model.number="empleado.id_area" type="number" required></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label position="floating">Puesto</ion-label>
                  <ion-input v-model="empleado.puesto" type="text" required></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label position="floating">Correo</ion-label>
                  <ion-input v-model="empleado.correo" type="email" required></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label position="floating">Teléfono</ion-label>
                  <ion-input v-model="empleado.telefono" type="tel" required></ion-input>
              </ion-item>

              <ion-button expand="full" type="submit">{{ isEditing ? 'Actualizar' : 'Agregar' }} Empleado</ion-button>
          </form>

          <!-- Lista de empleados -->
          <ion-list>
              <ion-item-group>
                  <ion-item v-for="(emp, index) in empleados" :key="emp.id_empleado">
                      <ion-label>{{ emp.nombre }} {{ emp.apellido }} - {{ emp.puesto }}</ion-label>
                      <ion-buttons slot="end">
                          <ion-button @click="editarEmpleado(emp)">Editar</ion-button>
                          <!-- Verifica que id_empleado no sea undefined antes de llamar a eliminarEmpleado -->
                          <ion-button color="danger" @click="eliminarEmpleado(emp.id_empleado!)" v-if="emp.id_empleado !== undefined">Eliminar</ion-button>
                      </ion-buttons>
                  </ion-item>
              </ion-item-group>
          </ion-list>

          <!-- Mensajes de error o éxito -->
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

      </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchEmpleadosFromAPI, addEmpleado, updateEmpleado, deleteEmpleado, Empleado } from '@/services/empleadoService'; // Importa el servicio
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonItem, IonLabel, IonInput, IonButton, IonList, IonItemGroup } from '@ionic/vue'; 

// Estado para los empleados
const empleados = ref<Empleado[]>([]);
const empleado = ref<Empleado>({
  nombre: '',
  apellido: '',
  cargo: '',
  id_area: 0,
  puesto: '',
  correo: '',
  telefono: ''
});
const isEditing = ref(false);
const editingIndex = ref<number | null>(null);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

// Función para cargar los empleados desde la API
async function fetchEmpleados() {
  try {
      const response = await fetchEmpleadosFromAPI(); 
      empleados.value = response; 
      successMessage.value = "Empleados cargados correctamente.";
  } catch (error) {
      errorMessage.value = 'Error al cargar los empleados.';
      console.error('Error al cargar los empleados:', error);
  }
}

// Función para guardar un empleado 
async function guardarEmpleado() {
  errorMessage.value = null; 
  successMessage.value = null; 

  try {
      if (isEditing.value) { // Actualizar el empleado existente
          if (editingIndex.value !== null) {
              const updatedEmpleado = { ...empleado.value }; 
              const response = await updateEmpleado(empleados.value[editingIndex.value].id_empleado!, updatedEmpleado); 
              empleados.value[editingIndex.value] = response; 
              successMessage.value = "Empleado actualizado correctamente.";
          }
          isEditing.value = false; 
      } else { // Agregar nuevo empleado
          const newEmpleado = { ...empleado.value }; 
          const response = await addEmpleado(newEmpleado);
          empleados.value.push(response); 
          successMessage.value = "Empleado agregado correctamente.";
      }

      // Limpiar el formulario
      empleado.value.nombre = '';
      empleado.value.apellido = '';
      empleado.value.cargo = '';
      empleado.value.id_area = 0;
      empleado.value.puesto = '';
      empleado.value.correo = '';
      empleado.value.telefono = '';
  } catch (error) {
      errorMessage.value = 'Error al guardar el empleado.';
      console.error('Error al guardar el empleado:', error);
  }
}

// Función para editar un empleado
function editarEmpleado(empToEdit: Empleado) {
  empleado.value.nombre = empToEdit.nombre;
  empleado.value.apellido = empToEdit.apellido;
  empleado.value.cargo = empToEdit.cargo;
  empleado.value.id_area = empToEdit.id_area;
  empleado.value.puesto = empToEdit.puesto;
  empleado.value.correo = empToEdit.correo;
  empleado.value.telefono = empToEdit.telefono;

  isEditing.value = true;
  editingIndex.value = empleados.value.findIndex(e => e.id_empleado === empToEdit.id_empleado); 
}

// Función para eliminar un empleado
async function eliminarEmpleado(id_empleado: number) {
  errorMessage.value = null;
  successMessage.value = null; 

  try {
      await deleteEmpleado(id_empleado); 
      empleados.value = empleados.value.filter(emp => emp.id_empleado !== id_empleado); 
      successMessage.value = "Empleado eliminado correctamente.";
  } catch (error) {
      errorMessage.value = 'Error al eliminar el empleado.';
      console.error('Error al eliminar el empleado:', error);
  }
}
onMounted(fetchEmpleados);
</script>

<style scoped>
.error-message {
    color: red;
}
.success-message {
    color: green;
}
</style>
