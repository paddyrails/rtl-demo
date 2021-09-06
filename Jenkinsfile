pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'git clone https://github.com/paddyrails/rtl-demo'
                sh 'cd rtl-demo
                sh 'npm i'
                sh 'npm run test'
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
