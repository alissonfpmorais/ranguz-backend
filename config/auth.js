import config from './env'
import jwt from 'express-jwt'

const adminAuth = jwt({ secret: config.jwtAdminSecret })
const clientAuth = jwt({ secret: config.jwtClientSecret })

export default { adminAuth, clientAuth }