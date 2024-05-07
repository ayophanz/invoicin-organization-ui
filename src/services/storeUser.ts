import axios from '../plugins/axios';
import userTransformer from '../transformers/userTransformer';

const success = (data: object, resolve: any) => {
    return resolve(data);
};

const fail = (data: object, reject: any) => {
    const transformer = userTransformer.fetch(data);
    return reject(transformer);
};

export default (data: object) => {
    const transformer = userTransformer.send(data);
    return new Promise((resolve, reject) => {
        axios.post('api/users', transformer)
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}