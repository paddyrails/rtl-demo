pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'rm -rf rtl-demo'
                sh 'rm -rf node_modules'
                sh 'ls -la src/components'
                // Install NPM Packages
                sh 'npm i'
                // Run unit tests
                sh 'npm run test'
                // Run production build
                sh 'npm run build'
            }
        }
        stage('deploy') {
            steps {
                sh 'cp -R build/* /tmp/deployment-folder'
            }
        }
    }
}
