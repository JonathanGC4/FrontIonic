<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/administradorview"></ion-back-button> 
                </ion-buttons>
                <ion-title>Registro de Áreas</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <!-- Formulario -->
            <form @submit.prevent="guardarArea">
                <ion-item>
                    <ion-label position="floating">Nombre del Área</ion-label>
                    <ion-input v-model="area.nombre_area" type="text" required></ion-input>
                </ion-item>

                <ion-button expand="full" type="submit">{{ isEditing ? 'Actualizar' : 'Agregar' }} Área</ion-button>
            </form>

            <!-- Lista de áreas s -->
            <ion-list>
                <ion-item-group>
                    <ion-item v-for="(area, index) in areas" :key="area.id_area">
                        <ion-label>{{ area.nombre_area }}</ion-label>
                        <ion-buttons slot="end">
                            <ion-button @click="editarArea(area)">Editar</ion-button>
                            <ion-button color="danger" @click="eliminarArea(area.id_area!)" v-if="area.id_area !== undefined">Eliminar</ion-button>
                        </ion-buttons>
                    </ion-item>
                </ion-item-group>
            </ion-list>

            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchAreas, addArea, updateArea, deleteArea, Area } from '@/services/areaService'; 
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonItem, IonLabel, IonInput, IonButton, IonList, IonItemGroup } from '@ionic/vue';

const areas = ref<Area[]>([]);
const area = ref<Area>({ nombre_area: '' });
const isEditing = ref(false);
const editingIndex = ref<number | null>(null);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

// Función para cargar las áreas desde el servicio
async function loadAreas() {
    try {
        areas.value = await fetchAreas();
        successMessage.value = "Áreas cargadas correctamente.";
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al cargar las áreas:', error);
    }
}

// Función para guardar un área (agregar o actualizar)
async function guardarArea() {
    errorMessage.value = null; 
    successMessage.value = null; 

    try {
        if (isEditing.value) {
            // Actualizar el área existente
            if (editingIndex.value !== null) {
                const updatedArea: Area = { nombre_area: area.value.nombre_area };
                const response = await updateArea(areas.value[editingIndex.value].id_area!, updatedArea); 
                areas.value[editingIndex.value] = response;
                successMessage.value = "Área actualizada correctamente.";
            }
            isEditing.value = false; 
        } else {
            // Agregar nueva área
            const newArea: Area = { nombre_area: area.value.nombre_area };
            const response = await addArea(newArea);
            areas.value.push(response); 
            successMessage.value = "Área agregada correctamente.";
        }
        area.value.nombre_area = ''; 
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al guardar el área:', error);
    }
}

// Función para editar un área
function editarArea(areaToEdit: Area) {
    area.value.nombre_area = areaToEdit.nombre_area;
    isEditing.value = true;
    editingIndex.value = areas.value.findIndex(a => a.id_area === areaToEdit.id_area);
}

// Función para eliminar un área
async function eliminarArea(id_area: number) {
    errorMessage.value = null;
    successMessage.value = null; 

    try {
        await deleteArea(id_area); 
        areas.value = areas.value.filter(area => area.id_area !== id_area); 
        successMessage.value = "Área eliminada correctamente.";
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al eliminar el área:', error);
    }
}
onMounted(loadAreas);
</script>

<style scoped>
.error-message {
    color: red;
}
.success-message {
    color: green;
}
</style>