<template>
    <h1 class="text-2xl font-semibold">Profile</h1>
    <div class="mt-5">
        <Form :form="compProfileForm" :submit="onFormSave" :submitLoading="submitLoading" @onchange-form="updateProfileForm"></Form>
    </div>
</template>
<script setup lang="ts">
    import { computed, ref } from 'vue';
    import Form from '../components/form/Form.vue';

    const submitLoading = ref(false);
    const profileForm = ref({
        image: {
            label: 'Company logo',
            value: null,
            type: 'file'
        },
        name: {
            label: 'Company name',
            value: '',
            type: 'text'
        },
        email: {
            label: 'Company email',
            value: '',
            type: 'email'
        }
    });

    const onFormSave = () => {
        submitLoading.value = true;
        profileForm.value['errors'] = {};
    };

    const updateProfileForm = (value: {name: string, value: string}) => {
        profileForm.value[value.name].value = value.value;
    };

    const compProfileForm = computed(() => {
        return profileForm.value;
    });
</script>