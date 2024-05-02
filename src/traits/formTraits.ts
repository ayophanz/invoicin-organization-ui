export default {
    getFormData(form: any) {
        let data = {};
        Object.keys(form).map((key) => {
            if (form[key].type === 'file') {
                let files = [] as any;
                if (form[key].value) {
                    form[key].value.forEach((item: any, key: number) => {
                        files[key] = item.getFileEncodeBase64String();
                    });
                }
                data[key] = files;
            } else {
                data[key] = form[key].value;
            }
        });
        return data;
    },

    setFormData(form: any, data: any) {
        Object.keys(data).map((key) => {
            form[key].value = data[key];
        });
        return form;
    }
}