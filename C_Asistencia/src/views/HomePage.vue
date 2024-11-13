<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nuevo Usuario</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-input v-model="usuario.nombre" label="Nombre" color="warning" label-placement="stacked"
              :maxlength="30" counter fill="outline" shape="round" :clear-input="true"
              placeholder="Nombres y apellidos"></ion-input>
            <br>
            <ion-input v-model="usuario.contrasena" label="Contraseña" color="warning" label-placement="stacked"
              fill="outline" shape="round" :clear-input="true" placeholder="Password" type="password"></ion-input>
            <br>
            <ion-input v-model="usuario.correo" label="Correo electrónico" color="warning" label-placement="stacked"
              fill="outline" shape="round" :clear-input="true" placeholder="Correo electrónico" type="email"></ion-input>
            <br>
            
            <ion-input v-model="usuario.rol" label="Rol" color="warning" label-placement="stacked" fill="outline"
              shape="round" :clear-input="true" placeholder="Rol" type="number"></ion-input>
            <br>
            <ion-input v-model="usuario.fecha" type="date" label="fecha" color="warning" label-placement="stacked"
              :maxlength="9" counter fill="outline" shape="round" :clear-input="true"
              placeholder="fecha"></ion-input>
            <br>
          
            <ion-button @click="GuardarDatos" shape="round" color="warning" expand="block">
              <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
              Guardar
            </ion-button>

          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-modal :is-open="modalState1" @didDismiss="() => modalState1 = false">
        <ion-header>
          <ion-toolbar>
            <ion-title>Información del Usuario</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="modalState1 = false">
                <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list>
            <ion-item>
              <ion-icon slot="start" :icon="personCircle"></ion-icon>
              <ion-label>{{ usuario.nombre }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon slot="start" :icon="pencil"></ion-icon>
              <ion-label>{{ usuario.contrasena }}</ion-label>
            </ion-item>
             <ion-item>
              <ion-icon slot="start" :icon="mail"></ion-icon>
              <ion-label>{{ usuario.correo }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon slot="start" :icon="call"></ion-icon>
              <ion-label>{{ usuario.rol }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon slot="start" :icon="checkmark"></ion-icon>
              <ion-label>{{ usuario.fecha }} Fecha</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>

      <ion-toast :duration="2500" :message="toastMessage" :is-open="toastState" @didDismiss="toastState = false"
        :icon="informationCircleOutline" />

    </ion-content>

  </ion-page>
</template>
<script setup lang="ts">
import { informationCircleOutline, checkmarkOutline, checkmark, mail, call, closeCircleOutline, personCircle, closeCircle, pencil, } from 'ionicons/icons'
import { IonItem, IonList, IonLabel, IonButton, IonButtons, IonModal,  IonToast, IonPage, IonContent, IonGrid, IonRow, IonCol, IonIcon, IonHeader, IonToolbar, IonTitle, IonInput } from '@ionic/vue'
import { ref } from 'vue';
import NUsuarioService from '@/services/NUsuarioService';
import Usuarios from '@/interfaces/Usuarios';

const usuario = ref<Usuarios>({
  id: 0,
  nombre: '',
  contrasena: '',
  correo: '',
  rol: 0,
  fecha: '',
  created_at: '',
  updated_at: '',
});


const toastState = ref<boolean>(false);
const toastMessage = ref<string>();
const usuarioService = new NUsuarioService();

// Variable para controlar la visibilidad del modal 
const modalState1 = ref<boolean>(false); 
// Variable para guardar los datos del usuario


const GuardarDatos = async () => {
  try {
    const msg = await usuarioService.store(usuario.value);

    limpiarUsuario();

    toastState.value = true;
    toastMessage.value = msg;

  } catch (error) {
    toastState.value = true;
    toastMessage.value = error + "";
  }
}

const limpiarUsuario = () => {
  usuario.value.nombre = '';
  usuario.value.contrasena = '';
  usuario.value.correo = '';
  usuario.value.rol = 0;
  usuario.value.fecha = '';
  
} 
</script>