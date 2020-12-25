module.exports = {
    apps: [{
        name: 'DSD 11',
        script: 'index.js',

        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem$
        args: 'one',
        instances: 1,
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: '2G',
        env: {
            NODE_ENV: 'development',
            PORT: 1202 
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 1202,
            CI: false
        }
    }],

    deploy: {
        production: {
            user: 'node',
            host: '192.168.10.110',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};