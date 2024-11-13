<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-label position="floating">Control Asistencia</ion-label>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row class="ion-justify-content-center ion-align-items-center align-text-center" :fullscreen="true">
          <ion-col size="12">
            <ion-label position="floating"><img src="../asistencia.webp" alt="" height="200px"></ion-label>
            <ion-item>
              <ion-label position="floating">Ingresa tus datos</ion-label>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Usuario</ion-label>
              <ion-input v-model="username" type="text" placeholder="Digite su usuario"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Contraseña</ion-label>
              <ion-input v-model="password" type="password" placeholder="Digite su contraseña"></ion-input>
            </ion-item>
            <ion-button expand="full" @click="login" color="tertiary">Iniciar sesion</ion-button>
            <ion-icon name="apps"></ion-icon>
            <ion-col size="8">
              <ion-button fill="clear" @click="nuevo">Ingresar nuevo Usuario</ion-button>
            </ion-col>
          </ion-col>
        </ion-row>

      </ion-grid>
      <ion-toast :is-open="isOpen" :message="msgError" :duration="5000" @didDismiss="hideToast"></ion-toast>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonToast, IonButton, IonItem, IonInput, IonGrid, IonRow, IonCol, IonHeader, IonTitle, IonContent, IonToolbar, IonLabel, IonPage, IonIcon } from '@ionic/vue';
import { ref } from 'vue';
import {User} from '@/interfaces/User';
import { useRouter,  useRoute} from 'vue-router';
import UserJson from '@/api/UserJSON.json';

const username = ref<string>();
const password = ref<string>();
const msgError = ref<string>();
const isOpen = ref<Boolean>(false);

//simulamos la respuesta del servidor
const user = ref<User>(UserJson);

//instanciamos el rout
const router = useRouter();

function login() {
  

  //evaluamos si los datos estan vacios
  if (username.value == undefined || password.value == undefined) {

    //mostrar mensaje de alerta
    showToast("Datos vacios");

  } else {

//evaluamos si el usuario es el correcto
if (username.value == user.value.username
&& password.value == user.value.password) {
  
  router.push('//' + username.value );
  
} else {
  
  showToast("Usuario incorrecto");
  showToast("Contraseña incorrecta")
}

}

}


function hideToast(): void {
  isOpen.value = false;
}

function showToast(msg: string): void {
  msgError.value = msg;
  isOpen.value = true;
}

function nuevo() {
  router.push('/home/' + username.value);

};
</script>
<style scoped>
ion-button {
  margin-top: 16px;
  align-content: center;
}
</style>