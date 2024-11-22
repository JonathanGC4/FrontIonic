<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button text="Regresar" icon="caret-back" default-href="/bienvenido/:login"></ion-back-button>
                </ion-buttons>
                <ion-title>Bienvenido Usuario</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Bienvenido {{ nombre_usuario }}</ion-card-title>
                    <ion-card-subtitle>Rol: {{ rol_usuario }}</ion-card-subtitle>
                </ion-card-header>
            </ion-card>

            <ion-grid>
                <ion-col size="12">
                    <ion-item v-for="(option, index) in options" :key="index">
                        <ion-button expand="full" @click="navigate(option.route)">
                            {{ option.label }}
                        </ion-button>
                    </ion-item>

                    <!-- Botón para cerrar sesión -->
                    <ion-item>
                        <ion-button expand="full" @click="logout">Cerrar Sesión</ion-button>
                    </ion-item>
                </ion-col>
            </ion-grid>

        </ion-content>

    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonItem, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCol, IonGrid, IonButtons, IonBackButton } from '@ionic/vue';

const router = useRouter();
const route = useRoute();

const nombre_usuario = ref<string | undefined>(route.params.usuario as string);
const rol_usuario = ref<string | undefined>(route.params.rol as string);

if (!nombre_usuario.value) {
    router.push('/login');
}

// Opciones de navegación
const options = ref([
    { label: 'Empleado', route: `/Empleado/${nombre_usuario.value}` },
    { label: 'Jefe', route: `/Jefe/${nombre_usuario.value}` },
    { label: 'Administrador', route: '/administradorview' }
]);

function navigate(route: string) {
    router.push(route);
}

function logout() {
    router.push('/login');
}
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>
