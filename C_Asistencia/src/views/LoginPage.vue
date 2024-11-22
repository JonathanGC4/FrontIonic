<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Control Asistencia
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row class="ion-justify-content-center ion-align-items-center align-text-center" :fullscreen="true">
          <ion-col size="12">
            <img src="../asistencia.webp" alt="" height="200px">
            <ion-item>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Usuario</ion-label>
              <ion-input v-model="nombre_usuario" type="text" placeholder="Digite su usuario"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Contraseña</ion-label>
              <ion-input v-model="contrasena" type="password" placeholder="Digite su contraseña"></ion-input>
            </ion-item>

            <ion-button expand="full" @click="login" color="tertiary">Iniciar sesión</ion-button>

            <ion-col size="8">
              <ion-button fill="clear" @click="nuevo">Olvidó su contraseña</ion-button>
            </ion-col>
          </ion-col>
        </ion-row>

      </ion-grid>
      <ion-toast :is-open="isOpen" :message="msgError" :duration="5000" @didDismiss="hideToast"></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonToast, IonButton, IonItem, IonInput, IonGrid, IonRow, IonCol, IonHeader, IonTitle, IonContent, IonToolbar, IonLabel, IonPage } from '@ionic/vue'; 
import { ref } from 'vue';
import User from '@/interfaces/User';
import { useRouter } from 'vue-router';

const nombre_usuario = ref<string>('');
const contrasena = ref<string>('');
const msgError = ref<string>('');
const isOpen = ref<boolean>(false);

const usuario = ref<User>({
  id_empleado: 0,
  nombre_usuario: '',
  contrasena: '',
});

const router = useRouter();

function login() {
  if (!nombre_usuario.value || !contrasena.value) {
    showToast("Datos vacíos");
  } else {
    if (nombre_usuario.value && contrasena.value) {
      router.push('/bienvenido/' + nombre_usuario.value);
    } else {
      showToast("Usuario o contraseña incorrectos");
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
  router.push('/home/' + nombre_usuario.value);
}
</script>

<style scoped>
ion-button {
  margin-top: 16px;
  align-content: center;
}
</style>