<template>
    <h1 class="text-2xl font-semibold">Profile</h1>
    <div class="mt-5">
        <Form :form="compProfileForm" :submit="onFormSave" :submitLoading="submitLoading" @onchange-form="updateProfileForm"></Form>
    </div>
</template>
<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import Form from '../components/form/Form.vue';
    import services from '../services';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
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

    onMounted(() => {
        
    });

    const onFormSave = async () => {
        submitLoading.value = true;
        profileForm.value['errors'] = {};
        await services.updateProfile(1, {})
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

    const compProfileForm = computed(() => {
        return profileForm.value;
    });
</script>