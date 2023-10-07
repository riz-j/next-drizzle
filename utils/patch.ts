export function prepareForPatch<Type>(model: any): Type {
    delete model['id']

    for (const prop in model) {
        if (!model[prop]) { delete model[prop] }
    }

    return model
}