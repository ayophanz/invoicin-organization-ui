import axios from '../plugins/axios';
import addressTransformer from '../transformers/addressTransformer';

const success = (data: object, resolve: any) => {
    return resolve(data);
};

const fail = (data: object, reject: any) => {
    const transformer = addressTransformer.fetch(data);
    return reject(transformer);
};

export default (data: object) => {
    const transformer = addressTransformer.send(data);
    return new Promise((resolve, reject) => {
        axios.put('api/organization/addresses', transformer)
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}