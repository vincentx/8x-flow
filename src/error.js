export default {
    message: {
        malformed: (entity, field) => `${entity.id} has malformed ${field} declaration`,
        required: (entity, field) => `${entity.id} must have ${field} declaration`,
        roleRequired: (entity) => `${entity.id} can only play as roles`
    }
}