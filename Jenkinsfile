pipeline {
    agent any

    triggers {
        // Gatilho para execução automática em push e merge request
        pollSCM('* * * * *') // verifica mudanças a cada minuto.
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Compila o código e gera artefatos
                    bat 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Executa testes automatizados
                    bat 'npx jest' // ou 'npm test', dependendo da configuração
                }
            }
        }

        stage('Analyze') {
            steps {
                script {
                    // Executa ferramentas de análise de qualidade de código
                    bat 'npx eslint .'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline concluído com sucesso!'
        }
        failure {
            echo 'Pipeline falhou!'
        }
    }
}
