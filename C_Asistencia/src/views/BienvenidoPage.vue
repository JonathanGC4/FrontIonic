<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Menú Principal</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <!-- Botones visibles para todos -->
          <ion-item v-if="userRole === 'Administrador' || userRole === 'Jefe de Área' || userRole === 'Empleado'" button router-link="/resumen-horas">
            Resumen de Horas
          </ion-item>
          <!-- Botones visibles solo para Administrador -->
          <ion-item v-if="userRole === 'Administrador'" button router-link="/registro-areas">
            Gestionar Áreas
          </ion-item>
          <ion-item v-if="userRole === 'Administrador'" button router-link="../Administrador/GestionEmpledos.vue">
            Gestionar Empleados
          </ion-item>
          <ion-item v-if="userRole === 'Administrador'" button router-link="/administracion-usuarios">
            Administrar Usuarios
          </ion-item>
          <!-- Botones visibles para Administrador y Jefe de Área -->
          <ion-item v-if="userRole === 'Administrador' || userRole === 'Jefe de Área'" button router-link="/administracion-salario">
            Salarios y Contratos
          </ion-item>
          <!-- Botones visibles solo para Empleado -->
          <ion-item v-if="userRole === 'Empleado'" button router-link="/registro-horas">
            Registrar Horas
          </ion-item>
          <ion-item v-if="userRole === 'Empleado'" button router-link="/detalles-empleado">
            Mis Detalles
          </ion-item>
        </ion-list>
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
    IonList,
    IonItem,
  } from "@ionic/vue";
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    name: "Menu",
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonList,
      IonItem,
    },
    setup() {
      const userRole = ref("");
      onMounted(async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/usuarios", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const currentUser = response.data.data.find(
      (user) => user.nombre_usuario === localStorage.getItem("username")
    );

    if (currentUser && currentUser.cargo) {
      userRole.value = currentUser.cargo; // Se actualiza con el rol del usuario autenticado
    } else {
      console.error("Usuario no encontrado o sin cargo asignado.");
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
  }
});

  
      return {
        userRole,
      };
    },
  };
  </script>
  