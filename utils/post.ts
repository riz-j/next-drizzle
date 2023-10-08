export function prepareForPost<Type>(model: any): Type {
    delete model['id']

    for (const prop in model) {
        if (!model[prop]) { delete model[prop] }
    }

    return model
}