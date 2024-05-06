<template>
    <h1 class="text-2xl font-semibold">Invite Person</h1>
    <div class="mt-5 max-w-7xl mx-auto">
        <p class="mb-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
        <Form :form="form" :submit="onFormSave" :submitText="'Send Invitation'"></Form>
    </div>
</template>

<script setup lang="ts">
    import { reactive, watch } from 'vue';
    import Form from '../../components/form/Form.vue';
    import formUtil from '../../utils/form.js';

    let form = reactive(new formUtil({
        firstname: {
            label: 'Firstname*',
            value: '',
            type: 'text'
        },
        lastname: {
            label: 'Lastname*',
            value: '',
            type: 'text'
        },
        email: {
            label: 'Email*',
            value: '',
            type: 'email'
        },
        role: {
            label: 'Role and Permission*',
            value: '',
            type: 'radio',
            options: [
                { value: 'manager', label: 'Manager' },
                { value: 'member', label: 'Member' }
            ]
        },
        editOrganization: {
            label: 'Edit Organization',
            value: '',
            type: 'checkbox',
            visible: false
        },
        editCustomer: {
            label: 'Edit Customer',
            value: '',
            type: 'checkbox',
            visible: false
        }
    }));

    watch(form, (form) => {
        if (form.getFieldValue('role') == 'member') {
            form.setVisible('editOrganization', true);
            form.setVisible('editCustomer', true);
        } else {
            form.setVisible('editOrganization', false);
            form.setVisible('editCustomer', false);
        }
    });

    const onFormSave = () => {
        //
    };

</script>