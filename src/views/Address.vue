<template>
    <h1 class="text-2xl font-semibold">Address</h1>
    <div class="mt-5 max-w-7xl mx-auto">
        <p class="mb-5 text-sm text-gray-500">Asterisk(*) is required fields.</p>
        <div class="divide-y divide-gray-900/10">
            <dl class="space-y-6 divide-y divide-gray-900/10">
            <Disclosure as="div" v-for="(form, index) in forms" :key="index" :class="index != '' ? 'pt-6' : ''" v-slot="{ open }">
                <div>
                    <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                        <span class="text-base font-semibold leading-7">{{ index }}</span>
                        <span class="ml-6 flex h-7 items-center">
                        <PlusIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                        <MinusIcon v-else class="h-6 w-6" aria-hidden="true" />
                        </span>
                    </DisclosureButton>
                </div>
                <DisclosurePanel as="div" class="mt-2 pr-12">
                    <Form :submit="onAddressesSave(index)" :form="form"></Form>
                </DisclosurePanel>
            </Disclosure>
            </dl>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
    import { MinusIcon, PlusIcon } from '@heroicons/vue/outline';
    import Form from '../components/form/Form.vue';
    import services from '../services';
    import { useOrganizationStore } from '../stores/organization';
    import { storeToRefs } from 'pinia';
    import { useToast } from 'vue-toastification';
    import formUtil from '../utils/form.js';

    const toast = useToast();
    const organizationStore = useOrganizationStore();
    const { getAddresses } = storeToRefs(organizationStore) as any;

    let formBilling = new formUtil(ref({
        country: {
            label: 'Country*',
            value: '',
            type: 'select',
        },
        stateProvince: {
            label: 'State / Province*',
            value: '',
            type: 'text',
        },
        city: {
            label: 'City*',
            value: '',
            type: 'text',
        },
        zipcode: {
            label: 'Zipcode*',
            value: '',
            type: 'text',
        },
        address: {
            label: 'Address*',
            value: '',
            type: 'text',
        }
    })) as any;

    let formPostal = new formUtil(ref({
        country: {
            label: 'Country*',
            value: '',
            type: 'select',
        },
        stateProvince: {
            label: 'State / Province*',
            value: '',
            type: 'text',
        },
        city: {
            label: 'City*',
            value: '',
            type: 'text',
        },
        zipcode: {
            label: 'Zipcode*',
            value: '',
            type: 'text',
        },
        address: {
            label: 'Address*',
            value: '',
            type: 'text',
        }
    })) as any;

    let forms = ref({
        Billing: formBilling,
        Postal: formPostal
    });

    console.log(forms.value);

    onMounted(() => {
        showForm();
        showOptons();
    });

    const showForm = async() => {
        await services.showAddress();

        const data = {
            country: getAddresses.value[0].country,
            stateProvince: getAddresses.value[0].stateProvince,
            city: getAddresses.value[0].city,
            zipcode: getAddresses.value[0].zipcode,
            address: getAddresses.value[0].address,
        };

        forms.value.Billing.setFormData(data);
    };

    const showOptons = async () => {
        await services.countries()
        .then((response: any) => {
            forms.value.Billing.setOptions('country', response);
        }).catch((error) => {
            console.log(error);
        });
    };

    const onAddressesSave = (index: string) => async () => {
        forms.value.Billing.setLoading(true);
        forms.value.Billing.setErrors({});
        let data = forms.value.Billing.getFormData();
        data.type = index;
        await services.updateAddress(data)
        .then(() => {
            forms.value.Billing.setLoading(false);
            toast.success('Successfully Save!', {
                timeout: 2000
            });
        })
        .catch((error) => {
            forms.value.Billing.setLoading(false);
            forms.value.Billing.setErrors(error);
            toast.error('Something went wrong!', {
                timeout: 2000
            });
        });
    };
</script>