pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('awstest')
    }
    stages {
        stage('Env Test') {
          steps{
                echo AWS_ACCESS_KEY_ID
          }
        }
        stage('Cloning Git') {
          steps{
                echo "========Git Repo Cloning...========"
                git url:'https://github.com/gokalpaltun/swe573-gokalp-altun.git', branch:'dev'
          }
        }
        stage("Build all containers with new Image and up with compose"){
            steps{
                script{
                    try {
                        sh "docker-compose build"
                        sh "docker-compose up -d"
                    } catch (Exception e) {
                        echo 'Exception occurred: ' + e.toString()
                    }
                }
            }
        }
        stage('Cleaning up the mess') { 
            steps { 
                script {
                    try {
                        sh "docker system prune -f" 
                    }
                    catch (Exception e) {
                        echo 'Exception occurred: ' + e.toString()
                    }
                }
            }
        }
    }
}