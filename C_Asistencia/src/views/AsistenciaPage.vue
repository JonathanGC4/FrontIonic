<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tabla de Datos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col><strong>ID</strong></ion-col>
          <ion-col><strong>Nombre</strong></ion-col>
          <ion-col><strong>Correo</strong></ion-col>
        </ion-row>
        
        <ion-row v-for="usuario in key" :key="usuario.">
          <ion-col>{{ usuario. }}</ion-col>
          <ion-col>{{ usuario. }}</ion-col>
          <ion-col>{{ usuario.}}</ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { key } from 'ionicons/icons';
// Importa tu servicio o API aquí
// import { obtenerDatos } from './path-to-your-service';


    const data = ref([]);

    const cargarDatos = async () => {
      
    onMounted(cargarDatos);
    }
      // Aquí llamas a tu API o servicio para obtener los datos
      // data.value = await obtenerDatos();
     

  

</script>

<style scoped>
ion-col {
  border: 1px solid #ccc;
  text-align: center;
}
</style>