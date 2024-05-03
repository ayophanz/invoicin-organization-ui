<template>
    <h1 class="text-2xl font-semibold">Profile</h1>
    <div class="mt-5 max-w-7xl mx-auto">
        <p class="mb-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
        <Form :form="form" :submit="onFormSave"></Form>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import Form from '../components/form/Form.vue';
    import services from '../services';
    import { useToast } from 'vue-toastification';
    import { useOrganizationStore } from '../stores/organization';
    import { storeToRefs } from 'pinia';
    import formUtil from '../utils/form.js';

    const organizationStore = useOrganizationStore();
    const { getProfile } = storeToRefs(organizationStore) as any;
    const toast = useToast();

    let form = new formUtil(ref({
        logo: {
            label: 'Company logo',
            value: null,
            type: 'file'
        },
        name: {
            label: 'Company name*',
            value: '',
            type: 'text'
        },
        email: {
            label: 'Company email*',
            value: '',
            type: 'email'
        }
    }));

    onMounted(() => {
        show();
    });

    const show = async () => {
        await services.showProfile();
        const data = {
            name: getProfile.value.name,
            email: getProfile.value.email,
            logo: getProfile.value.logo
        };

        form.setFormData(data);
    };

    const onFormSave = async () => {
        form.setErrors({});
        form.setLoading(true);
        await services.updateProfile(form.getFormData())
        .then(() => {
            form.setLoading(false);
            toast.success('Successfully Save!', {
                timeout: 2000
            });
        })
        .catch((error) => {
            form.setErrors(error);
            form.setLoading(false);
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    };
</script>