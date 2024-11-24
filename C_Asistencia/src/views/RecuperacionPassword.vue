<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button text="Volver" icon="caret-back" ></ion-back-button>
          </ion-buttons>
        <ion-title>Recuperacion de Contraseña</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>

            <ion-input v-model="usuario.nombre_usuario" label="Nombre" color="warning" label-placement="stacked"
              :maxlength="30" counter fill="outline" shape="round" :clear-input="true"
              placeholder="Nombres y apellidos"></ion-input>

            <br>
            <ion-input v-model="usuario.contrasena" label=" Nueva Contraseña" color="warning" label-placement="stacked"
              fill="outline" shape="round" :clear-input="true" placeholder="Nueva Contraseña" type="password"></ion-input>
            <br>
            
            <ion-input v-model="usuario.Ncontrasena" label="Confirmar Contraseña" color="warning" label-placement="stacked"
              fill="outline" shape="round" :clear-input="true" placeholder="Nueva Contraseña" type="password"></ion-input>
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
              <ion-label>{{ usuario.nombre_usuario }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon slot="start" :icon="pencil"></ion-icon>
              <ion-label>{{ usuario.contrasena }}</ion-label>
            </ion-item>
             <ion-item>
              <ion-icon slot="start" :icon="pencil"></ion-icon>
              <ion-label>{{ usuario.Ncontrasena }}</ion-label>
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
import { informationCircleOutline, checkmarkOutline, personCircle, closeCircle, pencil, caretBack,} from 'ionicons/icons'
import { IonItem, IonList, IonLabel, IonButton, IonButtons, IonModal,  IonToast, IonPage, IonContent, IonGrid, IonRow, IonCol, IonBackButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonInput } from '@ionic/vue'
import { ref } from 'vue';
import NUsuarioService from '@/services/NUsuarioService';
import Usuarios from '@/interfaces/Usuarios';

const usuario = ref<Usuarios>({
  id_empleado: 0,
  nombre_usuario: '',
  contrasena: '',
  Ncontrasena: '',
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
  usuario.value.nombre_usuario = '';
  usuario.value.contrasena = '';
  usuario.value.Ncontrasena = '';
  
  
} 
</script>