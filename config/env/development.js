export default {
    env: `development`,
    db: `mongodb://ranguz:cantinafacil@ds215019.mlab.com:15019/ranguz-db`,
    port: 3000,
    jwtAdminSecret: 'ranguz-api-admin-secret',
    jwtClientSecret: 'ranguz-api-client-secret',
    jwtDuration: '2 hours'
}