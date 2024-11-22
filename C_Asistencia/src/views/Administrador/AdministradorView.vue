<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/bienvenido/defaultLogin"></ion-back-button> 
                </ion-buttons>
                <ion-title>Administración</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <h1>Panel de Administración</h1>

            <ion-list>
                <ion-item @click="irARegistroAreas">
                    <ion-label>Registro de Áreas</ion-label>
                </ion-item>
                <ion-item @click="otraOpcion">
                    <ion-label>Otra Opción</ion-label>
                </ion-item>
                <ion-item @click="irAGestionEmpleados">
                    <ion-label>Gestión de Empleados</ion-label>
                </ion-item>
            </ion-list>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'; 
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';


const router = useRouter();


function irARegistroAreas() {
    router.push('/registro-areas'); 
}


function otraOpcion() {
    console.log("Otra opción seleccionada");
}


function irAGestionEmpleados() {
    router.push('/gestion-empleados'); 
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 20px 0;
}
</style>