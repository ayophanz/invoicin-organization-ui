<template>
    <h1 class="text-2xl font-semibold">Profile</h1>
    <div class="mt-5 max-w-7xl mx-auto">
        <p class="mb-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
        <Form :form="compProfileForm" :submit="onFormSave" :submitLoading="submitLoading" @onchange-form="updateProfileForm"></Form>
    </div>
</template>
<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import Form from '../components/form/Form.vue';
    import services from '../services';
    import { useToast } from 'vue-toastification';
    import { useOrganizationStore } from '../stores/organization';
    import { storeToRefs } from 'pinia';
    import formTraits from '../traits/formTraits.js';

    const organizationStore = useOrganizationStore();
    const { getProfile } = storeToRefs(organizationStore) as any;
    const toast = useToast();

    const submitLoading = ref(false);
    let profileForm = ref({
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
    });

    onMounted(() => {
        show();
    });

    const show = async () => {
        await services.showProfile();
        profileForm.value['name'].value = getProfile.value.name;
        profileForm.value['email'].value = getProfile.value.email;
        profileForm.value['logo'].value = getProfile.value.logo;
    };

    const onFormSave = async () => {
        submitLoading.value = true;
        profileForm.value['errors'] = {};
        const profileFormData = formTraits.setFormData(profileForm.value);
        await services.updateProfile(profileFormData)
        .then(() => {
            submitLoading.value = false;
            toast.success('Successfully Save!', {
                timeout: 2000
            });
        })
        .catch((error) => {
            submitLoading.value = false;
            profileForm.value['errors'] = error;
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    };

    const updateProfileForm = (value: {name: string, value: string}) => {
        profileForm.value[value.name].value = value.value;
    };

    const compProfileForm = computed(() => profileForm);
</script>