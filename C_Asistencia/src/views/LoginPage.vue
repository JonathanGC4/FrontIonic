<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inicio de Sesión</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Usuario</ion-label>
        <ion-input v-model="username" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Contraseña</ion-label>
        <ion-input v-model="password" type="password"></ion-input>
      </ion-item>
      <ion-button expand="full" @click="login">Iniciar Sesión</ion-button>
      <ion-toast
        :is-open="toastOpen"
        :message="toastMessage"
        :duration="2000"
        @didDismiss="toastOpen = false"
      ></ion-toast>
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
} from "@ionic/vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonToast,
  },
  setup() {
    const username = ref(""); // Vínculo con el campo de usuario
    const password = ref(""); // Vínculo con el campo de contraseña
    const router = useRouter();
    const toastOpen = ref(false);
    const toastMessage = ref("");

    const login = async () => {
      try {
        // Llamada a la API con los valores de los campos
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          nombre_usuario: username.value, // Cambiado a 'nombre_usuario'
          contrasena: password.value, // Usando el valor correcto de contrasena
        });

        // Guardar token en localStorage y redirigir
        if (response.data.code === 200) {
          localStorage.setItem("token", response.data.token);
          toastMessage.value = "Inicio de sesión exitoso";
          toastOpen.value = true;
          router.push("/bienvenido");
        } else {
          throw new Error("Inicio de sesión fallido");
        }
      } catch (error) {
        // Manejo de errores
        toastMessage.value =
          error.response?.data?.data || "Error al iniciar sesión";
        toastOpen.value = true;
      }
    };

    return {
      username,
      password,
      login,
      toastOpen,
      toastMessage,
    };
  },
};
</script>
