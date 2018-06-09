const transformResource = (resourceDb) => {
    const resource = resourceDb.toObject()
    
    resource.id = resource._id
    delete resource._id
    delete resource.__v

    return resource
}

export { transformResource }