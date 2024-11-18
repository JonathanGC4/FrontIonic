<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button text="Regresar" icon="caret-back"></ion-back-button>
                </ion-buttons>
                <ion-title>Bienvenido Usuario</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-label>
            <ion-card-header>
                <ion-card-title>
                   Bienvenido {{ nombre_usuario}}
                </ion-card-title>
            </ion-card-header>
        
        </ion-label>
        <ion-content>
            <ion-grid>
                <ion-col size="12">
                    <ion-item>
                        <ion-button expand="full" @click="registrar" >Empleado</ion-button>
                        
                    </ion-item>
                    <ion-item>
                        <ion-button expand="full" @click="Asignar" >Jefe</ion-button>
                    </ion-item>

                    <ion-item>
                        <ion-button expand="full" @click="Agregar" >Administrador</ion-button>
                    </ion-item>

                    
                </ion-col>
            </ion-grid>
             
        </ion-content>
       
        
    </ion-page>
</template>

<script setup lang="ts">
import {IonLabel, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonItem, IonContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonButtons, IonBackButton }  from'@ionic/vue';
import { caretBack } from 'ionicons/icons';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const nombre_usuario = ref<string | undefined>();

nombre_usuario.value = route.params.usuario as string;

function registrar(){
   router.push('/Empleado/' + nombre_usuario.value );
   

};

function Asignar (){
    router.push('/Administrador/' + nombre_usuario.value );
}

function Agregar (){
    router.push('/AUsuarios/' + nombre_usuario.value );
}

</script>
