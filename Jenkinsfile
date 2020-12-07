pipeline {
    agent any
    stages {
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
                        sh "docker-compose up"
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